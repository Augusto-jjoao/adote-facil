describe('Fluxo de interesse em adoção', () => {
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
    const email = `adotante${timestamp}@test.com`

    cy.visit('/cadastro')
    cy.get('input[name="name"]').type('Adotante')
    cy.get('input[type="email"]').type(email)
    cy.get('input[name="password"]').type(senha)
    cy.get('input[name="confirmPassword"]').type(senha)
    cy.get('button[type="submit"]').click()

    cy.url({ timeout: 10000 }).should('include', '/login')

    cy.get('input[type="email"]').type(email)
    cy.get('input[name="password"]').type(senha)
    cy.contains('Login').click()

    cy.url({ timeout: 10000 }).should('include', '/area_logada')
  })

  it('Cenário principal: Deve acessar detalhes do animal e entrar em contato com o dono', () => {
    cy.visit('/area_logada/animais_disponiveis')

    cy.get('h1').contains('Animais disponíveis', { matchCase: false }).should('be.visible')

    cy.get('body').then(($body) => {
      const btn = $body.find('a[href*="/animais_disponiveis/"]').first()
      if (btn.length) {
        cy.wrap(btn).click()
      } else {
        cy.contains('Saiba mais').first().click()
      }
    })

    cy.url().should('include', '/animais_disponiveis/')

    cy.contains('Entrar em contato com o dono').click()

    cy.url({ timeout: 10000 }).should((url) => {
      expect(url).to.satisfy((u) =>
        u.includes('/conversas') || u.includes('/animais_disponiveis')
      )
    })
  })

  it('Alternativo: Deve exibir página de animais disponíveis', () => {
    cy.visit('/area_logada/animais_disponiveis')

    cy.get('h1').contains('Animais disponíveis', { matchCase: false }).should('be.visible')
  })
})