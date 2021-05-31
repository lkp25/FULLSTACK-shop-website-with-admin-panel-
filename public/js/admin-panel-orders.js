let allOrders = []
const singleOrderTemplate = document.getElementById('db-order-template')
const allOrdersList = document.getElementById('db-all-orders')
const root = document.documentElement

async function updateOrderStatusInDB(itemData){
    const sendData = await fetch('http://localhost:5000/update-order-status', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(itemData) 
      
        
      })
    const responseFromServer = await sendData.json()
    console.log(responseFromServer);
}

async function getProducts(){

    const fetchProducts = await fetch('http://localhost:5000/getorders')
    const orders = await fetchProducts.json()

    console.log(orders);
    allOrders = orders
    
    //immidiately parse strigified object from db:
    allOrders.forEach(element => {
        element.orderData = JSON.parse(element.orderData)
        
    });
    renderAllOrders()
}
getProducts()


function renderAllOrders(sort = 'date'){
    allOrders.forEach((item,index) => {
        const template = singleOrderTemplate.content.cloneNode(true)
        const checkbox = template.querySelector('.checkbox')
        checkbox.dataset.itemIndex = index
        
        //order already shipped
        if(item.orderData.sent === true){
            checkbox.classList.add('vis')
        }
               
        template.querySelector('.db-order-surname').textContent = item.orderData.surname
        template.querySelector('.db-order-value').textContent = item.orderData.totalToPay
        template.querySelector('.db-order-date').textContent = item.orderData.orderDate
        template.querySelector('.db-order-more-info-btn').dataset.orderDetails = item
        allOrdersList.appendChild(template)
    })
    
}
renderAllOrders()


//sent-checkbox
// const checkbox = document.querySelector('.checkbox')
document.addEventListener('click', (e)=>{
    if(e.target.classList.contains('checkbox')){
        const checkbox = e.target
        const index = checkbox.dataset.itemIndex

        console.log(allOrders[index]);
        if(checkbox.dataset.sent === 'false'){
            checkbox.dataset.sent = 'true'
            checkbox.classList.add('vis')
            allOrders[index].orderData.sent = true
        }
        else{
            checkbox.dataset.sent = 'false'
            checkbox.classList.remove('vis')
            allOrders[index].orderData.sent = false
        }
        //update the db!
        updateOrderStatusInDB(allOrders[index])
    }
    
    
   
})