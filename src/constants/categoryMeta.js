const categoryMeta = {
  kadin: {
    label: 'Kadın',
    hero: {
      title: 'Kadın Koleksiyonu',
      subtitle: 'Modern siluetler, dokulu kumaşlar ve işlevsel katmanlarla Becca Giyim kadın koleksiyonu.',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1000&q=80'
    },
    subcategories: [
      { slug: 'takim', label: 'Takım', description: 'Ofisten akşam davetine uzanan takımlar' },
      { slug: 'dis-giyim', label: 'Dış Giyim', description: 'Mevsimlik kaban ve ceketler' },
      { slug: 'alt-giyim', label: 'Alt Giyim', description: 'Pantolon, etek ve yüksek bel tasarımlar' },
      { slug: 'ust-giyim', label: 'Üst Giyim', description: 'Gömlek, triko ve kusursuz üstler' }
    ]
  },
  erkek: {
    label: 'Erkek',
    hero: {
      title: 'Erkek Koleksiyonu',
      subtitle: 'Şehir estetiğinden ilham alan dış giyim, kusursuz kalıplar ve günlük rahatlık.',
      image: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=1000&q=80'
    },
    subcategories: [
      { slug: 'dis-giyim', label: 'Dış Giyim', description: 'Teknik kaban ve ceketler' },
      { slug: 'alt-giyim', label: 'Alt Giyim', description: 'Chino, jogger ve denimler' },
      { slug: 'ust-giyim', label: 'Üst Giyim', description: 'Overshirt, t-shirt ve trikolar' }
    ]
  }
};

export default categoryMeta;
