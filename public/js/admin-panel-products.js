const prodList = document.getElementById('current-products')
const addNewProductTable = document.getElementById('add-new-product-table')
const singleItemTemplate = document.getElementById('single-product-table-entry')


let originalAllProducts = []
let allProducts = []


//get products from json database
async function getProducts(){
    const fetchProducts = await fetch('http://localhost:5000/display-products')
    const products = await fetchProducts.json()

    console.log(products);
    allProducts = products
    //copy for reversing unwanted changes
    originalAllProducts = [...allProducts]

   renderProducts()

   //disable all fields by default
   disableChanges()
   
}
getProducts()


function renderProducts(){
    

    allProducts.forEach(product =>{
        const newItem = singleItemTemplate.content.cloneNode(true)
        
        newItem.querySelector('.name').children[0].value = product.name
        newItem.querySelector('.name').children[0].dataset.id = product.id
        newItem.querySelector('.price').children[0].value =  product.priceInCents
        newItem.querySelector('.category').children[0].value = product.category
        newItem.querySelector('.img').children[0].value = product.image
        newItem.querySelector('.description').children[0].value = product.description

        newItem.querySelector('.delete-product-btn').dataset.id = product.id
        
        newItem.querySelector('.row').dataset.id = product.id


        prodList.appendChild(newItem)
    })
}





document.addEventListener('click', (e)=>{
    //unable/disable any changes
    if(e.target.classList.contains('enable-disable-changes-btn')){
        
        if(e.target.classList.contains('disabled')){
            e.target.classList.remove('disabled')
            e.target.textContent = "DISABLE CHANGES"
            enableChanges()
        }else{
            e.target.classList.add('disabled')
            e.target.textContent = "ENABLE CHANGES"
            disableChanges()
        }

    }

    //save changes >> display confirmation box
    if(e.target.classList.contains('save-changes-btn')){
        
        displayConfirmationWindow()
        
    }
    //save changes confirmed
    if(e.target.classList.contains('confirmation-window-accept')){
        document.body.style.overflow = 'visible'
        e.target.parentElement.parentElement.remove()
        //get changed data from all inputs
        allProducts = getCurrentInputData()
        console.log(allProducts);
        //SEND TO DATABASE!
        sendUpdatedProductListToDB(allProducts)
        

        //remove old view
        removeAllProductsFromView()
        //render new view
        renderProducts()

    }
    // saving changes denied
    if(e.target.classList.contains('confirmation-window-deny')){
        document.body.style.overflow = 'visible'
        e.target.parentElement.parentElement.remove()
    }
    //delete single product
    if(e.target.classList.contains('delete-product-btn')){
        
        const indexToRemove = allProducts.findIndex(item => item.id === e.target.dataset.id)
        allProducts.splice(indexToRemove, 1)
        console.log(allProducts);
        removeSingleProductFromView(e.target.dataset.id)        
    }
    //reverse all changes
    if(e.target.classList.contains('reverse-all-btn')){
        allProducts = [...originalAllProducts]
        //remove old view
        removeAllProductsFromView()
        //render new view
        renderProducts()
    }
    if(e.target.classList.contains('add-item-btn')){
        addNewItem()
        //remove old view
        removeAllProductsFromView()
        //render new view
        renderProducts()
    }
})


function getCurrentInputData(){
    const allrow = document.querySelectorAll('.row')

    const refreshedProductsArray = []
    allrow.forEach(row =>{
       const name = row.children[0].children[0].value
       const id = row.children[0].children[0].dataset.id
       const description = row.children[1].children[0].value
       const price = parseInt(row.children[2].children[0].value)
       const category = row.children[3].children[0].value
       const img = row.children[4].children[0].value
       
       const updatedItem = {
           id: id,
           name: name,
           priceInCents: price,
           image: img,
           description: description,
           category: category
       }
       refreshedProductsArray.push(updatedItem)
    })
    console.log(refreshedProductsArray);
    return refreshedProductsArray
}

function removeSingleProductFromView(deleteId){
    const toRemove = Array.from(prodList.children).find((child => child.dataset.id === deleteId))
    toRemove.remove()
}
function removeAllProductsFromView(){
    Array.from(prodList.children).forEach((child => {
        if(child.classList.contains('row')){
            child.remove()
        }}))
    
}

function disableChanges(){
    const allButtons = Array.from(document.querySelectorAll('button:not(.logout-btn)'))
    allButtons.forEach(field => field.disabled = true)
    
    const allInputs = document.querySelectorAll('input')
    allInputs.forEach(field => field.disabled = true)
    const masterBtn = allButtons.find(field =>field.classList.contains('enable-disable-changes-btn'))
    masterBtn.disabled = false
}
function enableChanges(){
    const allButtons = Array.from(document.querySelectorAll('button'))
    allButtons.forEach(field => field.disabled = false)

    const allInputs = document.querySelectorAll('input')
    allInputs.forEach(field => field.disabled = false)
}

function displayConfirmationWindow(){
    
    const confirmationWindow = document.getElementById('confirmation-window').content.cloneNode(true)
    //disable scrolling
    document.body.style.overflow = 'hidden'
    const saveChangesBtn = document.querySelector('.save-changes-btn')
    
    confirmationWindow.children[0].style.top = window.scrollY + 'px'
    
    saveChangesBtn.parentElement.appendChild(confirmationWindow)
    //animation
    // confirmationWindow.classList.remove('fade-away-modal')

}

function addNewItem(){
    const allInputs = Array.from(addNewProductTable.querySelectorAll('input'))     

    const emptyField = allInputs.find(field => field.value === "")

    //all filled - add new product
    if(!emptyField){
        const name = addNewProductTable.querySelector('.add-item-name').children[0].value
        const price = addNewProductTable.querySelector('.add-item-price').children[0].value
        const description = addNewProductTable.querySelector('.add-item-description').children[0].value
        const category = addNewProductTable.querySelector('.add-item-category').children[0].value
        const img = addNewProductTable.querySelector('.add-item-img').children[0].value
    
        const newProduct = {
        id: Math.floor(new Date().getFullYear() * new Date().getDate() * Math.random() * 100000),
        name: name,
        priceInCents: price,
        image: img,
        description: description,
        category: category
        }

        allProducts.push(newProduct)
        allInputs.forEach(field => field.value ='')
        allInputs.forEach(field => field.placeholder ="")

        //display success message
        newProductAddedMessage()
        return
    }

    //not all filled - show empty fields to the user with red border
    allInputs.forEach(field => {
        if(!field.value){
            field.placeholder ="REQUIRED!"
            field.style.border = "1px solid crimson"
            setTimeout(() => {
                field.style.border = "NONE"
            }, 2000);
        }
    })
}

function newProductAddedMessage(){
    const message = document.createElement('div')
    message.textContent = "Product saved in memory. Click 'SAVE CHANGES' to send it to server."
    message.classList.add('product-successfully-added')
    addNewProductTable.appendChild(message)
    setTimeout(() => {
        message.remove()
    }, 4000);
}

async function sendUpdatedProductListToDB(allProducts){
    try {
        const sendData = await fetch('http://localhost:5000/update-products-in-offer', {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(allProducts) 
          
            
          })
              
    } catch (error) {
        console.log(error);
    }
}


//dropdown buttons for sections - minimize/show add product and add image sections:
document.addEventListener('click', e=>{
    if(e.target.classList.contains('dropdown-btn')){
        
        showOrHideTheSection(e.target)
    }
    
})

function showOrHideTheSection(clickedButton){
    const currentSection = clickedButton.parentElement.nextElementSibling
    if(currentSection.style.display !== 'block'){
        currentSection.style.display = 'block'
        clickedButton.textContent = '-'
        return
    }
    currentSection.style.display = null
    clickedButton.textContent = '+'

}

