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
      required: true,
    },
    cart: {
      type: Array,
      required: true,
    },
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


            <product-details
                :details="['80% cotton', '20% polyester', 'Gender-neutral']"
            ></product-details>

            
            <ul>
                <li v-for="size in sizes">{{ size }}</li>

            </ul>

            <div class="color-boxes">
                <div v-for="(variant, index) in variants"
                    :key=""variant.variantId
                    class="color-box"
                    :style="{ backgroundColor: variant.variantColor }"
                    @mouseover="updateProduct(index)"
                    >
                    <!-- <p @mouseover="updateProduct(variant.variantImage)">{{ variant.variantColor }}</p> -->
                </div>
            </div>
            


            <div>
                <button
                    v-on:click="addToCart"
                    :disabled="!inStock || cart === inventory"
                    :class="{ disabledButton: !inStock }"
                >Add to Cart</button>

                <button
                    @click="removeFromCart"
                    :disabled="emptyCart"
                    :class="{ disabledButton: emptyCart }"
                >Remove from Cart</button>

                </div>
                <product-review @review-submitted="addReview"></product-review>

                <div>
                    <h2>Reviews</h2>
                    <p v-if="!reviews.length">There are no reviews yet.</p>
                    <ul>
                        <li v-for="review in reviews">
                            <p>Name: {{ review.name }}</p>
                            <p>Rating: {{ review.rating }}</p>
                            <p>Review: {{ review.review }}</p>
                            <p>Recommendation: {{ review.recommendation }}</p>
                        </li>
                    </ul>
                </div>



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
          variantQuantity: 10,
        },
        {
          variantId: 2235,
          variantColor: 'blue',
          variantImage: './assets/vmSocks-blue.png',
          variantQuantity: 3,
        },
      ],
      sizes: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'],
      reviews: [],
    };
  },
  methods: {
    addToCart() {
      // this.cart += 1
      this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
    },
    updateProduct(index) {
      // this.image = variantImage
      this.selectedVariant = index;
    },
    removeFromCart() {
      // this.cart -= 1
      this.$emit(
        'remove-from-cart',
        this.variants[this.selectedVariant].variantId
      );
    },
    soldOut() {
      inStock = false;
    },
    addReview(productReview) {
      this.reviews.push(productReview);
    },
  },
  computed: {
    title() {
      return this.brand + ' ' + this.product;
    },
    image() {
      return this.variants[this.selectedVariant].variantImage;
    },
    inStock() {
      return this.variants[this.selectedVariant].variantQuantity;
    },
    saleMessage() {
      return this.brand + ' ' + this.product + ' is on sale now!';
    },
    shipping() {
      if (this.premium) return 'Free';
      return 2.99;
    },
    emptyCart() {
      return !this.cart.includes(this.variants[this.selectedVariant].variantId);
    },
  },
});

Vue.component('product-details', {
  props: {
    details: {
      type: Array,
      required: true,
    },
  },
  template: `
        <ul>
            <li v-for="detail in details">{{ detail }}</li>
        </ul>
    `,
});

Vue.component('product-review', {
  template: `
  <form class="review-form" @submit.prevent="onReviewSubmit">

  <p v-if="errors.length">
    <b>PLease ccorret the folliwn error(s):</b>
    <ul class="error">
      <li v-for="error in errors">{{ error }}</li>
    </ul>
  </p>

  <p>
    <label for="name">Name:</label>
    <input type="text" id=""name v-model="name">
  </p>

  <p>
    <label for="review">Review:</label>
    <textarea
        name="review"
        id="review"
        cols="30"
        rows="10"
        v-model="review"
    ></textarea>
  </p>

  <p>
    <label for="rating">Rating:</label>
    <select name="rating" id="rating" v-model.number="rating">
      <option>5</option>
      <option>4</option>
      <option>3</option>
      <option>2</option>
      <option>1</option>
    </select>
  </p>

  <p>
    Would you recommend this product?
    <label for="yes">
      <input
        v-model="recommendation"
        type="radio"
        id="yes"
        name="recommendation"
        value="Yes"
      />
      Yes
    </label>
    <label for="no">
      <input
      v-model="recommendation"
        type="radio"
        id="no"
        name="recommendation"
        value="No"
      />
      No
    </label>
  </p>

  <p>
    <input type="submit" value="Submit">
  </p>
</form>
    `,
  data() {
    return {
      name: null,
      review: null,
      rating: null,
      recommendation: null,
      errors: [],
    };
  },
  methods: {
    onReviewSubmit() {
      if (this.name && this.review && this.rating && this.recommendation) {
        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating,
          recommendation: this.recommendation,
        };

        console.log(productReview)

        this.$emit('review-submitted', productReview);
        this.name = null;
        this.review = null;
        this.rating = null;
        this.recommendation = null;
      } else {
        if (!this.name) this.errors.push('Name required.');
        if (!this.review) this.errors.push('Review required.');
        if (!this.rating) this.errors.push('Rating required.');
        if (!this.recommendation) this.errors.push('Recommendation required.');
      }
    },
  },
});

const app = new Vue({
  el: '#app',
  data: {
    premium: true,
    cart: [],
  },
  methods: {
    updateCart(id) {
      // this.cart += 1
      this.cart.push(id);
    },
    removeItem(id) {
      console.log(id, this.cart);
      this.cart = this.cart.filter((item) => item !== id);
      console.log(id, this.cart);
      return this.cart;
    },
  },
});
