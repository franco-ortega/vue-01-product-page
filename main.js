// const product = 'Socks';
console.log('Hello JS!')

const app = new Vue({
    el: '#app',
    data: {
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
        details: ["80% cotton", "20% polyester", "Gender-neutral"],
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
                variantQuantity: 0
            }
        ],
        sizes: ["XXS", "XS", "S", "M", "L", "XL", "XXL"],
        cart: 0,
    },
    methods: {
        addToCart() {
            this.cart += 1
        },
        updateProduct(index) {
            // this.image = variantImage
            this.selectedVariant = index
        },
        removeFromCart() {
            this.cart -= 1
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
        }
    }
});
