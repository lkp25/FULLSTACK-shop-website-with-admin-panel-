const placeOrderBtn = document.querySelector('.place-order-btn')
const orderNowBtn = document.querySelector('.order-now-btn')

const orderModal = document.querySelector('.order-modal')
const orderModalMainSection = document.querySelector('.order-modal-main-section')
const orderTable = document.querySelector('#order-table')
const orderForm = document.querySelector('.order-form')



//name all form fields:
const formName = orderForm.querySelector('.order-form-name')
const formSurname = orderForm.querySelector('.order-form-surname')
const formEmail = orderForm.querySelector('.order-form-email')
const formEmailConf = orderForm.querySelector('.order-form-email-conf')
const formCity = orderForm.querySelector('.order-form-city')
const formStreet = orderForm.querySelector('.order-form-street')
const formHouseNumber = orderForm.querySelector('.order-form-house-number')
const formPostalCode = orderForm.querySelector('.order-form-postal-code')


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
    orderModal.style.height = `${document.body.clientHeight + 300}px`
    populateModalWithOrderData()
}

function populateModalWithOrderData(){
    const orderData = JSON.parse(sessionStorage.getItem('cart')) 
    
    
    orderData.forEach(element => {
        const singleItemTemplate = document.querySelector('#order-table-single-item-template').content.cloneNode(true)
        
        const row = singleItemTemplate.children[0]
        row.children[0].textContent = element.name
        row.children[1].textContent = 'x '+ element.quantity
        row.children[1].style.textAlign = "center"
        row.children[1].style.color = "green"
        row.children[2].textContent = currencyFormatter.format(element.price * element.quantity / 100)  
        
        orderTable.appendChild(singleItemTemplate)
    });

    orderTable.nextElementSibling.children[0].textContent = document.querySelector('.cart-total').textContent
}

function closeOrderModal() {
    orderModalMainSection.classList.add('fade-out')
    setTimeout(() => {        
        orderModal.style.display = 'none'
        orderModalMainSection.classList.remove('fade-out')
    }, 1000);

    // depopulate order table
    Array.from(orderTable.children)
        .filter((i, index) => index > 1)
        .forEach(item => item.remove())
}


//order modal event listener
orderModal.addEventListener('click', (e)=>{
    
    //close modal if clicked on the edge or resign button
    if(
        e.target.classList.contains('order-modal')
        || e.target.classList.contains('order-modal-resign-btn')
    ){
        closeOrderModal()
    }

    //order now button logic: demand confirmation
    if(e.target.classList.contains('order-now-btn')){
        e.preventDefault()
        checkFormValidity()
        
    }
    //confirmation-denied
    if(e.target.classList.contains('order-deny')){
        hideConfirmationWindow()
    }
    //user-confirmation-granted
    if(e.target.classList.contains('order-confirm')){
        sendToserver()
        window.scrollTo(0,0)
        showMessageOrderPlacedSuccessfully()

        setTimeout(() => {            
            closeOrderModal()
        }, 3000);
    }
})


function demandCustomerConfirmation(e){
    
    const confirmWindow = document.createElement('div')
    confirmWindow.innerHTML = 
    `
    By clicking confirm button below you state that all the information is correct and you will be transfered to payment page.
    <div class="order-confirm-btns-grid">
    <button class="order-confirm">Confirm</button>
    <button class="order-deny">Deny</button>
    </div>
    `
    confirmWindow.classList.add('demand-confirmation-window')
    
    orderModalMainSection.appendChild(confirmWindow)
    
    orderModal.style.height = `${document.body.clientHeight + 200}px`
    orderNowBtn.style.display = 'none'
}


function hideConfirmationWindow(){
    orderNowBtn.style.display = null
    document.querySelector('.demand-confirmation-window').remove()

}


async function sendToserver(){
    
    const orderDetails = getFormData()
    //check if form input is valid - if not display error
    
    if(!orderDetails){
        console.log('intvalid input');
        return
    }
    //send to server if valid
    const csrfToken = document.querySelector('[name=_csrf]').value
    const sendData = await fetch('http://localhost:5000/save-order', {
        method: 'POST', 
        headers: {
            'X-CSRF-Token': csrfToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderDetails),
      })
    const responseFromServer = await sendData.json()
    console.log(responseFromServer);
}


function checkFormValidity(){
    const inputFields = Array.from(orderForm.querySelectorAll('input'))
    inputFields.forEach(field => {
        //if any field input is invalid, make user aware
        if(!field.value){
            formValid = false
            field.style.outline = '2px solid red'
            setTimeout(() => {
                field.style.outline = 'none'
                
            }, 1500);
            
        }
        //email confirm fail
        
        if(formEmail.value !== formEmailConf.value){
            console.log(formEmail.value);
            console.log(formEmailConf.value);

            formValid = false 
            formEmailConf.value = ''
            formEmailConf.placeholder = 'E-mail does not match!'      
               
        }
    })
    //is there an invalid field?
    const notAllValid = inputFields.find(field => !field.value)

    //is there potentially mallicious content in the input?
    let potentiallyDangerousInput = false
      
    inputFields.forEach(field => {
        if(sanitizeUserInput(field.value)) {
            
            field.placeholder = "INVALID INPUT!"
            
            field.value = ""
            field.style.backgroundColor = 'red'
            potentiallyDangerousInput = true
            setTimeout(() => {
                field.style.backgroundColor = null
                
            }, 2000);
        }  
    })
    console.log(potentiallyDangerousInput);


    //no invalid fields and no suspicious input - demand final confirmation
    if(!notAllValid && !potentiallyDangerousInput) {

        demandCustomerConfirmation()            
    }
    
}






function getFormData(){
    
    let formValid = true    

    let completeOrderDetails
     
    //only collect input data if all is valid
    if(formValid){
        completeOrderDetails = {
            sent: false,
            name: formName.value,
            surname: formSurname.value,
            email: formEmail.value,
            city: formCity.value,
            street: formStreet.value,
            houseNumber: formHouseNumber.value,
            postalCode: formPostalCode.value,
            
            totalToPay: JSON.parse(sessionStorage.getItem('totalToPay')),
            orderedItems: JSON.parse(sessionStorage.getItem('cart')),
            orderDate: new Date().toUTCString(),
            orderId: Math.floor(new Date().getFullYear() * new Date().getDate() * Math.random() * 1000000)
        }
    }
    return completeOrderDetails
}


function showMessageOrderPlacedSuccessfully(){
    orderModalMainSection.classList.add('positive-validation')
    
    Array.from(orderModalMainSection.children).forEach(child => {
        child.classList.add('fade-out')
        
        setTimeout(() => {            
            orderModalMainSection.classList.remove('positive-validation')
            child.classList.remove('fade-out')
        }, 4000);
    })

    const message = document.createElement('div')
    message.classList.add('order-successful-message')    
    message.textContent = "Your order was placed successfully, check your e-mail for confirmation!"
    orderModalMainSection.appendChild(message)
    setTimeout(() => {
        message.remove()
        closeOrderModal()
    }, 3000);
    
}

function sendConfirmationEmail(email){

}




