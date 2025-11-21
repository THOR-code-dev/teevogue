import { useEffect, useMemo, useState } from 'react';
import { getProducts, subscribeProducts } from '../services/productService';

const sortProducts = (list, sortBy) => {
  switch (sortBy) {
    case 'newest':
      return [...list].reverse();
    case 'price-low':
      return [...list].sort((a, b) => a.price - b.price);
    case 'price-high':
      return [...list].sort((a, b) => b.price - a.price);
    case 'name-asc':
      return [...list].sort((a, b) => a.title.localeCompare(b.title));
    case 'name-desc':
      return [...list].sort((a, b) => b.title.localeCompare(a.title));
    default:
      return list;
  }
};

const useProducts = ({ gender, category, sortBy = 'featured' } = {}) => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    let unsubscribe;
    (async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        if (isMounted) {
          setAllProducts(data);
          unsubscribe = subscribeProducts((nextProducts) => {
            setAllProducts(nextProducts);
          });
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    })();

    return () => {
      isMounted = false;
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const filteredProducts = useMemo(() => {
    let products = allProducts;

    if (gender) {
      products = products.filter(product => product.gender === gender);
    }

    if (category) {
      products = products.filter(product => product.category === category);
    }

    return sortProducts(products, sortBy);
  }, [allProducts, gender, category, sortBy]);

  const filters = useMemo(() => {
    const genders = [...new Set(allProducts.map(product => product.gender))];
    const categories = [...new Set(allProducts.map(product => product.category))];
    const colorMap = new Map();

    allProducts.forEach(product => {
      product.colors?.forEach(color => {
        if (!colorMap.has(color.name)) {
          colorMap.set(color.name, color.code);
        }
      });
    });

    const colors = Array.from(colorMap.entries()).map(([name, code]) => ({ name, code }));
    const sizes = [...new Set(allProducts.flatMap(product => product.sizes || []))];

    return { genders, categories, colors, sizes };
  }, [allProducts]);

  return { products: filteredProducts, allProducts, filters, loading, error };
};

export default useProducts;
