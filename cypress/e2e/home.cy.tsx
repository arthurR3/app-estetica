describe('HomeScreen', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8081'); // Reemplaza con la ruta correspondiente a tu HomeScreen
    });
  
    it('should display the welcome message', () => {
      cy.contains('Tu Lugar de Cuidado Personal y Belleza, A un click de Distancia').should('be.visible');
    });
  
    it('should navigate to ServiciosScreen when "Servicios" button is pressed', () => {
      cy.contains('Servicios').click();
      cy.visit('http://localhost:8081/servicios')
      cy.contains('Servicios de la estética:').should('be.visible'); 
  });

  it('should navigate to CitasScreen when "Citas" button is pressed', () => {
    cy.contains('Citas').click();
    cy.visit('http://localhost:8081/citas')
    cy.contains('Debes iniciar sesion para poder agendar').should('be.visible'); 
});
  });
  