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
        inventory: 100,
        showMe: false,
        onSale: true,
        details: ["80% cotton", "20% polyester", "Gender-neutral"]
    }
});
