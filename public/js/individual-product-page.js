const buyBtn = document.querySelector('.indprod-buynow-btn')

populateTemplateWithData()

function getItemData(){
    const itemData = JSON.parse(sessionStorage.getItem('products-list'))
    
    const currentProductFullData = itemData.find(item => item.id === sessionStorage.getItem('current-product-id'))
    return currentProductFullData

    
}
function populateTemplateWithData(){
    const currentProductFullData = getItemData()
    document.querySelector('.indprod-name').textContent = currentProductFullData.name
    document.querySelector('.indprod-category').textContent = currentProductFullData.category
    document.querySelector('.indprod-price').textContent =currencyFormatter.format(currentProductFullData.priceInCents / 100)  
    document.querySelector('.indprod-description').textContent = currentProductFullData.description
    document.querySelector('.indprod-image-preview img').setAttribute('src', `../img/img-large/${currentProductFullData.image}`)
}

document.addEventListener('click' , e=>{
    if(e.target === buyBtn){
        checkIfItemIsInCart()
    }
})
function checkIfItemIsInCart(){
    const alreadyThere = itemsInCart.find(item=> item.id = getItemData().id)
    if(alreadyThere){
        
    }
}