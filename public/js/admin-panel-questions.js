const questionsList = document.getElementById('customer-questions-list')

let allQuestions = []

getAllQuestionsFromDB()

async function getAllQuestionsFromDB(){
    const n = await fetch('http://localhost:5000/get-all-questions')
    const nww = await n.json()
    allQuestions = nww

    renderAllQuestions()
}

function renderAllQuestions(){
    
}
