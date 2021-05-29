const prodList = document.getElementById('current-products')
const singleItemTemplate = document.getElementById('single-product-table-entry')


let allProducts = []
//get products from json database
async function getProducts(){
    const fetchProducts = await fetch('http://localhost:5000/display-products')
    const products = await fetchProducts.json()

    console.log(products);
    allProducts = products
   renderProducts()
   
}
getProducts()


function renderProducts(){

    allProducts.forEach(product =>{
        const newItem = singleItemTemplate.content.cloneNode(true)
        
        newItem.querySelector('.name').children[0].value = product.name
        newItem.querySelector('.price').children[0].value =  product.priceInCents
        newItem.querySelector('.category').children[0].value = product.category
        newItem.querySelector('.img').children[0].value = product.image


        prodList.appendChild(newItem)
    })
}

function disableChanges(){
    const allInputs = document.querySelectorAll('input')
    allInputs.forEach(field => field.disabled = true)
}
function enableChanges(){
    const allInputs = document.querySelectorAll('input')
    allInputs.forEach(field => field.disabled = true)
}