const questionsList = document.getElementById('db-all-questions')

let allQuestions = []

getAllQuestionsFromDB()

async function getAllQuestionsFromDB(){
    try {
        const n = await fetch('http://localhost:5000/get-all-questions')
    const nww = await n.json()
    allQuestions = nww
    console.log(allQuestions);

    //line for data USING MY-SQL:
    // allQuestions.forEach(question =>  question.value = JSON.parse(question.value))
    //line for data using MONGO DB:
    allQuestions.forEach(question =>  question.value = question)
    console.log(allQuestions);

    renderAllQuestions(allQuestions)
    } catch (error) {
        console.log(error);
    }
    
    
}

function renderAllQuestions(allQuestions){
    //newest at the top
    allQuestions.reverse()

    allQuestions.forEach((question, index) =>{
       const template = document.getElementById('db-questions-template').content.cloneNode(true)
       
       const info = question.value
       template.children[0].dataset.id = question.id
       template.children[0].dataset.index = index
    //    template.dataset.allData = question
       
    template.querySelector('.db-question-content').textContent = info.text.replaceAll('xxxxx', "\n") 
    template.querySelector('.db-question-date').textContent = info.date 
    template.querySelector('.db-question-email').textContent = info.email 
    template.querySelector('.db-question-email').dataset.email = info.email
    template.querySelector('.db-question-email').parentElement.setAttribute('href', ``) 

    template.querySelector('.db-question-remove').dataset.index = index 
    template.querySelector('.db-question-remove').dataset.id = question.id
       questionsList.appendChild(template)
    })
}

function clearAllQuestions(){
    questionsList.querySelectorAll('.db-single-question').forEach(element => element.remove())
}

async function removeSingleMessage(target){
    const targetDBId = target.dataset.id
    console.log(targetDBId);
    
    //remove from db
    
    try {
        const sendData = await fetch(`http://localhost:5000/delete-question?id=${parseInt(targetDBId)}`, {
             
        })
            
        //remove from view
        target.remove()

    } catch (error) {
        console.log(error);
    }
}

questionsList.addEventListener('click', e =>{
    if(e.target.classList.contains('db-question-remove')){
        const thisMessageRow = e.target.closest('.db-single-question')
        removeSingleMessage(thisMessageRow)
    }
    if(e.target.classList.contains('db-question-email')){
        const originalEmail = e.target.closest('.db-single-question').querySelector('textarea').value
        openEmailEditor(e.target.dataset.email, originalEmail)
    }
    
    
})
//cancel reply to email
document.addEventListener('click', e=>{
    if(e.target.classList.contains('question-reply-cancel-btn')){
        e.preventDefault()
        e.target.closest('.question-reply-container').remove()
    }
})
// document.addEventListener('submit', e=>{
//     if(e.target.classList.contains('reply-to-customer')){
//         e.preventDefault()
//         const replyDetails = {

//         }

//         const sendData = await fetch('http://localhost:5000/reply-to-customer-email', {
//         method: 'POST', 
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(replyDetails),
//       })
//     const responseFromServer = await sendData.json()
//     }
// })


function openEmailEditor(emailAddress, originalEmail){
    console.log(emailAddress)
    console.log(originalEmail)
    const emailText = document.createElement('div')
    emailText.innerHTML = `
    <div class="question-reply-towho-msg">Replying to: ${emailAddress}</div>
        <form class="reply-to-customer" action="/reply-to-customer-email" method="post">
        <div class="question-reply-original-msg">original message:<br>${originalEmail}</div>
        <div class="question-reply-admin-msg"><textarea name="reply"></textarea></div>
        <input style="display:none;" name="original" value="${originalEmail}">
        <input style="display:none;" name="email" value="${emailAddress}">
        <div class="question-reply-btns">
        <button class="question-reply-cancel-btn">Cancel</button>
            <input type="submit" value="send reply">
            </div>
            </form>
    `
    emailText.classList.add('question-reply-container')
    document.body.appendChild(emailText)
    
}
