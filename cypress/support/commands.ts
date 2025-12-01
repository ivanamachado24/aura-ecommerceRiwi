/// <reference types="cypress" />

// Declaración de tipos para comandos personalizados
declare global {
    namespace Cypress {
      interface Chainable {
        /**
         * Comando personalizado para llenar formulario de registro
         */
        fillRegistrationForm(userData: {
          cc: string;
          name: string;
          tel: string;
          email: string;
          password: string;
        }): Chainable<void>;
        
        /**
         * Comando personalizado para generar usuario único
         */
        generateUniqueUser(): Chainable<{
          cc: string;
          name: string;
          tel: string;
          email: string;
          password: string;
        }>;
      }
    }
  }