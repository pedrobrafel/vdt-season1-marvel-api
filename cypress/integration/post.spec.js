describe('POST /characters', () => {

    it('Deve cadastrar um personagem', () => {

        const character = {
            name: 'Loki',
            alias: 'God of Mischief',
            team: ['Villains'],
            active: true
        }

        cy.postCharacter(character).then((response) => {
            expect(response.status).to.eql(201)
            cy.log(response.body.character_id)
            expect(response.body.character_id.length).to.eql(24)
        })
    })

    it('Não deve cadastrar personagem sem nome', () => {
        const character = {
            name: "",
            alias: "Super Zero",
            team: ["Lonely"],
            active: true
        }

        cy.postCharacter(character).then((response) => {
            expect(response.status).to.eql(400)
            expect(response.body.validation.body.message).to.eql("\"name\" is not allowed to be empty")
        })
    });

    it('Não deve cadastrar personagem sem identidade secreta', () => {
        const character = {
            name: "Zé Ro Derriro",
            alias: "",
            team: ["Lonely"],
            active: true
        }

        cy.postCharacter(character).then((response) => {
            expect(response.status).to.eql(400)
            expect(response.body.validation.body.message).to.eql("\"alias\" is not allowed to be empty")
        })
        
    });

    it('Não deve cadastrar personagem sem time', () => {
        const character = {
            name: "Zé Ro Derriro",
            alias: "Super Zero",
            team: [""],
            active: true
        }

        cy.postCharacter(character).then((response) => {
            expect(response.status).to.eql(400)
            expect(response.body.validation.body.message).to.eql("\"team[0]\" is not allowed to be empty")
        })
        
    });

    it('Não deve cadastrar personagem sem status', () => {
        const character = {
            name: "Zé Ro Derriro",
            alias: "Super Zero",
            team: ["Lonely"]
        }

        cy.postCharacter(character).then((response) => {
            expect(response.status).to.eql(400)
            expect(response.body.validation.body.message).to.eql("\"active\" is required")
        })
        
    });

    context('Quando o personagem já existe', () => { 
    
        const character = {
            name: "Steve Rogers",
            alias: "Captain America",
            team: ["Avengers"],
            active: true
        }

       
        before(() => {
            cy.postCharacter(character).then((response) => {
                expect(response.status).to.eql(201)
            })
        })


        it('Não deve cadastrar duplicado', () => {
            cy.postCharacter(character).then((response) => {
                expect(response.status).to.eql(400)
                expect(response.body.error).to.eql("Duplicate character")
            })
        })
    })
})

