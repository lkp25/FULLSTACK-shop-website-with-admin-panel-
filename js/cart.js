const cartIcon = document.querySelector('.cart-icon')


let itemsInCart = []
//add to cart buttons logic
document.addEventListener('click', (e)=>{
    if(e.target.classList.contains('product-add-to-cart-btn')){
     const product = e.target.closest('.product-card')
    
     
        //check if item is already in the cart
        const isAlreadyOrdered = itemsInCart.find(item => item.id === product.dataset.id)
            
        if(isAlreadyOrdered){
            isAlreadyOrdered.quantity++

        //if it is new, create new entry in itemsInCart
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
       //save shopping cart in session storage 
       sessionStorage.setItem("cart", JSON.stringify(itemsInCart))  
       
       
    }
 })

//cart icon is clicked - open/close cart
cartIcon.addEventListener('click', ()=>{
    const cartContent = document.querySelector('.cart-content')
    console.log(cartContent);
    cartContent.classList.toggle('show-cart')
    
    //render items if cart is open
    if(cartContent.classList.contains('show-cart')){
        const productsToRender = JSON.parse(sessionStorage.getItem("cart")) 
        console.log(productsToRender);
    }
})