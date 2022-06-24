describe('DELETE /characters/id', () => {

    const godThunder = {
        name: 'Thor',
        alias: 'God of Thunder',
        team: ['Avenger'],
        active: true
    }

    context('Quando tenho um personagem cadastrado', () => {//contexto para preparar o cenario!
        before(() => {
            cy.postCharacter(godThunder)
                .then(function (response) {
                    Cypress.env('characterId', response.body.character_id)
                })
        })

        it('Deve remover o personagem pelo ID', () => {
            const id = Cypress.env('characterId')
            cy.deleteCharactersById(id)
                .then(function (response) {
                    expect(response.status).to.eql(204)
                })
        });

        after(function () {
            const id = Cypress.env('characterId')
            cy.getCharactersById(id)
                .then(function (response) {
                    expect(response.status).to.eql(404)
                })
        })

    });

    context('Quando não tenho um personagem cadastrado', () => {

        it('Deve retornar 404 ao remover por id não cadastrado', () => {
            const id = '62b4752d43fd34a6f90d7c5c'
            cy.deleteCharactersById(id)
                .then(function (response) {
                    expect(response.status).to.eql(404)
                })
        });

    });
});