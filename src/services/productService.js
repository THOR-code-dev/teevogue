import baseProducts from '../data/products';
import supabase from './supabaseClient';

const listeners = new Set();

const notifyProductsChanged = (nextProducts) => {
  listeners.forEach((callback) => {
    try {
      callback(nextProducts);
    } catch (error) {
      console.warn('Ürün aboneliği callback hatası', error);
    }
  });
};

export const subscribeProducts = (callback) => {
  listeners.add(callback);
  return () => listeners.delete(callback);
};

const normalizeProduct = (product) => ({
  ...product,
  heroImage: product.heroimage,
  oldPrice: product.oldprice,
  gallery: product.gallery || [],
  colors: product.colors || [],
  sizes: product.sizes || [],
  tags: product.tags || [],
});

const seedProductsIfEmpty = async () => {
  const { data, error } = await supabase.from('products').select('id').limit(1);
  if (error) throw error;
  if (data.length) return;

  const payload = baseProducts.map((product) => ({
    ...product,
    created_at: new Date().toISOString(),
  }));

  const { error: insertError } = await supabase.from('products').upsert(payload, { onConflict: 'id' });
  if (insertError) throw insertError;
};

export const getProducts = async () => {
  await seedProductsIfEmpty();
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data.map(normalizeProduct);
};

export const getProductById = async (id) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return normalizeProduct(data);
};

export const getProductsByGender = async (gender) => {
  const query = supabase.from('products').select('*');
  if (gender) {
    query.eq('gender', gender);
  }
  const { data, error } = await query;
  if (error) throw error;
  return data.map(normalizeProduct);
};

export const addProduct = async (payload) => {
  const product = {
    id: `BG-${Date.now()}`,
    title: payload.title,
    gender: payload.gender,
    category: payload.category,
    description: payload.description,
    heroimage: payload.heroImage,
    gallery: payload.gallery || [],
    colors: payload.colors || [],
    sizes: payload.sizes || [],
    price: Number(payload.price) || 0,
    oldprice: Number(payload.oldPrice) || 0,
    discount: payload.discount ? Number(payload.discount) : null,
    inventory: Number(payload.inventory) || 0,
    tags: payload.tags || [],
    rating: 4.5,
  };

  const { data, error } = await supabase.from('products').insert(product).select('*').single();
  if (error) throw error;
  const normalized = normalizeProduct(data);
  const refreshed = await getProducts();
  notifyProductsChanged(refreshed);
  return normalized;
};

export const getFilters = async () => {
  const products = await getProducts();
  const genders = [...new Set(products.map((product) => product.gender))];
  const categories = [...new Set(products.map((product) => product.category))];
  const colors = [...new Set(products.flatMap((product) => product.colors?.map((color) => color.name) || []))];
  const sizes = [...new Set(products.flatMap((product) => product.sizes || []))];

  return { genders, categories, colors, sizes };
};
