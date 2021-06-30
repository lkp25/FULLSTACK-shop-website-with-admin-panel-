const selectImgModal = document.querySelector('.select-image-modal-overlay')
const imagesListElement = document.querySelector('.images-list')
const imagePreview = document.querySelector('.selected-img-preview img')
const imageNameLabel = document.querySelector('.selected-img-name')
const confirmButton = document.querySelector('.select-image-modal-confirm-btn')

hideImageChooseModal()

//global variable to store most recently clicked input field - one to be changed
let currentImgInputField = ''

//:: click events ::
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
    const currentImgFileName = e.target.value
    currentImgInputField = e.target
    showImageChooseModal(currentImgFileName)    
    getImageFilesList()
  }

  //CLOSE MODAL - overlay clicked
  if(e.target.classList.contains('select-image-modal-overlay')){
    
    selectImgModal.classList.add('fade-away-modal')
    setTimeout(() => {
      hideImageChooseModal()
    }, 1000);
  }
  //CONFIRM BUTTON
  if(e.target.classList.contains('select-image-modal-confirm-btn')){
    if(e.target.dataset.filename){
      currentImgInputField.value = e.target.dataset.filename
    }
    e.target.textContent = 'Confirmed!'
    e.target.classList.add('success-glow')
    selectImgModal.classList.add('fade-away-modal')
    setTimeout(() => {
      e.target.textContent = 'Confirm'
      e.target.classList.remove('success-glow')
      
      
      hideImageChooseModal()
    }, 1000);
  }
  //SELECT FILE FROM LIST
  if(e.target.classList.contains('select-image-list-item')){
    const fileName = e.target.dataset.filename;
    confirmButton.dataset.filename = fileName
    imagePreview.setAttribute('src', `./img/img-large/${fileName}`)
    imageNameLabel.textContent = fileName
  }

})


function showImageChooseModal(currentImgName){
  selectImgModal.style.display = null
  selectImgModal.style.top = window.scrollY + 'px'
  selectImgModal.classList.remove('fade-away-modal')
  
  imagePreview.setAttribute('src', `./img/img-large/${currentImgName}`)
  imageNameLabel.textContent = currentImgName
  document.body.style.overflow = 'hidden'
}

function hideImageChooseModal(){
  
  selectImgModal.style.display = 'none'
  document.body.style.overflow = 'visible'
}



async function getImageFilesList(){
    const request = await fetch('http://localhost:5000/list-of-image-files')
    const imagesOnServerList = await request.json()
    
    // remove all old images
    Array.from(imagesListElement.children).forEach(child => child.remove() )
     
    //populate list with data from server
    imagesOnServerList.forEach(item => {
      const listElement = document.createElement('li')
      listElement.classList.add('select-image-list-item')
      listElement.textContent = item
      listElement.dataset.filename = item

      imagesListElement.appendChild(listElement)
    })

}
