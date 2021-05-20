const cartIcon = document.querySelector('.cart-icon')
const cartContent = document.querySelector('.cart-content')

let itemsInCart = []
//add to cart buttons logic
productsGrid.addEventListener('click', (e)=>{
    if(e.target.classList.contains('product-add-to-cart-btn')){
     const product = e.target.closest('.product-card')
    
     
        
        const isAlreadyOrdered = itemsInCart.find(item => item.id === product.dataset.id)
            // item.quantity++
        if(isAlreadyOrdered){
            isAlreadyOrdered.quantity++
        }else{
            const newOrder = {
                id: product.dataset.id,
                image: product.dataset.image,
                price: product.dataset.priceInCents,
                name: product.dataset.name,
                quantity: 1
            }    
            
            itemsInCart.push(newOrder)
        }
            
       

     
     
    }
 })

cartIcon.addEventListener('click', ()=>{
    cartContent.classList.toggle('show-cart')
    
})