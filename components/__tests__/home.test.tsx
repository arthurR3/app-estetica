import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import HomeScreen from '@/app/(drawer)/(tabs)/index';
import { UsuarioProvider } from '@/components/context/userContext';
import ProductService from '@/services/productos.services';
import { router } from 'expo-router';
import { Alert } from 'react-native';


jest.mock('expo-router', () => ({
  router: { push: jest.fn() }
}));

describe('HomeScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the main elements correctly', () => {
    const { getByText } = render(
      <UsuarioProvider>
        <HomeScreen />
      </UsuarioProvider>
    );

    expect(getByText('Tu Lugar de Cuidado Personal y Belleza, A un click de Distancia')).toBeTruthy();
    expect(getByText('Agendar Cita')).toBeTruthy();
  });

  /* it('calls handleProductSelect with correct id on product click', async () => {
    const handleProductSelect = jest.fn();
    const product = { id: 1, name: 'Producto 1' };
    const mockProducts = [product];
  
    ProductService.getProductsForCarousel = jest.fn().mockResolvedValue(mockProducts);
  
    const { findByText } = render(
      <UsuarioProvider>
        <HomeScreen />
      </UsuarioProvider>
    );
  
    // Espera a que se renderice el producto
    const productElement = await findByText(product.name);
  
    // Simula el clic en el producto
    fireEvent.press(productElement);
  
    // Verifica que se llame a handleProductSelect con el ID correcto
    expect(handleProductSelect).toHaveBeenCalledWith(product.id);
  }); */
  
});
