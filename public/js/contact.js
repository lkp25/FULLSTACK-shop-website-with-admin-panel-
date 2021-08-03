const txtArea = document.getElementById('customer-message-textarea')
const contactForm = document.getElementById('customer-message-form')
const rem = document.querySelector('.customer-message-chars-left span')



const MAX_CHARS = 250

txtArea.addEventListener('input', function(e){
    const currentText = txtArea.value
  const currentTxtLength = txtArea.value.length
  const remaining = MAX_CHARS - currentTxtLength
  
  if(currentTxtLength >= MAX_CHARS){
     const finalText = currentText.substring(0, 249)
     txtArea.value = finalText
     rem.textContent = 0
     return
      
  }
  rem.textContent = remaining

  const color = remaining < MAX_CHARS * 0.1 ? 'rgb(160, 12, 12)' : null  //if not less than 10% of max, fallback to default
  
    rem.style.color = color
    
})
document.body.style.overflowX = 'hidden'

contactForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const customerQuestionField = contactForm.querySelector('textarea')
    const customerEmailField = contactForm.querySelector('.contact-page-input')
    let potentiallyDangerousInput = false
    
    console.log(customerQuestionField.value.replace(/\n/g, "xxxxx"));
    ;[customerEmailField, customerQuestionField].forEach(field => {
      if(sanitizeUserInput(field.value)) {
            
        field.placeholder = "INVALID INPUT!"        
        field.value = ""
        field.style.backgroundColor = 'red'
        potentiallyDangerousInput = true
        setTimeout(() => {
            field.style.backgroundColor = null
            
        }, 2000);
    }  
    })
    //DONT SEND MALLICIOUS INPUT!
    if(potentiallyDangerousInput){
      return
    }

    const newQuestion = {id:(Math.random()*10000000000000000).toString(),text:customerQuestionField.value.replace(/\n/g, "xxxxx"),email:customerEmailField.value,date:new Date().toUTCString()}
    sendCustomerQuestionToServer(newQuestion)
    customerEmailField.value = null
    customerQuestionField.value = null
    
})

async function sendCustomerQuestionToServer(newQuestion){
    try {
      const sendQuestionData = await fetch('http://localhost:5000/new-customer-question', {
                method: 'POST', 
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(newQuestion),
              })
            const responseFromServer = await sendQuestionData.json()
            .then(()=>{
              displayConfirmation()
            })
            console.log(responseFromServer);
      
    } catch (error) {
      console.log(error);
    }

}
function displayConfirmation(){
  const conf = document.createElement('div')
  conf.textContent = "question sent successfully!"
  const form = document.querySelector('.box')
  conf.classList.add('confirmation-message')
  formClone = form.cloneNode(true)
  form.classList.add('disappear')
  setTimeout(() => {
    form.remove()
  }, 500);
  form.parentElement.appendChild(conf)
  
  setTimeout(() => {
    conf.parentElement.appendChild(formClone)
    conf.remove()
  }, 4000);
}


//form card animation
const container = document.querySelector('.container')
const box = document.querySelector('.box')

container.addEventListener('mousemove', (e) => {
    let xAxis = (window.innerWidth / 2 - e.pageX) / 20
    
    let yAxis = (window.innerHeight / 2 - e.pageY) / 20
    
    box.style.transform = `rotateX(${yAxis}deg) rotateY(${xAxis}deg)`
})