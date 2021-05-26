const productTemplate = document.querySelector('#product-template')
const productsGrid = document.querySelector('.products-grid')

//currency formatter
const currencyFormatter = new Intl.NumberFormat(undefined, {style: "currency", currency: "USD"})

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
        
        //give the id to card product
        template.querySelector('.product-card').dataset.id = `${product.id}`
        template.querySelector('.product-card').dataset.name = `${product.name}`
        template.querySelector('.product-card').dataset.priceInCents = `${product.priceInCents}`
        template.querySelector('.product-card').dataset.image = `${product.image}`
        
        //fill all data
        template.querySelector('img').setAttribute('src', `./img/img-large/${product.image}`)
        template.querySelector('img').setAttribute('alt', `${product.name}`)
        template.querySelector('.product-name').innerText = `${product.name}`
        template.querySelector('.product-category').innerText = `${product.category}`
        template.querySelector('.product-description').innerText = `${product.description}`
        template.querySelector('.product-price').innerText =  currencyFormatter.format(product.priceInCents / 100)
        
        

        //add product to all products
        productsGrid.appendChild(template)

    });
}
