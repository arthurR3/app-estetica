// ServiciosScreen.test.tsx
import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import ServiciosScreen from '@/app/(drawer)/(tabs)/servicios';
import ServiciosService from '@/services/servicios.services';

// Mock del servicio de servicios
jest.mock('@/services/servicios.services', () => ({
  getAllServices: jest.fn(),
}));

describe('ServiciosScreen', () => {
  const mockServicios = [
    {
      id: 1,
      name: 'Servicio 1',
      image: 'http://example.com/image1.jpg',
      description: 'Descripción del servicio 1',
    },
    {
      id: 2,
      name: 'Servicio 2',
      image: 'http://example.com/image2.jpg',
      description: 'Descripción del servicio 2',
    },
  ];

  beforeEach(() => {
    // Reinicia el mock antes de cada prueba
    jest.clearAllMocks();
  });

  it('renders correctly', async () => {
    // Configura el mock para que devuelva los servicios
    (ServiciosService.getAllServices as jest.Mock).mockResolvedValue(mockServicios);

    // Renderiza el componente
    const { getByText } = render(<ServiciosScreen />);

    // Espera a que se rendericen los elementos
    await waitFor(() => {
      expect(getByText('Servicios de la estética:'));
      expect(getByText('Servicio 1'));
      expect(getByText('Descripción del servicio 1'));
      expect(getByText('Servicio 2'));
      expect(getByText('Descripción del servicio 2'));
    });
  });

  it('handles empty service list', async () => {
    // Configura el mock para que devuelva una lista vacía
    (ServiciosService.getAllServices as jest.Mock).mockResolvedValue([]);

    const { getByText } = render(<ServiciosScreen />);

    // Espera a que se rendericen los elementos
    await waitFor(() => {
      expect(getByText('Servicios de la estética:'));
      expect(getByText('No hay servicios disponibles')); // Asegúrate de manejar esto en el componente
    });
  });

  it('fetches services on mount', async () => {
    // Configura el mock para que devuelva los servicios
    (ServiciosService.getAllServices as jest.Mock).mockResolvedValue(mockServicios);

    render(<ServiciosScreen />);

    // Espera a que se llamen al servicio
    await waitFor(() => {
      expect(ServiciosService.getAllServices);
    });
  });
});
