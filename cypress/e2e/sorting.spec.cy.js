  const ascButton = "[data-testid='ascButton']";
  const descButton = "[data-testid='descButton']"; 
  const newMassiveButton = "[data-testid='newMassiveButton']"; 
  
  describe('Страница загружена', () => {
    before(() => {
      cy.visit('http://localhost:3000/sorting');
    });
    
    it('Не нажатая кнопка сортировки и кнопка "Новый массив" не активны пока работает сортировка', () => {      
      cy.get(descButton).click();
      cy.get(ascButton).should('be.disabled');
      cy.get(newMassiveButton).should('be.disabled');
      cy.reload();
      cy.get(ascButton).click();
      cy.get(descButton).should('be.disabled');
      cy.get(newMassiveButton).should('be.disabled');
    });        
  });