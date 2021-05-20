var mainPageElements = {
  title: 'span.mdl-layout-title',
  addVacationButton: '#add-new-vac',
  tableWithVacation: '#vacation-list',
  closeVacTogle: 'span.mdl-switch__ripple-container.mdl-js-ripple-effect.mdl-ripple--center',
  status: '#vacation-list > tbody > tr > td:nth-child(5)',
}

var popupElements = {
  title: 'h4.mdl-dialog__title',
  checkBox: 'span.mdl-checkbox__ripple-container.mdl-js-ripple-effect.mdl-ripple--center',
  checkBoxTitle: 'span.mdl-checkbox__label',
  inputFrom: 'input#from.mdl-textfield__input',
  inputTo: 'input#to.mdl-textfield__input',
  cancelButton: '#cancel',
  saveButton: '#save',
  errorMessage: '#errorMessage'
}
var dateFrom = '2021-12-11'
var dateTo = '2021-12-15'

context('Assertions', () => {
  beforeEach(() => {
    cy.visit('https://test.webtech.by/vac-system/')
    cy.clearCookies()
  })
  
  describe('Get elements', () => {

    it('Get title and elements on the main page', () => {
      cy.title().should('include', 'Vacation System')
      cy.get(mainPageElements.title).should('contain', 'Vacations')
      cy.get(mainPageElements.addVacationButton).should('contain', 'add')
      cy.get(mainPageElements.tableWithVacation).should('be.visible')
    })

    it('Click Add vacation and check pop-up elements', () => {
      cy.get(mainPageElements.addVacationButton).click()
      cy.get(popupElements.title).should('contain', 'Add new vacation?')
      cy.get(popupElements.checkBox).should('be.visible')
      cy.get(popupElements.checkBoxTitle).should('contain', 'No objections from my manager')
      cy.get(popupElements.inputFrom).should('be.visible')
      cy.get(popupElements.inputTo).should('be.visible')
      cy.get(popupElements.cancelButton).should('contain', 'Cancel')
      cy.get(popupElements.saveButton).should('contain', 'Save')
    })

    it('Add valid vacation', () => {
      cy.get(mainPageElements.addVacationButton).click()
      cy.get(popupElements.checkBox).click()
      cy.get(popupElements.inputFrom)
        .type(dateFrom)
        .should('have.value', dateFrom)
      cy.get(popupElements.inputTo)
        .type(dateTo)
        .should('have.value', dateTo)
      cy.get('#save').click()  
      cy.get(mainPageElements.status)
        .should('contain', 'submitted')  
      cy.get(mainPageElements.closeVacTogle).should('be.visible')
    })

    it('Add vacation and close it', () => {
      cy.get(mainPageElements.addVacationButton).click()
      cy.get(popupElements.checkBox).click()
      cy.get(popupElements.inputFrom)
        .type(dateFrom)
        .should('have.value', dateFrom)
      cy.get(popupElements.inputTo)
        .type(dateTo)
        .should('have.value', dateTo)
      cy.get(popupElements.saveButton).click()  
      cy.get(mainPageElements.closeVacTogle).click()
      cy.get(mainPageElements.status)
        .should('contain', 'closed')
    })

    it('Add vacation without selected checkbox', () => {
      cy.get(mainPageElements.addVacationButton).click()
      cy.get(popupElements.inputFrom)
        .type(dateFrom)
        .should('have.value', dateFrom)
      cy.get(popupElements.inputTo)
        .type(dateTo)
        .should('have.value', dateTo)
      cy.get(popupElements.saveButton).click()  
      cy.get(popupElements.errorMessage).should('contain', 'There should be no objections from your manager.')
    })

    it('Add vacation without info', () => {
      cy.get(mainPageElements.addVacationButton).click()
      cy.get(popupElements.saveButton).click()  
      cy.get(popupElements.errorMessage).should('contain', '"To" field is required.')
    })

    it('Add vacation without To date', () => {
      cy.get(mainPageElements.addVacationButton).click()
      cy.get(popupElements.checkBox).click()
      cy.get(popupElements.inputFrom)
        .type(dateFrom)
        .should('have.value', dateFrom)
      cy.get(popupElements.saveButton).click()   
      cy.get(popupElements.errorMessage).should('contain', '"To" field is required.')
    })

    it('Add vacation without From date', () => {
      cy.get(mainPageElements.addVacationButton).click()
      cy.get(popupElements.checkBox).click()
      cy.get(popupElements.inputTo)
        .type(dateTo)
        .should('have.value', dateTo)
      cy.get(popupElements.saveButton).click()  
      cy.get(popupElements.errorMessage).should('contain', '"From" is required.')
    })

    it('Add vacation with date To < date From', () => {
      cy.get(mainPageElements.addVacationButton).click()
      cy.get(popupElements.checkBox).click()
      cy.get(popupElements.inputFrom)
        .type(dateTo)
        .should('have.value', dateTo)
      cy.get(popupElements.inputTo)
        .type(dateFrom)
        .should('have.value', dateFrom)
      cy.get(popupElements.saveButton).click()  
      cy.get(popupElements.errorMessage).should('contain', 'You are unable to set To date before From.')
    })
  })
})