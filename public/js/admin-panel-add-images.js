const imgInput = document.querySelector('.img-filedrop-input')
const dropZoneElement = imgInput.closest('.img-filedrop-section')

dropZoneElement.addEventListener('click', e=>{
    imgInput.disabled = false
    imgInput.click()
})

//whenever Fileinput value changes (if file was chosen by click):
imgInput.addEventListener('change', e=>{
    if(imgInput.files.length){
        updateThumbnail(dropZoneElement.children[0], imgInput.files[0])
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
    // console.log(dropZoneElement);
    console.log(files);
    [...files].forEach(file=>{
        // let thumbnailElement = dropZoneElement.querySelector('.img-filedrop-thumbnail')

        
        const  thumbnailElement = document.createElement('div')
        thumbnailElement.classList.add('img-filedrop-thumbnail')
        dropZoneElement.appendChild(thumbnailElement)
        
    
        thumbnailElement.dataset.label = file.name
    
        //show thumbnail for images:
        if(file.type.startsWith('image/')){
            const reader = new FileReader
            reader.readAsDataURL(file)
            reader.onload =()=>{
                thumbnailElement.style.backgroundImage = `url('${reader.result}')`
            }
        }else { //for no image files
            thumbnailElement.style.backgroundImage = null
    
        }
    })
    //will be empty first when page loads.
    
}