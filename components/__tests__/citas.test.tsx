import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import CitasScreen from '@/app/(drawer)/(tabs)/[citas]';
import { useUsuarioContext } from '../context/userContext';
import ServiciosService from '@/services/servicios.services';
import { useLocalSearchParams } from 'expo-router';

// Mock del contexto y los servicios
jest.mock('@/components/context/userContext', () => ({
  useUsuarioContext: jest.fn(),
}));

jest.mock('@/services/servicios.services', () => ({
  getAllServices: jest.fn(),
  getWorkedSchedule: jest.fn(),
  getWorkedExceptions: jest.fn(),
}));

jest.mock('expo-router', () => ({
  useLocalSearchParams: jest.fn(),
}));

describe('CitasScreen', () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    (useUsuarioContext as jest.Mock).mockReturnValue({
      state: { token: 'valid-token' },
      dispatch: mockDispatch,
    });
    
    // Mockear el retorno de useLocalSearchParams
    (useLocalSearchParams as jest.Mock).mockReturnValue({ citas: '1' });

    render(<CitasScreen />);

    expect(screen.getByText('Reserva una cita ahora mismo!'));
    expect(screen.getByPlaceholderText('Selecciona un servicio'))
    expect(screen.getByPlaceholderText('Selecciona una hora'))
    expect(screen.getByText('Agendar'));
  });

  it('should show message if user is not logged in', () => {
    (useUsuarioContext as jest.Mock).mockReturnValue({
      state: { token: null },
      dispatch: mockDispatch,
    });
    
    // Mockear el retorno de useLocalSearchParams
    (useLocalSearchParams as jest.Mock).mockReturnValue({ citas: '1' });

    render(<CitasScreen />);

    expect(screen.getByText('Debes iniciar sesion para poder agendar'))
  });
});
