let allOrders = []

async function getProducts(){

    const fetchProducts = await fetch('http://localhost:5000/getorders')
    const orders = await fetchProducts.json()

    console.log(orders);
    allOrders = orders
    allOrders.forEach(element => {
        element.orderData = JSON.parse(element.orderData)
        
    });
   
}
getProducts()