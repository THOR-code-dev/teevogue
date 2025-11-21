const products = [
  {
    id: 'BG-KAD-TAK-001',
    title: 'Serenity Premium Takım',
    gender: 'kadin',
    category: 'takim',
    description: 'Modern kalıp blazer ve pensli pantolon ikilisi. Nefes alabilen kumaşı ve kusursuz dikişleri ile gün boyu konfor.',
    heroImage: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542060748-10c28b62716a?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Gece Mavisi', code: '#0F172A' },
      { name: 'Şampanya', code: '#F6E1C3' }
    ],
    sizes: ['34', '36', '38', '40'],
    price: 3299,
    oldPrice: 3699,
    discount: 12,
    inventory: 14,
    tags: ['takim', 'kadin', 'office'],
    rating: 4.8
  },
  {
    id: 'BG-KAD-DIS-001',
    title: 'Aurora Kaban',
    gender: 'kadin',
    category: 'dis-giyim',
    description: 'Yün karışımlı uzun kaban, minimal tasarım ve büyük cepler.',
    heroImage: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Koyu Meşe', code: '#3F2F2F' },
      { name: 'Kül Grisi', code: '#B0B0B0' }
    ],
    sizes: ['34', '36', '38', '40', '42'],
    price: 2799,
    oldPrice: 0,
    discount: null,
    inventory: 10,
    tags: ['dis-giyim', 'kaban'],
    rating: 4.6
  },
  {
    id: 'BG-KAD-ALT-001',
    title: 'Contour Yüksek Bel Pantolon',
    gender: 'kadin',
    category: 'alt-giyim',
    description: 'Koleksiyonun imza kalıplarından, likralı kumaş ile kusursuz duruş.',
    heroImage: 'https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?auto=format&fit=crop&w=800&q=80',
    gallery: [],
    colors: [
      { name: 'Siyah', code: '#000000' },
      { name: 'Kum', code: '#D4B483' }
    ],
    sizes: ['34', '36', '38', '40', '42'],
    price: 1599,
    oldPrice: 1899,
    discount: 15,
    inventory: 25,
    tags: ['pantolon', 'kadin'],
    rating: 4.5
  },
  {
    id: 'BG-KAD-UST-001',
    title: 'Ethereal İpek Gömlek',
    gender: 'kadin',
    category: 'ust-giyim',
    description: '%100 ipek kumaş, ince sedef düğmeler ve oversize kesim.',
    heroImage: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80',
    gallery: [],
    colors: [
      { name: 'İnci', code: '#F7F4EF' },
      { name: 'Toz Pembe', code: '#F2D7D5' }
    ],
    sizes: ['34', '36', '38', '40'],
    price: 1899,
    oldPrice: 0,
    discount: null,
    inventory: 18,
    tags: ['gomlek', 'ipek'],
    rating: 4.9
  },
  {
    id: 'BG-ERK-DIS-001',
    title: 'Nordic Yaka Kaşe Kaban',
    gender: 'erkek',
    category: 'dis-giyim',
    description: 'İtalyan kaşesi ile üretilen, su itici nano kaplamalı kaban.',
    heroImage: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80',
    gallery: [],
    colors: [
      { name: 'Gece Mavisi', code: '#0F172A' },
      { name: 'Antrasit', code: '#444444' }
    ],
    sizes: ['46', '48', '50', '52'],
    price: 3599,
    oldPrice: 3899,
    discount: 8,
    inventory: 9,
    tags: ['kaban', 'erkek'],
    rating: 4.7
  },
  {
    id: 'BG-ERK-ALT-001',
    title: 'Axis Slim Fit Chino',
    gender: 'erkek',
    category: 'alt-giyim',
    description: 'Organik pamuklu kumaş, hafif dokulu yüzey ve maksimum esneklik.',
    heroImage: 'https://images.unsplash.com/photo-1503342250614-ca4407868a5b?auto=format&fit=crop&w=800&q=80',
    gallery: [],
    colors: [
      { name: 'Zeytin', code: '#5B674E' },
      { name: 'Kum', code: '#C2B280' }
    ],
    sizes: ['30', '31', '32', '33', '34', '36'],
    price: 1399,
    oldPrice: 1599,
    discount: 13,
    inventory: 30,
    tags: ['chino', 'erkek'],
    rating: 4.4
  },
  {
    id: 'BG-ERK-UST-001',
    title: 'Atlas Modal Overshirt',
    gender: 'erkek',
    category: 'ust-giyim',
    description: 'Modal karışımlı kumaşıyla rahat ve sofistike overshirt.',
    heroImage: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    gallery: [],
    colors: [
      { name: 'Kül', code: '#8D8D8D' },
      { name: 'Toffee', code: '#C4733C' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    price: 1799,
    oldPrice: 0,
    discount: null,
    inventory: 22,
    tags: ['overshirt'],
    rating: 4.3
  },
  {
    id: 'BG-KAD-UST-002',
    title: 'Linea Crop Triko',
    gender: 'kadin',
    category: 'ust-giyim',
    description: 'Ribana detaylı crop triko, kapsül gardırop için kilit parça.',
    heroImage: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=800&q=80',
    gallery: [],
    colors: [
      { name: 'Krem', code: '#F4EDE4' },
      { name: 'Pas', code: '#C4733C' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    price: 899,
    oldPrice: 1099,
    discount: 18,
    inventory: 40,
    tags: ['triko'],
    rating: 4.6
  },
  {
    id: 'BG-KAD-ALT-002',
    title: 'Flow Satın Etek',
    gender: 'kadin',
    category: 'alt-giyim',
    description: 'Bias kesim saten etek, çarpıcı parlak yüzey.',
    heroImage: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80',
    gallery: [],
    colors: [
      { name: 'Bronz', code: '#B66E41' },
      { name: 'Gece', code: '#1A1B1F' }
    ],
    sizes: ['34', '36', '38', '40'],
    price: 1299,
    oldPrice: 1499,
    discount: 13,
    inventory: 28,
    tags: ['etek'],
    rating: 4.2
  },
  {
    id: 'BG-ERK-ALT-002',
    title: 'Drift Jogger',
    gender: 'erkek',
    category: 'alt-giyim',
    description: 'Teknik kumaşlı jogging pantolon, lazer kesim detaylar.',
    heroImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
    gallery: [],
    colors: [
      { name: 'Kömür', code: '#2B2B2B' },
      { name: 'Orman', code: '#1F3A3D' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    price: 1199,
    oldPrice: 0,
    discount: null,
    inventory: 35,
    tags: ['athleisure'],
    rating: 4.4
  },
  {
    id: 'BG-ERK-UST-002',
    title: 'Hue Premium T-Shirt',
    gender: 'erkek',
    category: 'ust-giyim',
    description: 'Supima pamuktan üretilen oversize t-shirt, minimalist baskı.',
    heroImage: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80',
    gallery: [],
    colors: [
      { name: 'Off White', code: '#F2F1ED' },
      { name: 'Antrasit', code: '#3C4146' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    price: 699,
    oldPrice: 0,
    discount: null,
    inventory: 60,
    tags: ['tshirt'],
    rating: 4.1
  },
  {
    id: 'BG-KAD-TAK-002',
    title: 'Muse Knit Takım',
    gender: 'kadin',
    category: 'takim',
    description: 'Yumuşak dokulu triko takım; relaxed fit kazak + geniş paça pantolon.',
    heroImage: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80',
    gallery: [],
    colors: [
      { name: 'Bej', code: '#E8DCC2' },
      { name: 'Siyah', code: '#000000' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    price: 2199,
    oldPrice: 2399,
    discount: 8,
    inventory: 20,
    tags: ['loungewear'],
    rating: 4.5
  }
];

export default products;
