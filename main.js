// const product = 'Socks';
console.log('Hello JS!')

const app = new Vue({
    el: '#app',
    data: {
        product: 'Socks',
        description: 'Warm and fuzzy.',
        image: './assets/vmSocks-green.png',
        alt: 'a pair of green socks',
        sockHref: 'https://www.sockdreams.com/',
        inStock: true,
        inventory: 12,
        showMe: false,
        onSale: true,
        details: ["80% cotton", "20% polyester", "Gender-neutral"],
        variants: [
            {
                variantId: 2234,
                variantColor: 'green',
                variantImage: './assets/vmSocks-green.png'
            },
            {
                variantId: 2235,
                variantColor: 'blue',
                variantImage: './assets/vmSocks-blue.png'
            }
        ],
        sizes: ["XXS", "XS", "S", "M", "L", "XL", "XXL"],
        cart: 0,
    },
    methods: {
        addToCart() {
            this.cart += 1
        },
        updateProduct(variantImage) {
            this.image = variantImage
        },
        removeFromCart() {
            this.cart -= 1
        },
        soldOut() {
            inStock = false
        }
    }
});
