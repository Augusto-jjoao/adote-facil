describe('Solicitação de Adoção', () => {

    beforeEach(() => {
        cy.visit('/login')
        cy.get('input[name=email]').type('adotante@test.com')
        cy.get('input[name=senha]').type('12345678')
        cy.contains('Entrar').click()
    })

    it('Cenário principal: Deve solicitar adoção com sucesso', () => {
        cy.visit('/animais')
        cy.contains('Ver detalhes').first().click()

        cy.contains('Solicitar adoção').click()
        cy.contains('Confirmar').click()

        cy.contains('Solicitação enviada com sucesso')
    })

    it('Alternativo: Não deve permitir solicitar animal já adotado', () => {
        cy.visit('/animais')
        cy.contains('Adotado').first().click()

        cy.contains('Solicitar adoção').should('not.exist')
    })

})
