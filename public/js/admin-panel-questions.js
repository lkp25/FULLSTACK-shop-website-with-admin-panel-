const questionsList = document.getElementById('db-all-questions')

let allQuestions = []

getAllQuestionsFromDB()

async function getAllQuestionsFromDB(){
    const n = await fetch('http://localhost:5000/get-all-questions')
    const nww = await n.json()
    allQuestions = nww

    renderAllQuestions(allQuestions)
}

function renderAllQuestions(allQuestions){
    allQuestions.forEach(question =>{
       const template = document.getElementById('db-questions-template').content.cloneNode(true)
       
       template.querySelector('.db-question-important').textContent = question.important? "YES" : "NO"
       questionsList.appendChild(template)
    })
}
