context('Assertions', () => {
  beforeEach(() => {
    cy.visit('https://test.webtech.by/vac-system/')
    cy.clearCookies()
  })
  
  describe('Get elements', () => {

    it('Get title and elements on the main page', () => {
      cy.title().should('include', 'Vacation System')
      cy.get('span.mdl-layout-title').should('contain', 'Vacations')
      cy.get('#add-new-vac').should('contain', 'add')
      cy.get('#vacation-list').should('be.visible')
    })

    it('Click Add vacation and check pop-up elements', () => {
      cy.get('#add-new-vac').click()
      cy.get('h4.mdl-dialog__title').should('contain', 'Add new vacation?')
      cy.get('span.mdl-checkbox__ripple-container.mdl-js-ripple-effect.mdl-ripple--center').should('be.visible')
      cy.get('span.mdl-checkbox__label').should('contain', 'No objections from my manager')
      cy.get('input#from.mdl-textfield__input').should('be.visible')
      cy.get('input#to.mdl-textfield__input').should('be.visible')
      cy.get('#cancel').should('contain', 'Cancel')
      cy.get('#save').should('contain', 'Save')
    })

    it('Add vacation valid vacation', () => {
      cy.get('#add-new-vac').click()
      cy.get('span.mdl-checkbox__ripple-container.mdl-js-ripple-effect.mdl-ripple--center').click()
      cy.get('input#from.mdl-textfield__input')
        .type('2021-12-11')
        .should('have.value', '2021-12-11')
      cy.get('input#to.mdl-textfield__input')
        .type('2021-12-15')
        .should('have.value', '2021-12-15')
      cy.get('#save').click()  
      cy.get('#vacation-list > tbody > tr > td:nth-child(1)')
        .should('contain', '2021-12-11')
      cy.get('#vacation-list > tbody > tr > td:nth-child(5)')
        .should('contain', 'submitted')  
      cy.get('span.mdl-switch__ripple-container.mdl-js-ripple-effect.mdl-ripple--center').should('be.visible')
    })

    it('Add vacation and close it', () => {
      cy.get('#add-new-vac').click()
      cy.get('span.mdl-checkbox__ripple-container.mdl-js-ripple-effect.mdl-ripple--center').click()
      cy.get('input#from.mdl-textfield__input')
        .type('2021-12-11')
        .should('have.value', '2021-12-11')
      cy.get('input#to.mdl-textfield__input')
        .type('2021-12-15')
        .should('have.value', '2021-12-15')
      cy.get('#save').click()  
      cy.get('span.mdl-switch__ripple-container.mdl-js-ripple-effect.mdl-ripple--center').click()
      cy.get('#vacation-list > tbody > tr > td:nth-child(5)')
        .should('contain', 'closed')
    })

    it('Add vacation without selected checkbox', () => {
      cy.get('#add-new-vac').click()
      cy.get('input#from.mdl-textfield__input')
        .type('2021-12-11')
        .should('have.value', '2021-12-11')
      cy.get('input#to.mdl-textfield__input')
        .type('2021-12-15')
        .should('have.value', '2021-12-15')
      cy.get('#save').click()  
      cy.get('#errorMessage').should('contain', 'There should be no objections from your manager.')
    })

    it('Add vacation without info', () => {
      cy.get('#add-new-vac').click()
      cy.get('#save').click()  
      cy.get('#errorMessage').should('contain', '"To" field is required.')
    })

    it('Add vacation without To date', () => {
      cy.get('#add-new-vac').click()
      cy.get('span.mdl-checkbox__ripple-container.mdl-js-ripple-effect.mdl-ripple--center').click()
      cy.get('input#from.mdl-textfield__input')
        .type('2021-12-11')
        .should('have.value', '2021-12-11')
      cy.get('#save').click()  
      cy.get('#errorMessage').should('contain', '"To" field is required.')
    })

    it('Add vacation without From date', () => {
      cy.get('#add-new-vac').click()
      cy.get('span.mdl-checkbox__ripple-container.mdl-js-ripple-effect.mdl-ripple--center').click()
      cy.get('input#to.mdl-textfield__input')
        .type('2021-12-15')
        .should('have.value', '2021-12-15')
      cy.get('#save').click()  
      cy.get('#errorMessage').should('contain', '"From" is required.')
    })

    it('Add vacation with date To < date From', () => {
      cy.get('#add-new-vac').click()
      cy.get('span.mdl-checkbox__ripple-container.mdl-js-ripple-effect.mdl-ripple--center').click()
      cy.get('input#from.mdl-textfield__input')
        .type('2021-12-15')
        .should('have.value', '2021-12-15')
      cy.get('input#to.mdl-textfield__input')
        .type('2021-12-11')
        .should('have.value', '2021-12-11')
      cy.get('#save').click()  
      cy.get('#errorMessage').should('contain', 'You are unable to set To date before From.')
    })
  })
})