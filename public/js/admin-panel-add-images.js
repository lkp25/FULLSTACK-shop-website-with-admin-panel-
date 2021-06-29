const imgInput = document.querySelector('.img-filedrop-input')
const dropZoneElement = imgInput.closest('.img-filedrop-section')


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
        updateThumbnail(dropZoneElement, imgInput.files[0])
    }
    dropZoneElement.classList.remove('img-filedrop-container-over')
})

function updateThumbnail(dropZoneElement, file){
    console.log(dropZoneElement);
    console.log(file);

    //will be empty first when page loads.
    let thumbnailElement = dropZoneElement.querySelector('.img-filedrop-thumbnail')

    if(!thumbnailElement){
        thumbnailElement = document.createElement('div')
        thumbnailElement.classList.add('img-filedrop-thumbnail')
        
    }
}