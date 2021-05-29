const prodList = document.getElementById('current-products')
const singleItemTemplate = document.getElementById('single-product-table-entry')


let originalAllProducts = []
let allProducts = []


//get products from json database
async function getProducts(){
    const fetchProducts = await fetch('http://localhost:5000/display-products')
    const products = await fetchProducts.json()

    console.log(products);
    allProducts = products
    //copy for reversing unwanted changes
    originalAllProducts = products
   renderProducts()
   
}
getProducts()


function renderProducts(){
    

    allProducts.forEach(product =>{
        const newItem = singleItemTemplate.content.cloneNode(true)
        
        newItem.querySelector('.name').children[0].value = product.name
        newItem.querySelector('.name').children[0].dataset.id = product.id
        newItem.querySelector('.price').children[0].value =  product.priceInCents
        newItem.querySelector('.category').children[0].value = product.category
        newItem.querySelector('.img').children[0].value = product.image
        newItem.querySelector('.description').children[0].value = product.description

        newItem.querySelector('.delete-product-btn').dataset.id = product.id
        
        newItem.querySelector('.row').dataset.id = product.id


        prodList.appendChild(newItem)
    })
}





document.addEventListener('click', (e)=>{
    //save changes
    if(e.target.classList.contains('save-changes-btn')){
        
        //get changed data from all inputs
        allProducts = getCurrentInputData()
        //remove old view
        removeAllProductsFromView()
        //render new view
        renderProducts()
    }
    //delete single product
    if(e.target.classList.contains('delete-product-btn')){
        
        const indexToRemove = allProducts.findIndex(item => item.id === e.target.dataset.id)
        allProducts.splice(indexToRemove, 1)
        console.log(allProducts);
        removeSingleProductFromView(e.target.dataset.id)        
    }
})


function getCurrentInputData(){
    const allrow = document.querySelectorAll('.row')

    const refreshedProductsArray = []
    allrow.forEach(row =>{
       const name = row.children[0].children[0].value
       const id = row.children[0].children[0].dataset.id
       const description = row.children[1].children[0].value
       const price = parseInt(row.children[2].children[0].value)
       const category = row.children[3].children[0].value
       const img = row.children[4].children[0].value
       
       const updatedItem = {
           id: id,
           name: name,
           priceInCents: price,
           image: img,
           description: description,
           category: category
       }
       refreshedProductsArray.push(updatedItem)
    })
    console.log(refreshedProductsArray);
    return refreshedProductsArray
}

function removeSingleProductFromView(deleteId){
    const toRemove = Array.from(prodList.children).find((child => child.dataset.id === deleteId))
    toRemove.remove()
}
function removeAllProductsFromView(){
    Array.from(prodList.children).forEach((child => {
        if(child.classList.contains('row')){
            child.remove()
        }}))
    
}

function disableChanges(){
    const allInputs = document.querySelectorAll('input')
    allInputs.forEach(field => field.disabled = true)
}
function enableChanges(){
    const allInputs = document.querySelectorAll('input')
    allInputs.forEach(field => field.disabled = false)
}