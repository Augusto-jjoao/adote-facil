describe('Alteração de Senha', () => {

    beforeEach(() => {
        cy.visit('/login')
        cy.get('input[name=email]').type('doador@test.com')
        cy.get('input[name=senha]').type('12345678')
        cy.contains('Entrar').click()

        cy.visit('/alterar-senha')
    })

    it('Cenário principal: Deve alterar senha com sucesso', () => {
        cy.get('input[name=senhaAtual]').type('12345678')
        cy.get('input[name=novaSenha]').type('novaSenha123')
        cy.get('input[name=confirmarSenha]').type('novaSenha123')

        cy.contains('Salvar').click()

        cy.contains('Senha alterada com sucesso')
    })

    it('Alternativo: Não deve alterar se senha atual estiver incorreta', () => {
        cy.get('input[name=senhaAtual]').type('senhaErrada')
        cy.get('input[name=novaSenha]').type('novaSenha123')
        cy.get('input[name=confirmarSenha]').type('novaSenha123')

        cy.contains('Salvar').click()

        cy.contains('Senha atual incorreta')
    })

    it('Alternativo: Não deve alterar se confirmação for diferente', () => {
        cy.get('input[name=senhaAtual]').type('12345678')
        cy.get('input[name=novaSenha]').type('novaSenha123')
        cy.get('input[name=confirmarSenha]').type('outraSenha')

        cy.contains('Salvar').click()

        cy.contains('As senhas não coincidem')
    })

})
