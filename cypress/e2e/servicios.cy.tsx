describe('ServiciosScreen', () => {
  
  // Este beforeEach es compartido por todas las pruebas
  beforeEach(() => {
    // Simula una respuesta con datos de servicios
    cy.intercept('GET', 'http://localhost:5000/api/v1/services', {
      statusCode: 200,
      body: [
        {
          id: 1,
          name: 'Corte de cabello',
          description: 'Un corte de cabello moderno.',
          image: 'url_a_imagen_1.jpg',
          status: true, // Asegúrate de que el servicio esté activo
        },
        {
          id: 2,
          name: 'Manicura',
          description: 'Manicura clásica con esmalte.',
          image: 'url_a_imagen_2.jpg',
          status: true,
        },
      ],
    }).as('getServicios');

    // Visita la pantalla de servicios
    cy.visit('http://localhost:8081/servicios'); // Ajusta la URL según tu configuración
  });

  it('debería mostrar "No hay servicios disponibles" si la lista está vacía', () => {
    // Simula una respuesta vacía desde la API
    cy.intercept('GET', 'http://localhost:5000/api/v1/services', {
      statusCode: 200,
      body: [],
    }).as('getServiciosVacios');      

    cy.visit('http://localhost:8081/servicios'); // Revisitamos la página
    cy.wait('@getServiciosVacios');

    cy.contains('No hay servicios disponibles').should('be.visible');
  });

  it('debería mostrar la lista de servicios si están disponibles', () => {
    cy.contains('Servicios de la estética:').should('be.visible');
    cy.contains('Corte de cabello').should('be.visible');
    cy.contains('Manicura').should('be.visible');
    cy.get('img') // Asegúrate de que las imágenes de los servicios se cargan
  });

  it('debería navegar a la pantalla de detalles cuando se hace clic en un servicio', () => {
    cy.contains('Corte de cabello').click();
  
    // Verifica que redirige a la URL de detalles del servicio
    cy.url().should('include', '/details/1');
  });
});
