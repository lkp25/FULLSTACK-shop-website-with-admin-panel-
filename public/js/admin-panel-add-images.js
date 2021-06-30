const imgInput = document.querySelector('.img-filedrop-input')
const dropZoneElement = imgInput.closest('.img-filedrop-section')
const uploadButton = dropZoneElement.querySelector('.img-filedrop-add-btn')
const clearAllButton = dropZoneElement.querySelector('.img-filedrop-clear-all')



dropZoneElement.addEventListener('click', e=>{
    //block the event from occuring when buttons inside dropzone are clicked    
    if(e.target.localName === 'button'){
        return
    }
    imgInput.disabled = false
    imgInput.click()
})

//whenever Fileinput value changes (if file was chosen by click):
imgInput.addEventListener('change', e=>{
    if(imgInput.files.length){
        updateThumbnail(dropZoneElement.children[0], imgInput.files)
        
    }
})

//EVENT LISTENERS FOR DRAG AND DROP:
dropZoneElement.addEventListener('dragover', e =>{
    e.preventDefault()
    // solid border on dragover
    dropZoneElement.classList.add('img-filedrop-container-over')
})

const otherEventsArray = ['dragleave', 'dragend']
otherEventsArray.forEach(eventType => {
    dropZoneElement.addEventListener(eventType, e=>{
        // remove solid border on dragend
        dropZoneElement.classList.remove('img-filedrop-container-over')
        
    })
})

dropZoneElement.addEventListener('drop', e=>{
    // console.log(e.dataTransfer.files);
    //dont open the file in browser on drop!
    e.preventDefault()
    if(e.dataTransfer.files.length > 0){
        //assign files to the fileinput element
        imgInput.files = e.dataTransfer.files
        
        //show thumbnail img for the first file from list in preview 
        updateThumbnail(dropZoneElement.children[0], imgInput.files)
    }
    dropZoneElement.classList.remove('img-filedrop-container-over')
})

/**
 * 
 * @param {HTMLElement} dropZoneElement 
 * @param {File} file 
 */

function updateThumbnail(dropZoneElement, files){    
    
    const filesArray = [...files]
    //check if any of uploaded files is not an image
    const notAnImageFile = filesArray.find(file => (!file.type.startsWith('image/')))

    //if one or more files is NOT an image, remove all files and inform user
    if(notAnImageFile){
        //dont let files to be uploaded:
        hideUploadAndClearButtons()

        //remove all previous image thumbnails from view:
        dropZoneElement.querySelectorAll('.img-filedrop-thumbnail').forEach(element => element.remove())

        //remove all files from fileInputElement
        imgInput.value = null

        const  wrongFileMessage = document.createElement('div')
        wrongFileMessage.textContent = "one or more files uploaded is not an image. File list was cleared. Please add only image files!"
        wrongFileMessage.style.color = 'red'
        
        dropZoneElement.appendChild(wrongFileMessage)
        setTimeout(() => {
            wrongFileMessage.remove()
        }, 4500);
        return
    }

    //if all files are images:
    filesArray.forEach((file, index)=>{
              
        
        const  thumbnailElement = document.createElement('div')
        thumbnailElement.classList.add('img-filedrop-thumbnail')
        dropZoneElement.appendChild(thumbnailElement)
        
    
        thumbnailElement.dataset.label = file.name
    
        //show thumbnail for images:
        
            const reader = new FileReader
            reader.readAsDataURL(file)
            reader.onload =()=>{
                thumbnailElement.style.backgroundImage = `url('${reader.result}')`
            }
        
    })
    //all files are images so can be uploaded:
    showUploadAndClearButtons()
}



//upload button related functions:
function showUploadAndClearButtons(){
    uploadButton.style.display = 'block'
    clearAllButton.style.display = 'block'
}
function hideUploadAndClearButtons(){
    uploadButton.style.display = 'none'
    clearAllButton.style.display = 'none'
}

//BUTTONS CLICK EVENT LISTENER:
dropZoneElement.addEventListener('click', e=>{
    //CLEAR
    if(e.target.classList.contains('img-filedrop-clear-all')){
     
        //hide buttons and remove all thumbnails 
        hideUploadAndClearButtons()
        dropZoneElement.querySelectorAll('.img-filedrop-thumbnail').forEach(element => element.remove())
        //remove all files from fileInputElement
        imgInput.value = null
    }
    //UPLOAD
    if(e.target.classList.contains('img-filedrop-add-btn')){
       const formData = new FormData()
       
    //    console.log(imgInput.files);
       for(const file of imgInput.files){
           formData.append('myFiles',file)
       }
       for(const [key, value] of formData){
           console.log(`key: ${key}`);
           console.log(`value: ${value}`);
       }
       fetch('http://localhost:5000/upload-images', {
           method: 'post',
           body: formData
       }).catch(console.error)
    }
})


//SELECTING IMG FIELD in the form - limited choice of images
