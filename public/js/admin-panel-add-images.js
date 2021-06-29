const imgInput = document.querySelector('.img-filedrop-input')
const dropZoneElement = imgInput.closest('.img-filedrop-section')
const uploadButton = dropZoneElement.querySelector('.img-filedrop-add-btn')

dropZoneElement.addEventListener('click', e=>{
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
    //will be empty first when page loads.
    showUploadButton()
}

function showUploadButton(){
    uploadButton.style.display = 'block'
}
function hideUploadButton(){
    uploadButton.style.display = 'none'
}