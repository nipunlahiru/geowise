import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import Home from '../Home';

// Mock axios
jest.mock('axios');

describe('Home Component', () => {
  const mockCountries = [
    {
      cca3: 'USA',
      name: { common: 'United States' },
      population: 331002651,
      region: 'Americas',
      capital: ['Washington, D.C.'],
      flags: { png: 'https://flagcdn.com/w320/us.png' }
    },
    {
      cca3: 'CAN',
      name: { common: 'Canada' },
      population: 38005238,
      region: 'Americas',
      capital: ['Ottawa'],
      flags: { png: 'https://flagcdn.com/w320/ca.png' }
    }
  ];

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockCountries });
  });

  it('renders loading state initially', () => {
    render(<Home />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders countries after loading', async () => {
    render(<Home />);
    
    await waitFor(() => {
      expect(screen.getByText('United States')).toBeInTheDocument();
      expect(screen.getByText('Canada')).toBeInTheDocument();
    });
  });

  it('filters countries by search query', async () => {
    render(<Home />);
    
    await waitFor(() => {
      expect(screen.getByText('United States')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Search for a country...');
    fireEvent.change(searchInput, { target: { value: 'United' } });

    expect(screen.getByText('United States')).toBeInTheDocument();
    expect(screen.queryByText('Canada')).not.toBeInTheDocument();
  });

  it('filters countries by region', async () => {
    render(<Home />);
    
    await waitFor(() => {
      expect(screen.getByText('United States')).toBeInTheDocument();
    });

    const regionSelect = screen.getByRole('combobox');
    fireEvent.change(regionSelect, { target: { value: 'Americas' } });

    expect(screen.getByText('United States')).toBeInTheDocument();
    expect(screen.getByText('Canada')).toBeInTheDocument();
  });

  it('handles API error gracefully', async () => {
    axios.get.mockRejectedValue(new Error('API Error'));
    render(<Home />);
    
    await waitFor(() => {
      expect(screen.getByText('Error fetching countries')).toBeInTheDocument();
    });
  });
}); 