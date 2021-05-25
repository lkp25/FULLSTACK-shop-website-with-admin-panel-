const placeOrderBtn = document.querySelector('.place-order-btn')
const orderModal = document.querySelector('.order-modal')
const orderTable = document.querySelector('#order-table')
const orderForm = document.querySelector('.order-form')


//order button in cart - opens order modal
placeOrderBtn.onclick = openOrderModal




function openOrderModal() {
    const orderData = JSON.parse(sessionStorage.getItem('cart')) 
    
    if(orderData.length <= 0){
        const alertNoItems = document.createElement('div')
        alertNoItems.textContent = 'no items in cart!'
        alertNoItems.classList.add('alert-no-items')
        placeOrderBtn.insertAdjacentElement("beforebegin", alertNoItems)
        
        setTimeout(() => {
            alertNoItems.remove()
        }, 2000);
        return
    }
    //modal takes entire screen
    orderModal.style.display = 'flex'
    orderModal.style.height = `${document.body.scrollHeight}px`
    populateModalWithOrderData()
}

function populateModalWithOrderData(){
    const orderData = JSON.parse(sessionStorage.getItem('cart')) 
    
    
    orderData.forEach(element => {
        const singleItemTemplate = document.querySelector('#order-table-single-item-template').content.cloneNode(true)
        
        const row = singleItemTemplate.children[0]
        row.children[0].textContent = element.name
        row.children[1].textContent = element.price
        row.children[2].textContent = element.quantity
        
        orderTable.appendChild(singleItemTemplate)
    });

    orderTable.nextElementSibling.children[0].textContent = document.querySelector('.cart-total').textContent
}

function closeOrderModal() {
    orderModal.style.display = 'none'

    // depopulate order table
    Array.from(orderTable.children)
        .filter((i, index) => index > 1)
        .forEach(item => item.remove())
}


//order modal event listener
orderModal.addEventListener('click', (e)=>{
    
    //close modal if clicked on the edge
    if(e.target.classList.contains('order-modal')){
        closeOrderModal()
    }

    //order now logic
    if(e.target.classList.contains('order-now-btn')){
        
        sendToserver()
    }
})

function sendToserver(){
    
    const orderDetails = getFormData()
    //check if form input is valid - if not display error
    if(!orderDetails){
        console.log('intvalid input');
        return
    }
    //send to server if valid
    console.log(orderDetails);
}

function getFormData(){
    
    let formValid = true

    const inputFields = orderForm.querySelectorAll('input')
    inputFields.forEach(field => {
        //if any field input is invalid, make user aware
        if(!field.value){
            formValid = false
            field.style.outline = '2px solid red'
            setTimeout(() => {
                field.style.outline = 'none'
                
            }, 1500);
        }
    })

    let completeOrderDetails
     
    //only collect input data if all is valid
    if(formValid){
        completeOrderDetails = {
            name: orderForm.querySelector('.order-form-name').value,
            surname: orderForm.querySelector('.order-form-surname').value,
            email: orderForm.querySelector('.order-form-email').value,
            city: orderForm.querySelector('.order-form-city').value,
            street: orderForm.querySelector('.order-form-street').value,
            houseNumber: orderForm.querySelector('.order-form-house-number').value,
            postalCode: orderForm.querySelector('.order-form-postal-code').value,
            
            total: JSON.parse(sessionStorage.getItem('totalToPay')),
            orderedItems: JSON.parse(sessionStorage.getItem('cart')),
        }
    }
    return completeOrderDetails
}