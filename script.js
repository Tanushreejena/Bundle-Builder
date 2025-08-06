
    const products = [
      { name: 'Tie-Dye Lounge Set', price: 150, img: 'assets/product-1.jpg' },
      { name: 'Sunburst Tracksuit', price: 150, img: 'assets/product-2.jpg' },
      { name: 'Retro Red Streetwear', price: 150, img: 'assets/product-3.jpg' },
      { name: 'Urban Sportwear Combo', price: 150, img: 'assets/product-4.jpg' },
      { name: 'Oversized Knit & Coat', price: 150, img: 'assets/product-5.jpg' },
      { name: 'Chic Monochrome Blazer', price: 150, img: 'assets/product-6.jpg' }
    ];

    const cart = {};

    const productGrid = document.getElementById('productGrid');
    const cartItems = document.getElementById('cartItems');
    const discountDisplay = document.getElementById('discountDisplay');
    const subtotalDisplay = document.getElementById('subtotalDisplay');

    function renderProducts() {
      productGrid.innerHTML = '';
      products.forEach((product, index) => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
          <img src="${product.img}" alt="${product.name}" />
          <p>${product.name}</p>
          <button onclick="addToCart(${index})">${cart[product.name] ? 'Added to Bundle' : 'Add to Bundle'}</button>
        `;
        productGrid.appendChild(productDiv);
      });
    }

    function renderCart() {
      cartItems.innerHTML = '';
      let subtotal = 0;
      let itemCount = 0;

      for (const key in cart) {
        const item = cart[key];
        subtotal += item.price * item.qty;
        itemCount += item.qty;

        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
          <img src="${item.img}" />
          <p>${item.name} - $${item.price}</p>
          <div class="qty-controls">
            <button onclick="changeQty('${item.name}', -1)">-</button>
            <span>${item.qty}</span>
            <button onclick="changeQty('${item.name}', 1)">+</button>
            <button onclick="removeItem('${item.name}')">🗑️</button>
          </div>
        `;
        cartItems.appendChild(itemDiv);
      }

      let discount = itemCount >= 3 ? subtotal * 0.3 : 0;
      discountDisplay.textContent = `Discount: -$${discount.toFixed(2)}`;
      subtotalDisplay.textContent = `Subtotal: $${(subtotal - discount).toFixed(2)}`;

      renderProducts();
    }

    function addToCart(index) {
      const product = products[index];
      if (!cart[product.name]) {
        cart[product.name] = { ...product, qty: 1 };
        renderCart();
      }
    }

    function changeQty(name, delta) {
      if (cart[name]) {
        cart[name].qty += delta;
        if (cart[name].qty <= 0) {
          delete cart[name];
        }
        renderCart();
      }
    }

    function removeItem(name) {
      delete cart[name];
      renderCart();
    }

    renderProducts();