
  const textInput = "[data-testid='textInput']";
  const button = "[data-testid='button']"; 
  
  
  describe('Страница загружена', () => {
    before(() => {
      cy.visit('http://localhost:3000/recursion');
    });
  
    it('Кнопка заблокирована когда инпут пуст', () => {
      cy.get(textInput).clear();
      cy.get(button).should('be.disabled');
    });
  });