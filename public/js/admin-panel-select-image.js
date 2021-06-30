

document.addEventListener('click', e=>{
    if(
    e.target.parentElement.classList.contains('add-item-img')
    ||
    e.target.parentElement.classList.contains('img')        
  ){
    //don't allow change on disabled fields
    if(e.target.disabled){
        return
    }
    showImageChooseModal()
    getImageFilesList()

  }
})
function showImageChooseModal(){
    const modalContainer = document.createElement('div')
    modalContainer.classList.add('select-image-modal-container')
    document.body.appendChild(modalContainer)
}

async function getImageFilesList(){
    const request = await fetch('http://localhost:5000/list-of-image-files')
    const imagesList = await request.json()
    console.log(imagesList);
}

// template.querySelector('img').setAttribute('src', `./img/img-large/${product.image}`)