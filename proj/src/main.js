Vue.component('product-details', {
    props: {
        details: {
            type: Array,
            required: true
        }
    },
    template:`
        <ul>
            <li v-for="detail in details">{{ detail }}</li>
        </ul>
    `
})
Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },

    template: `
      <div class="product">
        <div class="product-image">
          <img :src="image" :alt="altText"/>
        </div>

        <div class="product-info">
          <h1>{{ title }}</h1>
          <p v-if="inStock">In stock</p>
          <p v-else style="text-decoration: line-through">Out of Stock</p>
          

          <p>Shipping: {{ shipping }}</p>
          
          <product-details :details="details"></product-details>
          
          <div class="color-box" v-for="variant in variants" :key="variant.variantId" :style="{ backgroundColor:variant.variantColor }"
               @mouseover="updateProduct(variant.variantImage)">
          </div>
          
          <button
              v-on:click="addToCart"
              :disabled="!inStock"
              :class="{ disabledButton: !inStock }"
          >
            Add to cart
          </button>
          <button @click="removeFromCart"
          >
            Remove
          </button>
        </div>
      </div>
    `,
    data() {
        return {
            product: "Socks",
            brand: 'Vue Mastery',
            selectedVariant: 0,
            image: "src/assets/vmSocks-green-onWhite.jpg",
            altText: "A pair of socks",
            details: ['80% cotton', '20% polyester', 'Gender-neutral'],
            inStock: true,
            variants: [
                {
                    variantId: 2234,
                    variantColor: 'green',
                    variantImage: "src/assets/vmSocks-green-onWhite.jpg",
                    variantQuantity: 10
                },
                {
                    variantId: 2235,
                    variantColor: 'blue',
                    variantImage: "src/assets/vmSocks-blue-onWhite.jpg",
                    variantQuantity: 0
                }
            ],
            cart: 0
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
        },
        updateCart(id) {
            this.cart.push(id);
        },

        updateProduct(variantImage) {
            this.image = variantImage
        },
        removeFromCart: function() {
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId)
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product;
        },
        shipping() {
            if (this.premium) {
                return "Free";
            } else {
                return 2.99
            }
        },
        //image() {
        //    return this.variants[this.selectedVariant].variantImage;
        //},
        //inStock(){
        //    return this.variants[this.selectedVariant].variantQuantity
        //}
    }
})

let app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: []
    },
    methods: {
        updateCart(id) {
            this.cart.push(id)
        },
        removeItem(id) {
            for(let i = this.cart.length - 1; i >= 0; i--) {
                if (this.cart[i] === id) {
                    this.cart.splice(i, 1);
                }
            }
        }
    }
})






