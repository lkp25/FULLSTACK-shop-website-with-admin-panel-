const productTemplate = document.querySelector('#product-template')
const productsGrid = document.querySelector('.products-grid')



//get products from json database
async function getProducts(){
    const fetchProducts = await fetch('./products.json')
    const products = await fetchProducts.json()

    console.log(products);

    renderProducts(products)
   
}
getProducts()



function renderProducts(products){
    products.forEach(product => {
        // get template
        const template = productTemplate.content.cloneNode(true)
        console.log(template);
        template.querySelector('img').setAttribute('src', `./img/img-large/${product.image}`)
        template.querySelector('img').setAttribute('alt', `${product.name}`)
        template.querySelector('.product-name').innerText = `${product.name}`
        template.querySelector('.product-category').innerText = `${product.category}`
        template.querySelector('.product-description').innerText = `${product.description}`
        template.querySelector('.product-price').innerText = `${product.priceInCents}`
        
        
        productsGrid.appendChild(template)

    });
}
