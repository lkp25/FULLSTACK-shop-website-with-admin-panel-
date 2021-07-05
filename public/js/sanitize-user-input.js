function sanitizeUserInput(inputString){

    const pattern = /h/
    return pattern.test(inputString)
}
