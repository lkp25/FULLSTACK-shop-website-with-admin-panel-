const cartIcon = document.querySelector('.cart-icon')
const cartContent = document.querySelector('.cart-content')
const numberOfItemsInCart = document.querySelector('.cart-counter')


const closeCartButton = document.createElement('div')
closeCartButton.classList.add('close-cart-btn')
closeCartButton.textContent = "X"
cartContent.appendChild(closeCartButton)

window.addEventListener('scroll', (e)=>{
    cartContent.style.top = window.scrollY + 80 + 'px'
    
    
})
//get items from session storage. if empty, return empty array
let itemsInCart = JSON.parse(sessionStorage.getItem("cart")) || []

//show number of items in cart on the cart icon
function showNumberOfItemsInCart(){
    if(itemsInCart.length <= 0){
      return  numberOfItemsInCart.style.display = 'none'
    }
    numberOfItemsInCart.style.display = 'block'
    numberOfItemsInCart.textContent = itemsInCart.length
}
showNumberOfItemsInCart()

//saving to SS
function saveCartInSessionStorage(){
    sessionStorage.setItem("cart", JSON.stringify(itemsInCart))  

}
function calculateTotalAmount(){
    const totalToPay = itemsInCart.reduce((total, item)=> {
      total += item.price * item.quantity
      
       return total
    }, 0)

    cartContent.children[0].children[0].innerText = currencyFormatter.format(totalToPay / 100) 
    //save to ss
    sessionStorage.setItem("totalToPay", JSON.stringify(totalToPay))
}


//add to cart buttons logic
document.addEventListener('click', (e)=>{
    

    if(e.target.classList.contains('product-add-to-cart-btn')){
        const product = e.target.closest('.product-card')
        
        //ANIMATION LOGIC:
        const productGhost = product.cloneNode(true)
        let root = document.documentElement;
        root.style.setProperty(
            '--top', -1 * 16 - product.getBoundingClientRect().bottom + document.body.scrollTop + "px"
            );
        root.style.setProperty(
            '--left', cartIcon.getBoundingClientRect().left - product.getBoundingClientRect().left + "px"
            );
        console.log(cartIcon.getBoundingClientRect().top,'  ' , product.getBoundingClientRect().top);

        productGhost.style.top = `${product.offsetTop}px`
        productGhost.style.left = `${product.offsetLeft}px`
        productGhost.classList.add('to-cart-animation')    

        product.parentElement.appendChild(productGhost)
        setTimeout(() => {
            productGhost.remove()
            cartIcon.classList.add('cart-icon-shake')
            setTimeout(() => {
                cartIcon.classList.remove('cart-icon-shake')
                
            }, 1150);
        }, 900);
        //end of animation logic

        //hide the cart if opened:
        cartContent.classList.remove('show-cart')

        //check if item is already in the cart
        const isAlreadyOrdered = itemsInCart.find(item => item.id === product.dataset.id)
            
        if(isAlreadyOrdered){
            //add one more to this item quantity if it is already in cart
            isAlreadyOrdered.quantity++
            console.log('ALREDY IN CART');
        //if it is new, create new entry in itemsInCart
        }else{
            console.log('NOT YET ORDERED');
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
       saveCartInSessionStorage()
       
       showNumberOfItemsInCart()
       
    }
 })




//cart icon is clicked - open/close cart
cartIcon.addEventListener('click', ()=>{
    
    //load place-order.js script dynamically:
    loadPlaceOrderScript()
    
    const cartContent = document.querySelector('.cart-content')
    console.log(cartContent);
    
    document.querySelector('nav').classList.add('hide-links')
    
    calculateTotalAmount()

    //animation for cart-hide:
    if(cartContent.getBoundingClientRect().width > 0){

        performCartSwingAnimation()  
        return
    }

    cartContent.classList.add('show-cart')
    
    //render items if cart is OPEN
    if(cartContent.classList.contains('show-cart')){
        
        //CLEAR OLD VIEW of the cart
        document.querySelectorAll('.product-in-cart').forEach(p => p.remove())
        
        //get data from ss
        const productsToRender = JSON.parse(sessionStorage.getItem("cart")) 

        //clear cart button
        const clearCartBtn =  document.querySelector('.clear-cart-btn')

        clearCartBtn.style.display = 'none'
        if(productsToRender?.length > 0){
            clearCartBtn.style.display = 'block'

        }
        
        
        console.log(productsToRender);
        productsToRender?.forEach(product => {
            //take template
            const productTemplate = document.querySelector('#item-in-cart-template').content.cloneNode(true)
            
            //populate template with data
            productTemplate.querySelector('img').setAttribute('src', `../img/img-large/${product.image}`)
            productTemplate.querySelector('img').setAttribute('alt', `${product.name}`)
            productTemplate.querySelector('.product-in-cart-name').innerText = `${product.name}`
            productTemplate.querySelector('.quantity').innerText = `${product.quantity}`
            
            productTemplate.querySelector('.product-in-cart-price').innerText = currencyFormatter.format(product.quantity * product.price / 100) 
            productTemplate.querySelector('.sub-one-btn').dataset.id = `${product.id}`
            productTemplate.querySelector('.add-one-btn').dataset.id = `${product.id}`
            productTemplate.querySelector('.remove-from-cart').dataset.id = `${product.id}`
            

            //add to view
            cartContent.appendChild(productTemplate) 
        });
    }
})




//===================================================================
//listen for add / subtract quantity and remove item buttons
cartContent.addEventListener('click', (e)=>{
    //subtract one
    if (e.target.classList.contains('sub-one-btn')) {
        itemsInCart.find((item, index) =>{
            
            if(item.id === e.target.dataset.id){
                item.quantity --
                if(item.quantity <= 1){
                    item.quantity = 1
                }
                //render quantity in view
                e.target.nextElementSibling.innerText = item.quantity

                //update subtotal
                e.target.parentElement.parentElement
                .nextElementSibling.innerText =  currencyFormatter.format(item.quantity * item.price / 100) 
            }
        })
    }
    //add one
    if (e.target.classList.contains('add-one-btn')) {
        itemsInCart.find((item, index) =>{
            
            if(item.id === e.target.dataset.id){
                item.quantity ++
                //render quantity in view
                e.target.previousElementSibling.innerText = item.quantity
                //update subtotal
                e.target.parentElement.parentElement
                .nextElementSibling.innerText = currencyFormatter.format(item.quantity * item.price / 100) 
            }
        })
    }

    //delete item completely
    if (e.target.classList.contains('remove-from-cart')) {
        itemsInCart.find((item, index) =>{
            
            if(item.id === e.target.dataset.id){
                return itemsInCart.splice(index, 1)
            }
        })
        //remove form view in cart
        e.target.closest('.product-in-cart').remove()
        //update session storage
    }
    //CLEAR ALL ITEMS FROM CART
    if (e.target.classList.contains('clear-cart-btn')) {
        document.querySelectorAll('.product-in-cart').forEach(e => e.remove())
        itemsInCart = []
        e.target.style.display = 'none'
    }
    //close cart button - with animation
    if (e.target.classList.contains('close-cart-btn')) {
       performCartSwingAnimation()

    }
    
    
    saveCartInSessionStorage()
    calculateTotalAmount()
    showNumberOfItemsInCart()
})

function performCartSwingAnimation(){
    cartContent.classList.add('hide-cart')
    setTimeout(() => {
        cartContent.classList.remove('hide-cart')
        
    }, 500);
    cartContent.classList.remove('show-cart')
}

function loadPlaceOrderScript(){
    const presentScripts = Array.from(document.scripts) 

    const newScriptSrc = 'http://localhost:5000/js/place-order.js'
    
    const alreadyAdded = presentScripts.find(script => {
        return script.outerHTML.includes(newScriptSrc)
    });
    
    if(alreadyAdded){
        console.log('ALREADY THERE');
        return
    }
    
    const placeOrderScript = document.createElement('script')
    placeOrderScript.src = newScriptSrc
    placeOrderScript.defer = true
    document.head.append(placeOrderScript)
}