
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
getItemData()
function getItemData(){
    const itemData = JSON.parse(sessionStorage.getItem('products-list'))
    
    const currentProductFullData = itemData.find(item => item.id === sessionStorage.getItem('current-product-id'))
    console.log(currentProductFullData);

    document.querySelector('.indprod-name').textContent = currentProductFullData.name
    document.querySelector('.indprod-category').textContent = currentProductFullData.category
    document.querySelector('.indprod-price').textContent =currencyFormatter.format(currentProductFullData.priceInCents / 100)  
    document.querySelector('.indprod-description').textContent = currentProductFullData.description
    document.querySelector('.indprod-image-preview img').setAttribute('src', `../img/img-large/${currentProductFullData.image}`)
}