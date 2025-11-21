import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import categoryMeta from '../constants/categoryMeta';
import { addProduct } from '../services/productService';

const Page = styled.section`
  display: grid;
  grid-template-columns: 2.2fr 1fr;
  gap: ${props => props.theme.spacing.xl};
  align-items: start;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const Title = styled.h1`
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const Subtitle = styled.p`
  margin-bottom: ${props => props.theme.spacing.xl};
  color: ${props => props.theme.colors.text.secondary};
  max-width: 620px;
`;

const Card = styled.div`
  background: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.xl};
  box-shadow: ${props => props.theme.shadows.sm};
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xl};
`;

const Section = styled.div``;

const SectionTitle = styled.h3`
  margin-bottom: ${props => props.theme.spacing.md};
`;

const FieldGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: ${props => props.theme.spacing.md};
`;

const Select = styled.select`
  width: 100%;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  border: 1px solid ${props => props.theme.colors.text.disabled};
  font-family: inherit;
  font-size: ${props => props.theme.typography.fontSize.md};
  background: ${props => props.theme.colors.background};
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xs};
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border: 1px solid ${props => props.theme.colors.text.disabled};
  border-radius: ${props => props.theme.borderRadius.md};
  font-family: inherit;
  font-size: ${props => props.theme.typography.fontSize.md};
  resize: vertical;
  background: ${props => props.theme.colors.background};
`;

const Helper = styled.span`
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.text.secondary};
`;

const ColorList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.sm};
`;

const ColorChip = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.full};
  border: 1px solid ${props => props.theme.colors.muted};
  background: ${props => props.theme.colors.background};
`;

const ColorPreview = styled.span`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 1px solid rgba(0,0,0,0.08);
  background: ${props => props.color};
`;

const SizeList = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.xs};
  flex-wrap: wrap;
`;

const SizeTag = styled.button`
  border: 1px solid ${props => props.active ? props.theme.colors.primary : props.theme.colors.text.disabled};
  background: ${props => props.active ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.active ? '#fff' : props => props.theme.colors.text.primary};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.full};
  cursor: pointer;
  font-size: ${props => props.theme.typography.fontSize.sm};
`;

const SummaryCard = styled.div`
  background: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
  box-shadow: ${props => props.theme.shadows.sm};
  position: sticky;
  top: ${props => props.theme.spacing.xl};
`;

const PreviewImage = styled.div`
  width: 100%;
  padding-top: 65%;
  border-radius: ${props => props.theme.borderRadius.md};
  background: url(${props => props.src}) center/cover no-repeat, #f4f4f4;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 2px 10px;
  border-radius: ${props => props.theme.borderRadius.full};
  background: ${props => props.theme.colors.secondary}22;
  color: ${props => props.theme.colors.secondary};
  font-size: ${props => props.theme.typography.fontSize.xs};
`;

const SuccessState = styled.div`
  border: 1px solid ${props => props.theme.colors.success};
  background: ${props => props.theme.colors.success}15;
  color: ${props => props.theme.colors.success};
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
`;

const initialForm = {
  title: '',
  description: '',
  heroImage: '',
  galleryInput: '',
  gender: 'kadin',
  category: 'takim',
  price: '',
  oldPrice: '',
  inventory: '',
  discount: '',
  tagsInput: '',
};

const sizePresets = ['XS','S','M','L','XL','34','36','38','40','42','44','46','48','50'];

const ProductCreate = () => {
  const [form, setForm] = useState(initialForm);
  const [colorDraft, setColorDraft] = useState({ name: '', code: '#000000' });
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [successProduct, setSuccessProduct] = useState(null);
  const navigate = useNavigate();

  const availableCategories = useMemo(() => {
    return categoryMeta[form.gender]?.subcategories || [];
  }, [form.gender]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAddColor = () => {
    if (!colorDraft.name.trim()) return;
    setColors(prev => [...prev, { name: colorDraft.name.trim(), code: colorDraft.code }]);
    setColorDraft({ name: '', code: '#000000' });
  };

  const handleRemoveColor = (index) => {
    setColors(prev => prev.filter((_, idx) => idx !== index));
  };

  const toggleSize = (size) => {
    setSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]);
  };

  const validate = () => {
    if (!form.title.trim()) return 'Ürün adı zorunludur';
    if (!form.heroImage.trim()) return 'Hero görsel URL alanı zorunludur';
    if (!form.price) return 'Fiyat bilgisi zorunludur';
    if (!form.description.trim()) return 'Ürün açıklaması girin';
    return null;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    setSaving(true);
    try {
      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),
        heroImage: form.heroImage.trim(),
        gallery: form.galleryInput
          .split('\n')
          .map(url => url.trim())
          .filter(Boolean),
        gender: form.gender,
        category: form.category,
        price: parseFloat(form.price),
        oldPrice: form.oldPrice ? parseFloat(form.oldPrice) : 0,
        inventory: form.inventory ? parseInt(form.inventory, 10) : 0,
        discount: form.discount ? parseInt(form.discount, 10) : null,
        colors,
        sizes,
        tags: form.tagsInput
          .split(',')
          .map(tag => tag.trim())
          .filter(Boolean),
      };

      const created = await addProduct(payload);
      setSuccessProduct(created);
      setForm(initialForm);
      setColors([]);
      setSizes([]);
    } catch (err) {
      setError('Ürün kaydedilirken bir sorun oluştu.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <Title>Yeni Ürün Ekle</Title>
      <Subtitle>
        Cloudinary veya benzeri bir CDN'e yüklediğiniz görsellerin linklerini kullanarak koleksiyona yeni ürünler
        ekleyin. Tüm kayıtlar tarayıcıya kaydedilir ve ileride admin paneli geliştirildiğinde aynı data yapısı
        kullanılacaktır.
      </Subtitle>

      {error && <SuccessState style={{ borderColor: '#d14343', background: '#fee', color: '#d14343' }}>{error}</SuccessState>}

      <Page>
        <Card as="form" onSubmit={handleSubmit}>
          <Section>
            <SectionTitle>Temel Bilgiler</SectionTitle>
            <FieldGrid>
              <Input
                label="Ürün Adı"
                name="title"
                placeholder="Örn. Nova Saten Elbise"
                value={form.title}
                onChange={handleChange}
                required
                fullWidth
              />
              <Input
                label="Fiyat (₺)"
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                required
                fullWidth
              />
              <Input
                label="İndirimli Fiyat (Opsiyonel)"
                name="oldPrice"
                type="number"
                value={form.oldPrice}
                onChange={handleChange}
                fullWidth
              />
              <Input
                label="Stok"
                name="inventory"
                type="number"
                value={form.inventory}
                onChange={handleChange}
                fullWidth
              />
            </FieldGrid>
            <Label style={{ marginTop: '1rem' }}>
              Açıklama
              <TextArea
                name="description"
                placeholder="Ürün kumaşı, kalıp ve kullanım önerilerini anlatın"
                value={form.description}
                onChange={handleChange}
              />
            </Label>
          </Section>

          <Section>
            <SectionTitle>Kategori & Koleksiyon</SectionTitle>
            <FieldGrid>
              <Label>
                Hedef Cinsiyet
                <Select name="gender" value={form.gender} onChange={(e) => {
                  handleChange(e);
                  const firstSub = categoryMeta[e.target.value]?.subcategories?.[0]?.slug;
                  setForm(prev => ({ ...prev, category: firstSub || '' }));
                }}>
                  <option value="kadin">Kadın</option>
                  <option value="erkek">Erkek</option>
                </Select>
              </Label>
              <Label>
                Alt Kategori
                <Select name="category" value={form.category} onChange={handleChange}>
                  {availableCategories.map(sub => (
                    <option key={sub.slug} value={sub.slug}>{sub.label}</option>
                  ))}
                </Select>
              </Label>
              <Label>
                Etiketler
                <Input
                  name="tagsInput"
                  placeholder="premium, capsule, office"
                  value={form.tagsInput}
                  onChange={handleChange}
                  fullWidth
                />
                <Helper>Virgülle ayırarak birden fazla etiket yazabilirsiniz.</Helper>
              </Label>
            </FieldGrid>
          </Section>

          <Section>
            <SectionTitle>Görseller</SectionTitle>
            <FieldGrid>
              <Input
                label="Hero Görsel URL"
                name="heroImage"
                placeholder="https://res.cloudinary.com/..."
                value={form.heroImage}
                onChange={handleChange}
                required
                fullWidth
              />
              <Label>
                Galeri URL'leri
                <TextArea
                  name="galleryInput"
                  placeholder={`Her satıra bir Cloudinary URL yapıştırın\nÖrn. https://res.cloudinary.com/...`}
                  value={form.galleryInput}
                  onChange={handleChange}
                />
              </Label>
            </FieldGrid>
            <Helper>Cloudinary'den kopyaladığınız paylaşıma açık URL'leri kullanın.</Helper>
          </Section>

          <Section>
            <SectionTitle>Renkler</SectionTitle>
            <FieldGrid>
              <Input
                label="Renk Adı"
                value={colorDraft.name}
                onChange={(e) => setColorDraft(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Örn. Şampanya"
                fullWidth
              />
              <Label>
                Hex Kodu
                <input
                  type="color"
                  value={colorDraft.code}
                  onChange={(e) => setColorDraft(prev => ({ ...prev, code: e.target.value }))}
                  style={{ height: '50px', borderRadius: '12px', border: '1px solid #dcdcdc' }}
                />
              </Label>
              <Button type="button" variant="outline" onClick={handleAddColor} style={{ alignSelf: 'end' }}>
                Renk Ekle
              </Button>
            </FieldGrid>
            <ColorList>
              {colors.map((color, index) => (
                <ColorChip key={color.name + index}>
                  <ColorPreview color={color.code} />
                  {color.name}
                  <button type="button" onClick={() => handleRemoveColor(index)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>×</button>
                </ColorChip>
              ))}
              {!colors.length && <Helper>Henüz renk eklenmedi.</Helper>}
            </ColorList>
          </Section>

          <Section>
            <SectionTitle>Bedene Göre Seçim</SectionTitle>
            <SizeList>
              {sizePresets.map(size => (
                <SizeTag key={size} type="button" active={sizes.includes(size)} onClick={() => toggleSize(size)}>
                  {size}
                </SizeTag>
              ))}
            </SizeList>
            {!sizes.length && <Helper>En az bir beden seçin.</Helper>}
          </Section>

          <Section>
            <SectionTitle>Planlama</SectionTitle>
            <FieldGrid>
              <Input
                label="Tahmini İndirim (%)"
                name="discount"
                type="number"
                value={form.discount}
                onChange={handleChange}
                fullWidth
              />
            </FieldGrid>
          </Section>

          <Button type="submit" size="large" disabled={saving}>
            {saving ? 'Kaydediliyor...' : 'Ürünü Kaydet'}
          </Button>
        </Card>

        <SummaryCard>
          <h3>Ön İzleme</h3>
          <PreviewImage src={form.heroImage || 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80'} />
          <h4>{form.title || 'Ürün adı bekleniyor'}</h4>
          <Badge>{categoryMeta[form.gender]?.label}</Badge>
          <p style={{ marginTop: '0.5rem', color: '#6b7280' }}>{form.description || 'Ürün açıklaması bu alanda görünecek.'}</p>
          <div style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
            {form.price ? `${Number(form.price).toLocaleString('tr-TR')} ₺` : 'Fiyat yok'}
          </div>
          {successProduct && (
            <SuccessState style={{ marginTop: '1rem' }}>
              <strong>{successProduct.title}</strong> koleksiyona eklendi.
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
                <Button as="a" href={`/product/${successProduct.id}`} variant="outline" size="small">
                  Detaya Git
                </Button>
                <Button variant="text" size="small" onClick={() => navigate(-1)}>Geri Dön</Button>
              </div>
            </SuccessState>
          )}
        </SummaryCard>
      </Page>
    </div>
  );
};

export default ProductCreate;
