function sanitizeUserInput(inputString){

    const pattern = /[\<\>\{\}]/
    return pattern.test(inputString)
}
