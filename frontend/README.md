# Countries Explorer

A React-based web application that allows users to explore information about countries using the REST Countries API.

## Features

- View a list of all countries with basic information
- Search for countries by name
- Filter countries by region
- View detailed information about each country
- Responsive design that works on all devices
- User authentication (demo version)

## Technologies Used

- React (with functional components)
- React Router for navigation
- Axios for API calls
- Tailwind CSS for styling
- Jest and React Testing Library for testing

## API Endpoints Used

- GET /all - Fetch all countries
- GET /name/{name} - Search countries by name
- GET /region/{region} - Filter countries by region
- GET /alpha/{code} - Get detailed information about a specific country

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd countries-explorer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Running Tests

To run the test suite:

```bash
npm test
```

## Project Structure

```
src/
  ├── components/     # Reusable components
  ├── pages/         # Page components
  ├── __tests__/     # Test files
  ├── App.jsx        # Main application component
  ├── main.jsx       # Application entry point
  └── setupTests.js  # Jest setup file
```

## API Integration

The application uses the REST Countries API (https://restcountries.com/) to fetch country data. No API key is required.

## Deployment

The application can be deployed to any static hosting service. For example:

1. Build the application:
   ```bash
   npm run build
   ```

2. Deploy the contents of the `dist` directory to your hosting service.

## Testing

The application includes unit tests for the main components using Jest and React Testing Library. Tests cover:

- Component rendering
- API integration
- User interactions
- Error handling

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- REST Countries API for providing the country data
- React and Vite teams for the amazing development tools
- Tailwind CSS for the utility-first CSS framework
