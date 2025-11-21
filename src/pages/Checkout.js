import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: ${props => props.theme.spacing.xl};
  align-items: start;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const Title = styled.h1`
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const Subtitle = styled.p`
  margin-bottom: ${props => props.theme.spacing.xl};
  color: ${props => props.theme.colors.text.secondary};
`;

const FormCard = styled.form`
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
  font-size: ${props => props.theme.typography.fontSize.lg};
`;

const FieldRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${props => props.theme.spacing.md};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border: 1px solid ${props => props.error ? props.theme.colors.error : props.theme.colors.text.disabled};
  border-radius: ${props => props.theme.borderRadius.md};
  font-family: ${props => props.theme.typography.fontFamily.body};
  font-size: ${props => props.theme.typography.fontSize.md};
  resize: vertical;
  background: ${props => props.theme.colors.background};
`;

const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
`;

const RadioOption = styled.label`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.theme.spacing.md};
  border: 1px solid ${props => props.theme.colors.text.disabled};
  border-radius: ${props => props.theme.borderRadius.md};
  cursor: pointer;
  background: ${props => props.active ? props.theme.colors.background : props.theme.colors.surface};
  transition: border 0.2s ease;

  input {
    margin-right: ${props => props.theme.spacing.md};
  }
`;

const OptionInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const Helper = styled.span`
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.text.secondary};
`;

const CheckboxWrapper = styled.label`
  display: flex;
  align-items: flex-start;
  gap: ${props => props.theme.spacing.sm};
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.text.secondary};
`;

const SummaryCard = styled.div`
  background: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
  box-shadow: ${props => props.theme.shadows.sm};
  position: sticky;
  top: ${props => props.theme.spacing.xl};
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.text.secondary};
`;

const SummaryTotal = styled(SummaryRow)`
  font-size: ${props => props.theme.typography.fontSize.lg};
  color: ${props => props.theme.colors.text.primary};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${props => props.theme.colors.muted};
  margin: ${props => props.theme.spacing.md} 0;
`;

const SuccessState = styled.div`
  background: ${props => props.theme.colors.success}22;
  border: 1px solid ${props => props.theme.colors.success};
  padding: ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.md};
  color: ${props => props.theme.colors.success};
`;

const EmptyState = styled.div`
  background: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.xl};
  text-align: center;
  box-shadow: ${props => props.theme.shadows.sm};
`;

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  district: '',
  postalCode: '',
  notes: '',
  delivery: 'standard',
  paymentMethod: 'card',
  cardName: '',
  cardNumber: '',
  cardExpiry: '',
  cardCvc: '',
  saveInfo: true,
  acceptTerms: false,
};

const Checkout = () => {
  const { items, summary, clearCart } = useCart();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const shippingCost = form.delivery === 'express' ? 49.9 : 0;
  const total = useMemo(() => summary.subtotal + shippingCost, [summary.subtotal, shippingCost]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = 'Ad soyad zorunludur';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Geçerli bir e-posta girin';
    if (!form.phone.trim()) newErrors.phone = 'Telefon zorunludur';
    if (!form.address.trim()) newErrors.address = 'Adres zorunludur';
    if (!form.city.trim()) newErrors.city = 'Şehir zorunludur';
    if (!form.district.trim()) newErrors.district = 'İlçe zorunludur';
    if (!form.postalCode.trim()) newErrors.postalCode = 'Posta kodu zorunludur';
    if (form.paymentMethod === 'card') {
      if (!form.cardName.trim()) newErrors.cardName = 'Kart üzerindeki isim zorunludur';
      if (!form.cardNumber.trim() || form.cardNumber.replace(/\s/g, '').length < 15) newErrors.cardNumber = 'Kart numarasını kontrol edin';
      if (!form.cardExpiry.trim()) newErrors.cardExpiry = 'Son kullanma tarihi zorunludur';
      if (!form.cardCvc.trim() || form.cardCvc.length < 3) newErrors.cardCvc = 'CVC kodunu girin';
    }
    if (!form.acceptTerms) newErrors.acceptTerms = 'Ön bilgilendirme ve mesafeli satış sözleşmesini kabul edin';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setOrderSuccess(true);
      clearCart();
    }, 800);
  };

  if (!items.length && !orderSuccess) {
    return (
      <EmptyState>
        <h2>Sepetiniz boş</h2>
        <p>Önce ürün ekledikten sonra ödeme adımını tamamlayabilirsiniz.</p>
        <Button as={Link} to="/products" variant="primary" style={{ marginTop: '1rem' }}>
          Ürünlere Göz At
        </Button>
      </EmptyState>
    );
  }

  return (
    <div>
      <Title>Ödeme & Teslimat</Title>
      <Subtitle>Bilgilerinizi doldurun, siparişinizi tamamlayın.</Subtitle>
      <Wrapper>
        <div>
          {orderSuccess ? (
            <SuccessState>
              <h3>Siparişiniz alındı!</h3>
              <p>
                Becca Giyim ekibi siparişinizi işleme aldı. Sipariş ve kargo detayları e-posta adresinize
                iletilecek.
              </p>
              <Button as={Link} to="/" variant="primary" style={{ marginTop: '1rem' }}>
                Ana Sayfaya Dön
              </Button>
            </SuccessState>
          ) : (
            <FormCard onSubmit={handleSubmit}>
              <Section>
                <SectionTitle>İletişim Bilgileri</SectionTitle>
                <FieldRow>
                  <Input
                    label="Ad Soyad"
                    name="fullName"
                    fullWidth
                    placeholder="Örn. Ayşe Yılmaz"
                    value={form.fullName}
                    onChange={handleChange}
                    error={errors.fullName}
                    helperText={errors.fullName}
                    required
                  />
                  <Input
                    label="E-posta"
                    name="email"
                    type="email"
                    fullWidth
                    placeholder="ornek@mail.com"
                    value={form.email}
                    onChange={handleChange}
                    error={errors.email}
                    helperText={errors.email}
                    required
                  />
                </FieldRow>
                <Input
                  label="Telefon"
                  name="phone"
                  placeholder="5XX XXX XX XX"
                  value={form.phone}
                  onChange={handleChange}
                  error={errors.phone}
                  helperText={errors.phone}
                  required
                />
              </Section>

              <Section>
                <SectionTitle>Teslimat Adresi</SectionTitle>
                <Input
                  label="Adres"
                  name="address"
                  placeholder="Mahalle, cadde, bina, daire"
                  value={form.address}
                  onChange={handleChange}
                  error={errors.address}
                  helperText={errors.address}
                  required
                />
                <FieldRow>
                  <Input
                    label="Şehir"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    error={errors.city}
                    helperText={errors.city}
                    required
                    fullWidth
                  />
                  <Input
                    label="İlçe"
                    name="district"
                    value={form.district}
                    onChange={handleChange}
                    error={errors.district}
                    helperText={errors.district}
                    required
                    fullWidth
                  />
                </FieldRow>
                <FieldRow>
                  <Input
                    label="Posta Kodu"
                    name="postalCode"
                    value={form.postalCode}
                    onChange={handleChange}
                    error={errors.postalCode}
                    helperText={errors.postalCode}
                    required
                    fullWidth
                  />
                  <Input
                    label="Adres Başlığı"
                    name="addressTitle"
                    placeholder="Ev, iş, vb."
                    value={form.addressTitle || ''}
                    onChange={handleChange}
                    fullWidth
                  />
                </FieldRow>
                <div>
                  <label>Adres Notu</label>
                  <TextArea
                    name="notes"
                    placeholder="Kurye için özel bir not paylaşmak ister misiniz?"
                    value={form.notes}
                    onChange={handleChange}
                  />
                </div>
              </Section>

              <Section>
                <SectionTitle>Teslimat Tercihi</SectionTitle>
                <RadioGroup>
                  <RadioOption active={form.delivery === 'standard'}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <input
                        type="radio"
                        name="delivery"
                        value="standard"
                        checked={form.delivery === 'standard'}
                        onChange={handleChange}
                      />
                      <OptionInfo>
                        <strong>Standart Teslimat</strong>
                        <Helper>2-4 iş günü • Ücretsiz</Helper>
                      </OptionInfo>
                    </div>
                    <span>0 ₺</span>
                  </RadioOption>
                  <RadioOption active={form.delivery === 'express'}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <input
                        type="radio"
                        name="delivery"
                        value="express"
                        checked={form.delivery === 'express'}
                        onChange={handleChange}
                      />
                      <OptionInfo>
                        <strong>Hızlı Teslimat</strong>
                        <Helper>24 saat içinde kapında</Helper>
                      </OptionInfo>
                    </div>
                    <span>49,90 ₺</span>
                  </RadioOption>
                </RadioGroup>
              </Section>

              <Section>
                <SectionTitle>Ödeme Bilgileri</SectionTitle>
                <RadioGroup>
                  <RadioOption active={form.paymentMethod === 'card'}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={form.paymentMethod === 'card'}
                        onChange={handleChange}
                      />
                      <OptionInfo>
                        <strong>Kredi/Banka Kartı</strong>
                        <Helper>Visa, MasterCard, Troy</Helper>
                      </OptionInfo>
                    </div>
                  </RadioOption>
                  <RadioOption active={form.paymentMethod === 'cash'}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cash"
                        checked={form.paymentMethod === 'cash'}
                        onChange={handleChange}
                      />
                      <OptionInfo>
                        <strong>Kapıda Ödeme</strong>
                        <Helper>Nakit veya POS</Helper>
                      </OptionInfo>
                    </div>
                  </RadioOption>
                </RadioGroup>

                {form.paymentMethod === 'card' && (
                  <>
                    <Input
                      label="Kart Üzerindeki İsim"
                      name="cardName"
                      value={form.cardName}
                      onChange={handleChange}
                      error={errors.cardName}
                      helperText={errors.cardName}
                      required
                    />
                    <Input
                      label="Kart Numarası"
                      name="cardNumber"
                      placeholder="0000 0000 0000 0000"
                      value={form.cardNumber}
                      onChange={handleChange}
                      error={errors.cardNumber}
                      helperText={errors.cardNumber}
                      required
                    />
                    <FieldRow>
                      <Input
                        label="Son Kullanma"
                        name="cardExpiry"
                        placeholder="AA/YY"
                        value={form.cardExpiry}
                        onChange={handleChange}
                        error={errors.cardExpiry}
                        helperText={errors.cardExpiry}
                        required
                        fullWidth
                      />
                      <Input
                        label="CVC"
                        name="cardCvc"
                        placeholder="123"
                        value={form.cardCvc}
                        onChange={handleChange}
                        error={errors.cardCvc}
                        helperText={errors.cardCvc}
                        required
                        fullWidth
                      />
                    </FieldRow>
                  </>
                )}
              </Section>

              <Section>
                <CheckboxWrapper>
                  <input
                    type="checkbox"
                    name="saveInfo"
                    checked={form.saveInfo}
                    onChange={handleChange}
                  />
                  <span>Bilgilerimi sonraki alışverişlerimde otomatik doldur.</span>
                </CheckboxWrapper>
                <CheckboxWrapper>
                  <input
                    type="checkbox"
                    name="acceptTerms"
                    checked={form.acceptTerms}
                    onChange={handleChange}
                  />
                  <span>
                    Ön bilgilendirme formu ve mesafeli satış sözleşmesini okudum, kabul ediyorum.
                    {errors.acceptTerms && (
                      <Helper style={{ color: 'red', marginTop: 4 }}>{errors.acceptTerms}</Helper>
                    )}
                  </span>
                </CheckboxWrapper>
              </Section>

              <Button type="submit" variant="primary" size="large" disabled={isSubmitting}>
                {isSubmitting ? 'İşleniyor...' : 'Siparişi Tamamla'}
              </Button>
            </FormCard>
          )}
        </div>

        <SummaryCard>
          <h3>Sipariş Özeti</h3>
          <Divider />
          <SummaryRow>
            <span>Ara Toplam</span>
            <span>{summary.subtotal.toLocaleString('tr-TR')} ₺</span>
          </SummaryRow>
          <SummaryRow>
            <span>Kargo</span>
            <span>{shippingCost === 0 ? 'Ücretsiz' : `${shippingCost.toLocaleString('tr-TR')} ₺`}</span>
          </SummaryRow>
          <SummaryTotal>
            <span>Genel Toplam</span>
            <span>{total.toLocaleString('tr-TR')} ₺</span>
          </SummaryTotal>
          <Divider />
          <Helper>
            Bu aşamada ödeme simüle edilir. Gerçek API entegrasyonu eklendiğinde bilgiler sunucuya
            iletilecektir.
          </Helper>
          <Button as={Link} to="/cart" variant="outline" fullWidth style={{ marginTop: '1rem' }}>
            Sepete Geri Dön
          </Button>
        </SummaryCard>
      </Wrapper>
    </div>
  );
};

export default Checkout;
