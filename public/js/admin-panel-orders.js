let allOrders = []
const singleOrderTemplate = document.getElementById('db-order-template')
const allOrdersList = document.getElementById('db-all-orders')
const root = document.documentElement


async function getProducts(){

    const fetchProducts = await fetch('http://localhost:5000/getorders')
    const orders = await fetchProducts.json()

    console.log(orders);
    allOrders = orders
    
    //immidiately parse strigified object from db:
    allOrders.forEach(element => {
        element.orderData = JSON.parse(element.orderData)
        
    });
   
}
getProducts()


function renderAllOrders(sort = 'date'){
    allOrders.forEach(item => {
        const template = singleOrderTemplate.content.cloneNode(true)
        console.log(template);
        template.querySelector('.db-order-surname').textContent = item.orderData.surname
        allOrdersList.appendChild(template)
    })
    
}
renderAllOrders()


//sent-checkbox
// const checkbox = document.querySelector('.checkbox')
document.addEventListener('click', (e)=>{
    if(e.target.classList.contains('checkbox')){
        const checkbox = e.target
        if(checkbox.dataset.sent === 'false'){
            checkbox.dataset.sent = 'true'
            checkbox.classList.add('vis')
        }
        else{
            checkbox.dataset.sent = 'false'
            checkbox.classList.remove('vis')
        }
    }
    
    
   
})