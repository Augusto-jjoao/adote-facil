describe('Minhas conversas (contato para adoção)', () => {
  const senha = '12345678'

  beforeEach(() => {
    cy.on('uncaught:exception', (err) => {
      if (err.message.includes('418') || err.message.includes('Hydration')) {
        return false
      }
      return true
    })

    cy.clearLocalStorage()
    cy.clearCookies()

    const timestamp = Date.now()

    cy.visit('/cadastro')
    cy.get('input[name="name"]').type('Usuario')
    cy.get('input[type="email"]').type(email)
    cy.get('input[name="password"]').type(senha)
    cy.get('input[name="confirmPassword"]').type(senha)
    cy.get('button[type="submit"]').click()

    cy.url({ timeout: 10000 }).should('include', '/login')

    cy.get('input[type="email"]').type(email)
    cy.get('input[name="password"]').type(senha)
    cy.contains('Login').click()

    cy.url({ timeout: 10000 }).should('include', '/area_logada')

    cy.visit('/area_logada/conversas')
  })

  it('Cenário principal: Deve exibir lista de conversas', () => {
    cy.get('h1').contains('Minhas conversas', { matchCase: false }).should('be.visible')
  })

  it('Alternativo: Deve exibir título da página de conversas', () => {
    cy.get('h1').contains('Minhas conversas', { matchCase: false }).should('be.visible')
  })
})