//get products from json database
async function getProducts(){
    const fetchProducts = await fetch('./products.json')
    const products = await fetchProducts.json()

    console.log(products);
}
getProducts()