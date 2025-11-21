// Tema renkleri ve tipografi
const theme = {
  colors: {
    // Ana renkler
    primary: '#0F172A',      // Gece mavisi - ana marka rengi
    secondary: '#C4733C',    // Bakır - vurgu rengi
    accent: '#E4C7A5',       // Sıcak ton - ikincil vurgu
    
    // Nötr renkler
    background: '#F5F5F5',   // Açık gri arka plan
    surface: '#FFFFFF',      // Kart arka planı
    muted: '#E6E6E6',
    text: {
      primary: '#1E1E1E',    // Koyu gri - ana metin
      secondary: '#5F6368',  // Orta gri - ikincil metin
      disabled: '#B0B5C0',   // Açık gri - devre dışı metin
    },
    
    // Durum renkleri
    success: '#3FA996',      // Yeşil-mavi - başarı
    error: '#E14949',        // Kırmızı - hata
    warning: '#F5B248',      // Amber - uyarı
    info: '#4E7DF2',         // Mavi - bilgi
    
    gradients: {
      hero: 'linear-gradient(135deg, #0F172A 0%, #1E2A44 45%, #C4733C 100%)',
      card: 'linear-gradient(180deg, rgba(15,23,42,0.05) 0%, rgba(196,115,60,0.08) 100%)'
    }
  },
  
  typography: {
    fontFamily: {
      heading: "'Playfair Display', serif",  // Başlık fontu
      body: "'Inter', sans-serif",           // Metin fontu
    },
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      md: '1rem',       // 16px
      lg: '1.25rem',    // 20px
      xl: '1.5rem',     // 24px
      xxl: '2.25rem',   // 36px
      xxxl: '3.25rem',  // 52px
    },
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      semiBold: 600,
      bold: 700,
      black: 800,
    },
    letterSpacing: {
      tight: '-0.02em',
      normal: '0',
      wide: '0.08em'
    }
  },
  
  spacing: {
    xs: '0.25rem',    // 4px
    sm: '0.5rem',     // 8px
    md: '1rem',       // 16px
    lg: '1.5rem',     // 24px
    xl: '2rem',       // 32px
    xxl: '3rem',      // 48px
  },
  
  borderRadius: {
    sm: '0.25rem',    // 4px
    md: '0.5rem',     // 8px
    lg: '1rem',       // 16px
    full: '9999px',   // Tam yuvarlak
  },
  
  shadows: {
    sm: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    md: '0 3px 6px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.12)',
    lg: '0 10px 20px rgba(0,0,0,0.15), 0 3px 6px rgba(0,0,0,0.10)',
  },
  
  // Medya sorguları için breakpoint'ler
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1280px',
  },
};

export default theme;
