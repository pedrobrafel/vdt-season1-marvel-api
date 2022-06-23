// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


// Comandos customizados
//Deixa o código mais organizado
Cypress.Commands.add('setToken', () => {
    // Gerar o token no before
    cy.api({//cy.api é do plugin @bahmutov na index.js
        method: 'POST',
        url: '/sessions',
        body: {
            email: "pb.felix@hotmail.com",
            password: "qacademy@123"
        }
    }).then((response) => {
        expect(response.status).to.eql(200)
        //Criei um variavel de ambiente/environment no cypress
        //nome token, recebe a response.body.token
        Cypress.env('token', response.body.token)
    })

})

Cypress.Commands.add('back2ThePast', () => {
    //Limpar a base antes da exeução
    cy.api({
        method: 'DELETE',
        url: '/back2thepast/6297cfeb6791aa00161c9737'
    }).then((response) => {
        expect(response.status).to.eql(200)
    })

})

// Post requisição que testa o cadastro de personagens
Cypress.Commands.add('postCharacter', (payload) => {//paylod, caraga de solicitação. Corpo da mensagem
    cy.api({
        method: 'POST',
        url: '/characters',
        body: payload,
        headers: {
            Authorization: Cypress.env('token')//a variavel de env que criamos no before
        },
        failOnStatusCode: false
    }).then((response) => {
        return response
    })
})



// GET requisição que testa a obtecao de personagens
Cypress.Commands.add('getCharacters', (payload) => {//paylod, caraga de solicitação. Corpo da mensagem
    cy.api({
        method: 'GET',
        url: '/characters',
        headers: {
            Authorization: Cypress.env('token')//a variavel de env que criamos no before
        },
        failOnStatusCode: false
    }).then((response) => {
        return response
    })
})



Cypress.Commands.add('populateCharacters', function (characters) {
    characters.forEach(function (c) {// ira percorer pela massa de personagens criados
        cy.postCharacter(c)
    })
})