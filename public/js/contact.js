const txtArea = document.getElementById('customer-message-textarea')
const contactForm = document.getElementById('customer-message-form')
const rem = document.querySelector('.customer-message-chars-left span')



const MAX_CHARS = 250

txtArea.addEventListener('input', function(e){
    const currentText = txtArea.value
  const currentTxtLength = txtArea.value.length
  const remaining = MAX_CHARS - currentTxtLength
  
  console.log(e);
  if(currentTxtLength >= MAX_CHARS){
     const finalText = currentText.substring(0, 249)
     txtArea.value = finalText
     rem.textContent = 0
     return
      
  }
  rem.textContent = remaining

  const color = remaining < MAX_CHARS * 0.1 ? 'red' : null  //if not less than 10% of max, fallback to default
  
    rem.parentElement.style.color = color
    
})

contactForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    console.log('subb');
})