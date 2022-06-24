

describe('GET /characters', () => {

    const characters = [
        {
            name: 'Peter Parker',
            alias: 'Spider-man',
            team: ['New Avengers'],
            active: true
        },
        {
            name: 'Charles Xavier',
            alias: 'Professor X',
            team: ['X-men'],
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
        cy.populateCharacters(characters)
    });

    it('Deve retornar uma lista de personagens', () => {
        cy.getCharacters().then(function (response) {
            expect(response.status).to.eql(200)
            expect(response.body).to.be.a('array')
            expect(response.body.length).to.greaterThan(0)
        })
    })

    it('Deve buscar personagem por nome', () => {
        cy.searchCharacters('Peter')
            .then(function (response) {
                expect(response.status).to.eql(200)
                expect(response.body.length).to.eql(1)
                expect(response.body[0].alias).to.eql('Spider-man')
                expect(response.body[0].team).to.eql(['New Avengers'])
                expect(response.body[0].active).to.eql(true)

            })
    })
})

describe('GET /characters/id', () => {

    const Dead = {
        name: 'Wade Wilson',
        alias: 'Deadpool',
        team: ['X-force'],
        active: true
    }

    context('Quando tenho um personagem cadastrado', () => {
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
                    expect(response.body.alias).to.eql('Deadpool')
                    expect(response.body.team).to.eql(['X-force'])
                    expect(response.body.name).to.eql('Wade Wilson')
                })
        });


    });

    context('Quando não tenho um personagem cadastrado', () => {

        it('Deve retornar 404 ao buscar por id não cadastrado', () => {
            const id = '62b4752d43fd34a6f90d7c5c' 
            cy.getCharactersById(id)
                .then(function (response) {
                    expect(response.status).to.eql(404)
                })
        });

    });
});