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
            <product-details :details="['80% cotton', '20% polyester', 'Gender-neutral']"></product-details >
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

            <div class="product-options">
                <ul>
                    <li v-for="size in sizes">{{ size }}</li>

                </ul>
                
                <ul class="product-colors">
                    <li v-for="(variant, index) in variants"
                        :key=""variant.variantId
                        class="color-box"
                        :style="{ backgroundColor: variant.variantColor }"
                        @mouseover="updateProduct(index)"
                        >
                        <!-- <p @mouseover="updateProduct(variant.variantImage)">{{ variant.variantColor }}</p> -->
                    </li>
                </ul>

                <div class="product-buttons">
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
            


        </div>

        <div class="product-reviews">
          <h2>Reviews</h2>
          <product-review @review-submitted="addReview"></product-review>
          <p v-if="!reviews.length">There are no reviews yet.</p>
          <ul class="product-review-list">
            <li v-for="review in reviews">
            <p>"{{ review.review }}"</p>
            <p>- {{ review.name }} ({{ review.rating }} stars - {{ review.recommendation }})</p>
            </li>
          </ul>
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
            reviews: []
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
        },
        addReview(productReview) {
          this.reviews.push(productReview)
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
});

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
});

Vue.component('product-review', {
    template: `
      <div class="product-review">
        <form class="review-form" @submit.prevent="onSubmit">
          <p>
            <label for="name">Name:</label>
            <input id="name" v-model="name" placeholder="name">
          </p>
          
          <p>
            <label for="review">Review:</label>
            <br />  
            <textarea id="review" v-model="review" placeholder="Add your review..."></textarea>
          </p>
          
          <p>
            <label for="rating">Rating:</label>
            <select id="rating" v-model.number="rating">
              <option>5</option>
              <option>4</option>
              <option>3</option>
              <option>2</option>
              <option>1</option>
            </select>
          </p>

          <p>
            Would you recommend this product?
            Yes <input type="radio" id="choiceOne" name="recommend" value="yes" v-model="recommendation" />
            No <input type="radio" id="choiceTwo" name="recommend" value="no" v-model="recommendation" />
          </p>
              
          <p>
            <input type="submit" value="Submit">
          </p>

          <p v-if="errors.length">
            <b>Please correct the following error(s):</b>
            <ul>
              <li v-for="error in errors">{{ error }}</li>
            </ul>
          </p>
      
        </form>
      </div>
    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            errors: []
        }
    },
    methods: {
      onSubmit() {
        this.errors = [];
        if(this.name && this.review && this.rating && this.recommendation) {
          let productReview = {
            name: this.name,
            review: this.review,
            rating: this.rating,
            recommendation: this.recommendation
          }
          this.$emit('review-submitted', productReview);
          this.name = null;
          this.review = null;
          this.rating = null;
        } else {
          if(!this.name) this.errors.push("Name required.");
          if(!this.review) this.errors.push("Review required.");
          if(!this.rating) this.errors.push("Rating required.");
          if(!this.recommendation) this.errors.push("Recommendation required.");
        }
      }
    }
});

const app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: []
    },
    methods: {
        updateCart(id) {
            // this.cart += 1
            this.cart.push(id);
            console.log(this.cart)
        },
        removeItem(id) {
            console.log(this.cart)
            for(let i = 0; i < this.cart.length; i++) {
                if(this.cart[i] === id) {
                    this.cart.splice(i, 1);
                    console.log(this.cart)
                    return this.cart;
                }
            }
        }
    }
});

