

describe('GET /characters', () => {

    const characters = [// array com a massa de teste
        {
            name: 'Peter Parker',
            alias: 'Spiderman',
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
})