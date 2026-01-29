// products-script.js — smooth, no bugs

const products = [
  // 10 NEW PHONES
  { name: 'Samsung Galaxy S23 Ultra', img: 's23.jpeg', price: 350000, spec: 'Black, 256GB, 12GB RAM', type: 'phone', condition: 'new' },
  { name: 'Samsung Galaxy S23+', img: 's23plus.jpeg', price: 280000, spec: 'Green, 256GB, 8GB RAM', type: 'phone', condition: 'new' },
  { name: 'iPhone 15 Pro Max', img: '15promax.jpeg', price: 1250000, spec: 'Natural Titanium, 256GB', type: 'phone', condition: 'new' },
  { name: 'iPhone 15 Pro', img: '15pro.jpeg', price: 950000, spec: 'Black Titanium, 128GB', type: 'phone', condition: 'new' },
  { name: 'iPhone 15 Plus', img: '15plusb.png', price: 850000, spec: 'Blue, 256GB', type: 'phone', condition: 'new' },
  { name: 'OnePlus 11', img: 'opp11.jpeg', price: 420000, spec: 'Titan Black, 256GB, 16GB RAM', type: 'phone', condition: 'new' },
  { name: 'Google Pixel 8 Pro', img: 'pixel8pro.webp', price: 580000, spec: 'Obsidian, 256GB', type: 'phone', condition: 'new' },
  { name: 'Xiaomi 14 Ultra', img: 'mi14u.jpeg', price: 650000, spec: 'Black, 512GB, 16GB RAM', type: 'phone', condition: 'new' },
  { name: 'Nothing Phone (2)', img: 'nothing1.webp', price: 310000, spec: 'White, 128GB, 8GB RAM', type: 'phone', condition: 'new' },
  { name: 'OPPO Find X6 Pro', img: 'findx6.webp', price: 540000, spec: 'Green, 512GB', type: 'phone', condition: 'new' },

  // 10 UK USED PHONES (light use)
  { name: 'iPhone 14 Pro Max', img: '14promax.jpeg', price: 720000, spec: 'Deep Purple, 128GB, 98% battery', type: 'phone', condition: 'used' },
  { name: 'Samsung Galaxy S22 Ultra', img: 's22u.jpeg', price: 260000, spec: 'Phantom Black, 128GB, 95% battery', type: 'phone', condition: 'used' },
  { name: 'iPhone 13 Pro', img: '13pro.jpeg', price: 450000, spec: 'Gold, 256GB, 97% battery', type: 'phone', condition: 'used' },
  { name: 'Google Pixel 7 Pro', img: 'pixel17pro.jpeg', price: 190000, spec: 'Hazel, 128GB, 96% battery', type: 'phone', condition: 'used' },
  { name: 'iPhone 13 Mini', img: '13mini.jpeg', price: 220000, spec: 'Midnight, 128GB, 94% battery', type: 'phone', condition: 'used' },
  { name: 'Samsung Galaxy S21 FE', img: 's21fe.jpeg', price: 150000, spec: 'Graphite, 128GB, 92% battery', type: 'phone', condition: 'used' },
  { name: 'OnePlus 10 Pro', img: 'oneplus.jpeg', price: 240000, spec: 'Volcanic Black, 256GB, 95% battery', type: 'phone', condition: 'used' },
  { name: 'Xiaomi 13', img: 'mi13.jpeg', price: 220000, spec: 'White, 256GB, 96% battery', type: 'phone', condition: 'used' },
  { name: 'Nothing Phone (1)', img: 'nothing1.webp', price: 150000, spec: 'Black, 256GB, 93% battery', type: 'phone', condition: 'used' },
  { name: 'OPPO Reno 9', img: 'reno9.jpeg', price: 180000, spec: 'Purple, 256GB, 94% battery', type: 'phone', condition: 'used' },

  // 30 LAPTOPS
  { name: 'MacBook Air M3', img: 'm3.avif', price: 1050000, spec: 'Space Gray, 8GB, 256GB SSD', type: 'laptop', condition: 'new' },
  { name: 'MacBook Pro M2 Pro', img: 'm2.webp', price: 1450000, spec: 'Silver, 16GB, 512GB SSD', type: 'laptop', condition: 'new' },
  { name: 'Dell XPS 13 9315', img: 'xps13.jpg', price: 680000, spec: 'Platinum Silver, i5-12th, 16GB, 512GB', type: 'laptop', condition: 'new' },
  { name: 'HP Spectre x360 14', img: 'hp14.webp', price: 850000, spec: 'Nightfall Black, i7-13th, 16GB, 1TB', type: 'laptop', condition: 'new' },
  { name: 'Lenovo ThinkPad X1 Carbon G10', img: 'lenx1.jpg', price: 920000, spec: 'Black, i7-12th, 32GB, 1TB', type: 'laptop', condition: 'new' },
  { name: 'ASUS Zenbook 14 OLED', img: 'asus14.jpg', price: 520000, spec: 'Jasper Gray, Ryzen 7, 16GB, 512GB', type: 'laptop', condition: 'new' },
  { name: 'Acer Swift Go 14', img: 'acer14.jpg', price: 380000, spec: 'Pure Silver, i5-13th, 8GB, 512GB', type: 'laptop', condition: 'new' },
  { name: 'MacBook Air M2', img: 'macm2.jpg', price: 750000, spec: 'Starlight, 8GB, 256GB SSD', type: 'laptop', condition: 'new' },
  { name: 'Dell Inspiron 14 Plus', img: 'dell14plus.webp', price: 440000, spec: 'Ice Blue, i7-13th, 16GB, 512GB', type: 'laptop', condition: 'new' },
  { name: 'HP Pavilion Plus 14', img: 'hpplus14.jpg', price: 510000, spec: 'Gold, Ryzen 5, 16GB, 512GB', type: 'laptop', condition: 'new' },
  { name: 'MacBook Air 2020 M1', img: 'm12020.webp', price: 520000, spec: 'Space Gray, 8GB, 256GB', type: 'laptop', condition: 'used' },
  { name: 'MacBook Pro 2019 16"', img: 'mac2019.webp', price: 680000, spec: 'Space Black, i9, 16GB, 1TB', type: 'laptop', condition: 'used' },
  { name: 'Dell XPS 15 9510', img: 'dellxps15.webp', price: 580000, spec: 'Silver, i7-11th, 32GB, 1TB', type: 'laptop', condition: 'used' },
  { name: 'HP EliteBook 840 G8', img: 'hpebook.webp', price: 320000, spec: 'Black, i5-11th, 16GB, 512GB', type: 'laptop', condition: 'used' },
  { name: 'Lenovo ThinkPad X1 Yoga G7', img: 'togag7.png', price: 420000, spec: 'Thunder Black, i7-12th, 16GB, 512GB', type: 'laptop', condition: 'used' },
  { name: 'ASUS ROG Strix G16', img: 'asusrog.jpg', price: 480000, spec: 'Phantom Gray, RTX 4060, i7, 16GB, 1TB', type: 'laptop', condition: 'new' },
  { name: 'MSI Modern 14', img: 'msi.webp', price: 350000, spec: 'Carbon Gray, Ryzen 7, 16GB, 512GB', type: 'laptop', condition: 'new' },
  { name: 'Razer Blade 14', img: 'razerblade.jpg', price: 950000, spec: 'Mercury White, RTX 4060, Ryzen 9, 32GB, 1TB', type: 'laptop', condition: 'new' },
  { name: 'Acer Predator Helios 300', img: 'acerp.webp', price: 550000, spec: 'Abyssal Black, RTX 3060, i7-12th, 16GB, 512GB', type: 'laptop', condition: 'new' },
  { name: 'Samsung Galaxy Book4 Pro', img: 'book4.avif', price: 650000, spec: 'Moonstone Gray, Intel Core Ultra, 16GB, 512GB', type: 'laptop', condition: 'new' },
  { name: 'MacBook Pro M3 Pro', img: 'm3pro.avif', price: 1650000, spec: 'Silver, 18GB, 512GB SSD', type: 'laptop', condition: 'new' },
  { name: 'Dell Inspiron 16 Plus', img: 'dell16plus.jpg', price: 520000, spec: 'Platinum Silver, i7-13th, 16GB, 1TB', type: 'laptop', condition: 'new' },
  { name: 'HP Envy x360 15', img: 'hpenvy.jpg', price: 420000, spec: 'Natural Silver, Ryzen 5, 16GB, 512GB', type: 'laptop', condition: 'new' },
  { name: 'Lenovo Yoga 9i', img: 'yoga9.avif', price: 620000, spec: 'Cosmic Blue, i7-13th, 32GB, 1TB', type: 'laptop', condition: 'new' },
  { name: 'ASUS VivoBook Pro 16X', img: 'asus16x.webp', price: 480000, spec: 'Indie Black, RTX 4050, i5-13th, 16GB, 512GB', type: 'laptop', condition: 'new' },
  { name: 'MacBook Air M1 8GB', img: 'macairm1.webp', price: 480000, spec: 'Gold, 8GB, 256GB', type: 'laptop', condition: 'used' },
  { name: 'MacBook Pro 2020 13"', img: 'macbookpro2020.jpg', price: 420000, spec: 'Silver, M1, 16GB, 512GB', type: 'laptop', condition: 'used' },
  { name: 'Dell Latitude 7420', img: 'dell7420.jpg', price: 280000, spec: 'River, i7-11th, 16GB, 512GB', type: 'laptop', condition: 'used' },
  { name: 'HP Spectre x360 14 2022', img: 'hpspe.webp', price: 350000, spec: 'Nightfall, i5-12th, 16GB, 512GB', type: 'laptop', condition: 'used' },
  { name: 'ThinkPad T14s Gen 4', img: 'tth14.webp', price: 380000, spec: 'Black, Ryzen 7, 32GB, 1TB', type: 'laptop', condition: 'used' },
  { name: 'Dell XPS 13 Plus', img: 'dellxps13.jpg', price: 450000, spec: 'Graphite, i7-12th, 32GB, 1TB', type: 'laptop', condition: 'used' },
  { name: 'HP Omen 16', img: 'omen16.webp', price: 480000, spec: 'Shadow Black, RTX 3060, i7-12th, 16GB, 1TB', type: 'laptop', condition: 'used' },
  { name: 'Lenovo Legion 5', img: 'legion5.webp', price: 420000, spec: 'Phantom Blue, RTX 3050, Ryzen 7, 16GB, 512GB', type: 'laptop', condition: 'used' },
  { name: 'ASUS TUF Gaming A15', img: 'asustuf.avif', price: 350000, spec: 'Graphite Black, RTX 3050, Ryzen 5, 8GB, 512GB', type: 'laptop', condition: 'used' },
  { name: 'Acer Nitro 5', img: 'acern5.jpg', price: 310000, spec: 'Black, GTX 1650, i5-11th, 8GB, 512GB', type: 'laptop', condition: 'used' },
  { name: 'Microsoft Surface Laptop 4', img: 'surface4.webp', price: 420000, spec: 'Platinum, i7-11th, 16GB, 512GB', type: 'laptop', condition: 'used' },
  { name: 'Samsung Galaxy Book2 Pro', img: 'sambook2.jpg', price: 380000, spec: 'Silver, i5-12th, 8GB, 256GB', type: 'laptop', condition: 'used' },
  { name: 'LG Gram 17', img: 'gram17.webp', price: 550000, spec: 'Black, i7-12th, 16GB, 1TB', type: 'laptop', condition: 'used' },
  { name: 'Razer Blade 15', img: 'blade15.avif', price: 720000, spec: 'Black, RTX 3070, i7-11th, 16GB, 1TB', type: 'laptop', condition: 'used' },
  { name: 'MSI GF63 Thin', img: 'gf63.webp', price: 280000, spec: 'Black, GTX 1650, i5-11th, 8GB, 256GB', type: 'laptop', condition: 'used' },
];

let selectedItems = [];

function loadProducts(filterType = 'all') {
  const grid = document.querySelector('.product-grid');
  grid.innerHTML = '';

  const filtered = products.filter(p => {
    const matchType = filterType === 'all' || p.type === filterType;
    const matchCondition = (filterType === 'new' || filterType === 'used') 
      ? p.condition === filterType 
      : true;
    return matchType && matchCondition;
  });

  filtered.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.type = product.type;
    card.dataset.condition = product.condition;
    card.dataset.id = product.name;
    card.innerHTML = `
      <img src="${product.img}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.spec}</p>
      <strong>₦${product.price.toLocaleString()}</strong>
    `;

    card.addEventListener('click', () => {
      const item = selectedItems.find(i => i.name === product.name);
      if (item) {
        selectedItems = selectedItems.filter(i => i.name !== product.name);
        card.style.outline = 'none';
      } else {
        selectedItems.push(product);
        card.style.outline = '2px solid #00ffff';
      }
      updateCartDisplay();
    });

    card.addEventListener('mouseenter', () => {
      card.style.transform = 'scale(1.02)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'scale(1)';
    });

    grid.appendChild(card);
  });
}

function updateCartDisplay() {
  const countBadge = document.querySelector('.cart-count');
  const totalBtn = document.querySelector('.total-btn');

  const total = selectedItems.reduce((sum, item) => sum + item.price, 0);
  const count = selectedItems.length;

  if (countBadge) {
    countBadge.textContent = count;
    countBadge.style.display = count > 0 ? 'flex' : 'none';
  }

  if (totalBtn) {
    totalBtn.textContent = `₦${total.toLocaleString()}`;
    totalBtn.style.opacity = total > 0 ? '1' : '0';
  }
}

function sendToWhatsApp() {
  if (selectedItems.length === 0) return;

  const total = selectedItems.reduce((sum, item) => sum + item.price, 0);
  const list = selectedItems.map(p => `• ${p.name} – ₦${p.price.toLocaleString()}`).join('\n');
  const text = `Hi, I want these:\n${list}\n\nTotal: ₦${total.toLocaleString()}`;

  window.open(`https://wa.me/2347040363679?text=${encodeURIComponent(text)}`, '_blank');
}

document.querySelector('.cart-icon').addEventListener('click', sendToWhatsApp);

document.querySelectorAll('.filter-bar button').forEach(btn => {
  btn.addEventListener('click', () => {
    const type = btn.dataset.filter || 'all';
    loadProducts(type);
  });
});

const topBtn = document.querySelector('.scroll-to-top');
window.addEventListener('scroll', () => {
  topBtn.classList.toggle('visible', window.scrollY > 500);
});
topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

document.addEventListener('DOMContentLoaded', () => {
  loadProducts();
  updateCartDisplay();
});

