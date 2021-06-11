const productTemplate = document.querySelector('#product-template')
const productsGrid = document.querySelector('.products-grid')


class Categories{
    constructor(completeProductsList){
        this.categoriesRibbon = document.getElementById('products-categories-ribbon')
        this.allProducts = completeProductsList

        //get a list of all unique product categories
        this.allCategories = [...new Set(completeProductsList.map(prod => {
            return prod.category
        }))]
        //add 'universal category' to the list
        this.addAllCategoriesBtn()
    }
    addAllCategoriesBtn(){
        this.allCategories.unshift('All Categories')
        console.log(this.allCategories);
    }
    renderAllCategoriesToView(){
        this.allCategories.forEach(category => {
            const link = document.createElement('li')
            link.textContent = category
            this.categoriesRibbon.appendChild(link)
        })
    }
}

//get products from json database
async function getProducts(){
    const fetchProducts = await fetch('http://localhost:5000/display-products')
    const products = await fetchProducts.json()

    console.log(products);
    
    renderProducts(products)

    //instantiate class for categories rendering
    const uniqueCategories = new Categories(products)
    uniqueCategories.renderAllCategoriesToView()
    console.log(uniqueCategories);
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
