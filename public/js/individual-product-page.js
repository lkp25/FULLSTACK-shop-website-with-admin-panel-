
document.addEventListener('click', (e)=>{
    if(e.target.classList.contains('product-card')){
        const prodId = e.target.dataset.id
        
        openNewProductPage(prodId)
    }
    
})

async function openNewProductPage(prodId){
    const response = await fetch(`http://localhost:5000/display-products/:${prodId}`)
    console.log(response);
    
    window.location.href = response.url
    sessionStorage.setItem('current-product-id', prodId)
}

function getItemData(){
    const itemData = JSON.parse(sessionStorage.getItem('products-list'))
    
    const currentProductFullData = itemData.find(item => item.id === sessionStorage.getItem('current-product-id'))
    console.log(currentProductFullData);
}