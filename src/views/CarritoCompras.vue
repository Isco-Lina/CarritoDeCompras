<template>
  <div class="container">
    <!-- Columna izquierda: productos -->
    <section>
      <h1 class="title">Productos disponibles</h1>

      <!-- UNA sola lista -->
      <ul class="list">
        <li v-for="product in products" :key="product.id" class="product">
          <img :src="product.img" :alt="product.name" class="product__img" />
          <div class="product__info">
            <div class="product__title">
              {{ product.name }} -
              <span>Precio $: {{ fmt(product.price) }}</span>
            </div>
            <button class="btn" @click="addToCart(product)">
              <span class="btn__icon">🛒</span> Agregar al carrito
            </button>
          </div>
        </li>
      </ul>
    </section>

    <!-- Columna derecha: carrito -->
    <section>
      <h2 class="title">Productos en el carrito</h2>

      <!-- UNA sola lista -->
      <ul class="list">
        <li v-for="item in cart" :key="item.product.id" class="cart-item">
          <img
            :src="item.product.img"
            :alt="item.product.name"
            class="cart-item__img"
          />
          <div class="cart-item__info">
            <div class="cart-item__title">{{ item.product.name }}</div>
            <div class="cart-item__meta">
              Cantidad: {{ item.quantity }} · Subtotal: ${{
                fmt(item.product.price * item.quantity)
              }}
            </div>
            <button class="btn btn--danger" @click="removeFromCart(item)">
              Remover del carrito
            </button>
          </div>
        </li>
      </ul>
    </section>
  </div>
  <section>
    <!-- Total a pagar -->
    <div class="total">
      Total a pagar: <span>${{ fmt(total) }}</span>
    </div>
  </section>
</template>

<script>
export default {
  name: "CarritoCompras",
  data() {
    return {
      products: [
        {
          id: 1,
          name: "Audífono",
          price: 30000,
          img: "/images/carrito-compras.jpg",
        },
        { id: 2, name: "Mouse", price: 20000, img: "/images/mouse-gamer.png" },
        {
          id: 3,
          name: "Teclado",
          price: 15000,
          img: "/images/teclado-gamer.png",
        },
        { id: 4, name: "Gabinete", price: 35000, img: "/images/gabinete.jpg" },
        { id: 5, name: "Pantalla", price: 175000, img: "/images/monitor.png" },
        { id: 6, name: "Silla", price: 150000, img: "/images/silla-gamer.jpg" },
      ],
      cart: [], // { product, quantity }
    };
  },
  computed: {
    total() {
      return this.cart.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
      );
    },
  },
  methods: {
    fmt(n) {
      return new Intl.NumberFormat("es-CL").format(n);
    },

    addToCart(product) {
      // Stock máximo por producto (según tu tabla)
      let maxStock = 0;
      if (product.id === 1 || product.name === "Audífono") {
        maxStock = 3;
      } else if (product.id === 2 || product.name === "Mouse") {
        maxStock = 5;
      } else if (product.id === 3 || product.name === "Teclado") {
        maxStock = 10;
      } else if (product.id === 4 || product.name === "Gabinete") {
        maxStock = 4;
      } else if (product.id === 5 || product.name === "Pantalla") {
        maxStock = 3;
      } else if (product.id === 6 || product.name === "Silla") {
        maxStock = 2;
      } else {
        maxStock = 0; // por si llega un producto no listado
      }

      const cartItem = this.cart.find((i) => i.product.id === product.id);

      if (cartItem) {
        if (cartItem.quantity < maxStock) {
          cartItem.quantity++;
        } else {
          alert(
            `No hay más unidades disponibles de "${product.name}" Stock máximo: ${maxStock}`
          );
        }
      } else {
        if (maxStock > 0) {
          this.cart.push({ product, quantity: 1 });
        } else {
          alert(`"${product.name}" no tiene stock disponible.`);
        }
      }
    },

    removeFromCart(item) {
      const idx = this.cart.indexOf(item);
      if (idx !== -1) {
        if (item.quantity > 1) {
          item.quantity--;
        } else {
          this.cart.splice(idx, 1);
        }
      }
    },
  },
};
</script>

<style>
:root {
  --bg: #ffffff;
  --text: #222;
  --muted: #6b7280;
  --brand: #6c63ff;
  --brand-press: #5a54e6;
  --danger: #ef4444;
}
* {
  box-sizing: border-box;
}
html,
body {
  height: 100%;
}
body {
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu,
    Cantarell, "Helvetica Neue", Arial, "Noto Sans";
}

.container {
  max-width: 1100px;
  margin: 20px auto;
  padding: 0 16px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.title {
  margin: 0 0 16px;
  text-align: center;
  font-size: 28px;
  font-weight: 800;
}

.list {
  list-style: none;
  margin: 0;
  padding: 0;
}

/* Productos */
.product {
  display: grid;
  grid-template-columns: 72px 1fr;
  align-items: center;
  gap: 16px;
  padding: 14px 8px;
}
.product__img {
  width: 64px;
  height: 64px;
  object-fit: cover;
  border-radius: 8px;
}
.product__info {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.product__title {
  font-weight: 600;
}
.product__title span {
  color: var(--muted);
  font-weight: 600;
}

/* Botones */
.btn {
  background: var(--brand);
  color: #fff;
  border: 0;
  border-radius: 10px;
  padding: 10px 16px;
  font-weight: 700;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 8px 20px rgba(108, 99, 255, 0.25);
  width: 50%;
}
.btn:hover {
  background: var(--brand-press);
}
.btn__icon {
  font-size: 18px;
  line-height: 1;
}

.btn--danger {
  background: var(--danger);
  box-shadow: 0 8px 20px rgba(239, 68, 68, 0.25);
  width: auto;
}
.btn--danger:hover {
  filter: brightness(0.95);
}

/* Carrito */
.cart-item {
  display: grid;
  grid-template-columns: 64px 1fr;
  gap: 16px;
  padding: 14px 8px;
  align-items: center;
}
.cart-item__img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
}
.cart-item__title {
  font-weight: 700;
}
.cart-item__meta {
  color: var(--muted);
  margin: 6px 0 10px;
}

/* Total */
.total {
  margin-top: 18px;
  font-size: 28px;
  text-align: center;
  font-weight: 800;
}
.total span {
  font-weight: 800;
}

/* Responsive */
@media (max-width: 1024px) {
  .container {
    grid-template-columns: 1fr;
  }

  .container > :first-child .list {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 12px;
  }

  .container > :first-child .product {
    grid-template-columns: 1fr;
    text-align: center;
    padding: 12px 8px;
  }

  .container > :first-child .product__img {
    margin: 0 auto;
  }

  .container > :first-child .btn {
    width: 100%;
    min-width: unset;
    padding: 8px 10px;
    font-size: 13px;
    border-radius: 8px;
    box-shadow: none;
    line-height: 1.2;
  }

  .container > :first-child .btn__icon {
    font-size: 16px;
  }

  .container > :nth-child(2) .list {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
  }
}

@media (max-width: 768px) {
  .container {
    grid-template-columns: 1fr;
  }

  .container > :first-child .list {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
  }

  .container > :first-child .product {
    grid-template-columns: 1fr;
    text-align: center;
    padding: 12px 8px;
  }

  .container > :first-child .product__img {
    margin: 0 auto;
  }

  .container > :first-child .btn {
    width: 100%;
    min-width: unset;
    padding: 8px 10px;
    font-size: 13px;
    border-radius: 8px;
    box-shadow: none;
    line-height: 1.2;
  }

  .container > :first-child .btn__icon {
    font-size: 16px;
  }
}
</style>
