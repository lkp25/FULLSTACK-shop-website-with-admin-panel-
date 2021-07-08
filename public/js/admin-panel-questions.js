const questionsList = document.getElementById('db-all-questions')

let allQuestions = []

getAllQuestionsFromDB()

async function getAllQuestionsFromDB(){
    try {
        const n = await fetch('http://localhost:5000/get-all-questions')
    const nww = await n.json()
    allQuestions = nww
    console.log(allQuestions);
    allQuestions.forEach(question =>  question.value = JSON.parse(question.value))
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
    template.querySelector('.db-question-email').parentElement.setAttribute('href', `mailto:${info.email}`) 

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
})