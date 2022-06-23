

describe('GET /characters', () => {

    const characters = [// array com a massa de teste
        {
            name: 'Peter Parker',
            alias: 'Spider-man',
            team: ['New Avengers'],
            active: true
        },
        {
            name: 'Steve Rogers',
            alias: 'Captain America',
            team: ['Avengers'],
            active: true
        },
        {
            name: 'Tony Stark',
            alias: 'Iron Man',
            team: ['Avengers', 'Illuminatis'],
            active: true
        },
        {
            name: 'Logan',
            alias: 'Wolverine',
            team: ['X-men'],
            active: true
        },
        {
            name: 'Stephen Strange',
            alias: 'Dr. Stranger',
            team: ['Avengers', 'Illuminatis'],
            active: true
        }
    ]

    before(() => {
        cy.back2ThePast()
        cy.setToken()
        cy.populateCharacters(characters)//comando criado para popular a massa de teste
    });

    it('Deve retornar uma lista de personagens', () => {
        cy.getCharacters().then(function (response) {
            expect(response.status).to.eql(200)//verifica o status code
            expect(response.body).to.be.a('array')//esse codigo verifica se a resposta no body é um array (lista)
            expect(response.body.length).to.greaterThan(0)// consegue qnt 'maior que'de itens no array ou qnt de caracteres numa string
        })
    })

    it('Deve buscar personagem por nome', () => {// query string - aula 328814
        cy.searchCharacters('Peter')
            .then(function (response) {
                expect(response.status).to.eql(200)//verifica o status code
                expect(response.body.length).to.eql(1)// verifica se retornou um unico elemento
                expect(response.body[0].alias).to.eql('Spider-man')
                expect(response.body[0].team).to.eql(['New Avengers'])
                expect(response.body[0].active).to.eql(true)

            })
    })
})

describe('GET /characters/id', () => {

    before(() => {
        cy.back2ThePast()
        cy.setToken()

    });


    const Dead = {
        name: 'Wade Wilson',
        alias: 'Deadpool',
        team: ['X-force'],
        active: true
    }



    context('Quando tenho um personagem cadastrado', () => {//contexto para preparar o cenario!
        before(() => {
            // todo
            cy.postCharacter(Dead)
                .then(function (response) {
                    Cypress.env('characterId', response.body.character_id)
                })
        })

        it('Deve buscar o personagem pelo ID', () => {
            const id = Cypress.env('characterId')
            cy.getCharactersById(id)
                .then(function (response) {
                    expect(response.status).to.eql(200)
                    expect(response.body.alias).to.eql('Deadpool')//Como ele traz um unico objeto, nao preicso passar a posicao! (ex: [0])
                    expect(response.body.team).to.eql(['X-force'])
                    expect(response.body.name).to.eql('Wade Wilson')
                })
        });


    });

    context('Quando não tenho um personagem cadastrado', () => {

        it('Deve retornar 404 ao buscar por id não cadastrado', () => {
            const id = '62b4752d43fd34a6f90d7c5c' //id ficticio gerado em https://nddapp.com/object-id-generator.html
            cy.getCharactersById(id)
                .then(function (response) {
                    expect(response.status).to.eql(404)
                })
        });
        
    });
});