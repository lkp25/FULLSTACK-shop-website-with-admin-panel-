const buyBtn = document.querySelector('.indprod-buynow-btn')
const itemCard = document.querySelector('.indprod-container')

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
        buyBtn.textContent = 'Already in Cart!'.toUpperCase()
        buyBtn.classList.add('already-in-cart')
        
        setTimeout(() => {
            buyBtn.classList.remove('already-in-cart')
            buyBtn.textContent = "BUY NOW"
            
        }, 3000);
        return
    }
    performAddToCartAnimation()
}

 function performAddToCartAnimation(){
   const clone = itemCard.cloneNode(true)
   
   let root = document.documentElement;
   root.style.setProperty(
       '--top', -1 * 16 - itemCard.getBoundingClientRect().bottom + document.body.scrollTop - 300 + "px"
       );
       root.style.setProperty(
           '--left', cartIcon.getBoundingClientRect().left - itemCard.getBoundingClientRect().left + 300 +"px"
           );
           clone.classList.add('to-cart-animation')
           itemCard.appendChild(clone)
           
   setTimeout(() => {
       clone.remove()
   }, 1500);
}