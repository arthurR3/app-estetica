// cypress/e2e/details.cy.ts
describe('DetailsScreen', () => {

  beforeEach(() => {
    // Simular la respuesta de la API al obtener detalles del servicio
    cy.intercept('GET', 'http://localhost:5000/api/v1/services/1', {
      statusCode: 200,
      body: {
        id: 1,
        name: 'Servicio de Prueba',
        description: 'Descripción del servicio de prueba.',
        price: 100.0,
        duration: 60,
      },
    }).as('getServiceDetails');

    cy.visit('http://localhost:8081/details/1');
  });
  
    it('debería mostrar los detalles del servicio correctamente', () => {
      // Espera a que los detalles se carguen y verifica que se muestren en pantalla
      cy.get('img') // Verifica que la imagen esté cargada
      cy.contains('Descripción:').should('be.visible'); // Verifica que la descripción esté visible
      cy.contains('Duración del servicio:').should('be.visible'); // Verifica la duración
    });
  
    it('debería navegar a la pantalla de citas al hacer clic en "Agendar Cita"', () => {
      // Haz clic en el botón y verifica la redirección
      cy.contains('Agendar Cita').click(); 
      cy.url().should('include', '/citas'); // Verifica que la URL cambió a `/citas`
    });
  });
  