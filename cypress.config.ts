// cypress.config.ts

import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Implementar los listeners de eventos del nodo aquí

      // Cargar la simulación de SecureStore
      on('task', {
        loadSecureStore() {
          // Simulamos el objeto SecureStore
          (global as any).SecureStore = {
            setItemAsync: (key: string, value: string): Promise<boolean> => {
              return new Promise((resolve) => {
                localStorage.setItem(key, value);
                resolve(true);
              });
            },
            getItemAsync: (key: string): Promise<string | null> => {
              return new Promise((resolve) => {
                const value = localStorage.getItem(key);
                resolve(value);
              });
            },
            deleteItemAsync: (key: string): Promise<boolean> => {
              return new Promise((resolve) => {
                localStorage.removeItem(key);
                resolve(true);
              });
            }
          };
          return null; // O podrías retornar un valor que te indique que la carga fue exitosa
        }
      });
    },
  },
});
