// const product = 'Socks';
// console.log('Hello JS!')

// const app = new Vue({
//     el: '#app',
//     data: {
//         brand: 'Vue Mastery',
//         product: 'Socks',
//         description: 'Warm and fuzzy.',
//         // image: './assets/vmSocks-green.png',
//         selectedVariant: 0,
//         alt: 'a pair of green socks',
//         sockHref: 'https://www.sockdreams.com/',
//         // inStock: true,
//         inventory: 12,
//         showMe: false,
//         onSale: true,
//         details: ["80% cotton", "20% polyester", "Gender-neutral"],
//         variants: [
//             {
//                 variantId: 2234,
//                 variantColor: 'green',
//                 variantImage: './assets/vmSocks-green.png',
//                 variantQuantity: 10
//             },
//             {
//                 variantId: 2235,
//                 variantColor: 'blue',
//                 variantImage: './assets/vmSocks-blue.png',
//                 variantQuantity: 0
//             }
//         ],
//         sizes: ["XXS", "XS", "S", "M", "L", "XL", "XXL"],
//         cart: 0,
//     },
//     methods: {
//         addToCart() {
//             this.cart += 1
//         },
//         updateProduct(index) {
//             // this.image = variantImage
//             this.selectedVariant = index
//         },
//         removeFromCart() {
//             this.cart -= 1
//         },
//         soldOut() {
//             inStock = false
//         }
//     },
//     computed: {
//         title() {
//             return this.brand + ' ' + this.product
//         },
//         image() {
//             return this.variants[this.selectedVariant].variantImage
//         },
//         inStock() {
//             return this.variants[this.selectedVariant].variantQuantity
//         },
//         saleMessage() {
//             return this.brand + ' ' + this.product + ' is on sale now!'
//         }
//     }
// });

Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        },
        cart: {
            type: Array,
            required: true
        }
    },
    template: `
    <div class="product">

        <div class="product-image">
            <img v-bind:src="image" :alt="alt">
        </div>

        <div class="product-info">
            <h1>{{ title }}</h1>
            <h2>{{ description }}</h2>
            <p v-if="inStock && inventory > 10">In Stock</p>
            <p v-else-if="inStock && inventory > 0 && inventory <= 10">Almost Sold Out</p>
            <p v-else :class="{outOfStock: !inStock}">Out of Stock</p>
            <p v-show="showMe">Show Me</p>
            <p v-if="onSale">{{ saleMessage }}</p>
            <p>User is premium: {{ premium }}</p>
            <p>Shipping: {{ shipping }}</p>
            <p>
                <a :href="sockHref" target="_blank">Sock Dreams</a>
            </p>
            
            <ul>
                <li v-for="size in sizes">{{ size }}</li>

            </ul>
            
            <div v-for="(variant, index) in variants"
                :key=""variant.variantId
                class="color-box"
                :style="{ backgroundColor: variant.variantColor }"
                @mouseover="updateProduct(index)"
                >
                <!-- <p @mouseover="updateProduct(variant.variantImage)">{{ variant.variantColor }}</p> -->
            </div>

            <button
                v-on:click="addToCart"
                :disabled="!inStock || cart === inventory"
                :class="{ disabledButton: !inStock }"
                >Add One to Cart</button>
            <button
                @click="removeFromCart"
                :disabled="emptyCart"
                :class="{ disabledButton: emptyCart }"
                >Remove One from Cart</button>
        </div>

    </div>
    `,
    data() {
        return {
            brand: 'Vue Mastery',
            product: 'Socks',
            description: 'Warm and fuzzy.',
            // image: './assets/vmSocks-green.png',
            selectedVariant: 0,
            alt: 'a pair of green socks',
            sockHref: 'https://www.sockdreams.com/',
            // inStock: true,
            inventory: 12,
            showMe: false,
            onSale: true,
            // details: ["80% cotton", "20% polyester", "Gender-neutral"],
            variants: [
                {
                    variantId: 2234,
                    variantColor: 'green',
                    variantImage: './assets/vmSocks-green.png',
                    variantQuantity: 10
                },
                {
                    variantId: 2235,
                    variantColor: 'blue',
                    variantImage: './assets/vmSocks-blue.png',
                    variantQuantity: 3
                }
            ],
            sizes: ["XXS", "XS", "S", "M", "L", "XL", "XXL"],
        }
    },
    methods: {
        addToCart() {
            // this.cart += 1
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
        },
        updateProduct(index) {
            // this.image = variantImage
            this.selectedVariant = index
        },
        removeFromCart() {
            // this.cart -= 1
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId)
        },
        soldOut() {
            inStock = false
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        },
        saleMessage() {
            return this.brand + ' ' + this.product + ' is on sale now!'
        },
        shipping() {
            if(this.premium) return 'Free'
            return 2.99
        },
        emptyCart() {
            return !this.cart.includes(this.variants[this.selectedVariant].variantId)
        }
    }
})

Vue.component('product-details', {
    props: {
        details: {
            type: Array,
            required: true
        }
    },
    template: `
        <ul>
            <li v-for="detail in details">{{ detail }}</li>
        </ul>
    `
})

const app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: []
    },
    methods: {
        updateCart(id) {
            // this.cart += 1
            this.cart.push(id)
        },
        removeItem(id) {
            for(let i = 0; i < this.cart.length; i++) {
                if(this.cart[i] === id) {
                    this.cart.splice(i, 1);
                    return this.cart;
                }
            }
        }
    }
});

