describe('Responsive Design Tests', () => {
    const viewports = [
      { device: 'MacBook-15', width: 1440, height: 900 },
      { device: 'iPad Mini', width: 768, height: 1024 },
      { device: 'iPhone X', width: 375, height: 812 },
      // Add more viewports as needed
    ];
  
    viewports.forEach(viewport => {
      it(`Should display correctly on ${viewport.device}`, () => {
        if (viewport.width && viewport.height) {
          cy.viewport(viewport.width, viewport.height);
        } else {
          cy.viewport(viewport.device);
        }
        cy.visit('http://example.com'); // Replace with your site's URL
  
        // Example assertion: check if the title contains expected text
        cy.title().should('include', 'Example Domain');
        
        // Add more assertions as needed to test functionality and layout at each viewport
      });
    });
  });
  