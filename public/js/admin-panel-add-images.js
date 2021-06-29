const imgInput = document.querySelector('.img-filedrop-input')
const dropZoneElement = imgInput.closest('.img-filedrop-section')

dropZoneElement.addEventListener('click', e=>{
    imgInput.disabled = false
    imgInput.click()
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
        updateThumbnail(dropZoneElement.children[0], imgInput.files[0])
    }
    dropZoneElement.classList.remove('img-filedrop-container-over')
})

/**
 * 
 * @param {HTMLElement} dropZoneElement 
 * @param {File} file 
 */

function updateThumbnail(dropZoneElement, file){
    // console.log(dropZoneElement);
    // console.log(file);

    //will be empty first when page loads.
    let thumbnailElement = dropZoneElement.querySelector('.img-filedrop-thumbnail')

    if(!thumbnailElement){
        thumbnailElement = document.createElement('div')
        thumbnailElement.classList.add('img-filedrop-thumbnail')
        dropZoneElement.appendChild(thumbnailElement)
    }

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
}