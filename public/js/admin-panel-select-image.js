const selectImgModal = document.querySelector('.select-image-modal-overlay')
const imagesListElement = document.querySelector('.images-list')
hideImageChooseModal()

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
  //CLOSE MODAL - overlay clicked
  if(e.target.classList.contains('select-image-modal-overlay')){
    hideImageChooseModal()
  }
  //CONFIRM BUTTON
  if(e.target.classList.contains('select-image-modal-confirm-btn')){
    hideImageChooseModal()
  }
})


function showImageChooseModal(){
  selectImgModal.style.display = null
    
}
function hideImageChooseModal(){
  selectImgModal.style.display = 'none'
}

async function getImageFilesList(){
    const request = await fetch('http://localhost:5000/list-of-image-files')
    const imagesList = await request.json()
    
    // remove all old images
    Array.from(imagesListElement.children).forEach(child => child.remove() )
     
    imagesList.forEach(item => {
      const listElement = document.createElement('li')
      listElement.textContent = item
      listElement.dataset.filename = item

      imagesListElement.appendChild(listElement)
    })

}

// template.querySelector('img').setAttribute('src', `./img/img-large/${product.image}`)