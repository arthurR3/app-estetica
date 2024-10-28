// cypress/e2e/servicios.cy.ts
describe('ServiciosScreen', () => {
  
    beforeEach(() => {
      cy.visit('http://localhost:8081/servicios'); // Ajusta la URL según tu configuración
    });
  
    it('debería mostrar "No hay servicios disponibles" si la lista está vacía', () => {
      // Simula una respuesta vacía desde la API
      cy.intercept('GET', '/api/servicios', []).as('getServicios');      
      cy.contains('No hay servicios disponibles').should('be.visible');
    });
  
    it('debería mostrar la lista de servicios si están disponibles', () => {
      // Simula una respuesta con datos de servicios
      cy.intercept('GET', '/api/servicios', [
        {
          id: 1,
          name: 'Servicio de Manicura',
          description: 'Manicura completa con diseño a elección.',
          image: 'https://example.com/manicura.jpg'
        },
        {
          id: 2,
          name: 'Servicio de Pedicura',
          description: 'Pedicura relajante y cuidado completo.',
          image: 'https://example.com/pedicura.jpg'
        }
      ]).as('getServicios');
  
  
      cy.contains('Servicios de la estética:').should('be.visible');
      cy.get('img'); // Asegúrate de que las imágenes de los servicios se cargan
      cy.contains('Corte de Pelo').should('be.visible');
      cy.contains('Tratamiento Facial').should('be.visible');
    });
  
    it('debería navegar a la pantalla de detalles cuando se hace clic en un servicio', () => {
      // Simula una respuesta con datos de un servicio
      cy.intercept('GET', '/api/servicios', [
        {
          id: 1,
          name: 'Servicio de Manicura',
          description: 'Manicura completa con diseño a elección.',
          image: 'https://example.com/manicura.jpg'
        }
      ]).as('getServicios');
      
  
      cy.contains('Corte de Pelo').click();
  
      // Verifica que redirige a la URL de detalles del servicio
      cy.url().should('include', '/details/1');
    });
  });
  