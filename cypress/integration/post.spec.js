//Javascript é orientado a function

describe('POST /characters', () => {

    // BEFORE IMPLEMENTADO NO ARQUIVO ./SUPPORT/INDEX.JS
    // before(()=>{
    //    // cy.back2ThePast() //Descomentar para executar via navegador!
    //     cy.setToken()
    // })

    // Cadastrar um usuario
    it('Deve cadastrar um personagem', () => {

        const character = {
            name: 'Loki',
            alias: 'God of Mischief',
            team: ['Villains'],
            active: true
        }

        cy.postCharacter(character).then((response) => {
            expect(response.status).to.eql(201)//Espero que a resposta do status code seja 201
            cy.log(response.body.character_id)
            expect(response.body.character_id.length).to.eql(24)
        })
    })


    context('Quando o personagem já existe', () => { // Usei um contexto para usar um gancho

        // Massa de teste
        const character = {
            name: "Steve Rogers",
            alias: "Captain America",
            team: ["Avengers"],
            active: true
        }

        // vai garantir que o persnagem ja exista
        before(() => {//callback-obtencao do retorno, objeto response recebe
            cy.postCharacter(character).then((response) => {
                expect(response.status).to.eql(201)//Espero que a resposta do status code seja 201
            })
        })


        it('Não deve cadastrar duplicado', () => {//callback-obtencao do retorno, objeto response recebe
            cy.postCharacter(character).then((response) => {
                expect(response.status).to.eql(400)//Espero que a resposta do status code
                expect(response.body.error).to.eql("Duplicate character")
            })
        })
    })
})

