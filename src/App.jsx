import { ThemeProvider, CssBaseline } from '@mui/material';
import corpicoTheme from './theme/Themes';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Login from '../src/pages/Login.jsx';
import ComponentePrincipal from './components/layouts/ComponentePrincipal.jsx';
import { useAuth } from './context/AuthContext';
import NuevaSolicitud from './pages/NuevaSolicitud.jsx';
import Solicitudes from './pages/Solicitudes.jsx';
import DetalleSolicitud from './components/DetalleSolicitud.jsx';

// 🔐 Protección de rutas
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <ComponentePrincipal />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '/nueva-solicitud',
        element: <NuevaSolicitud />,
      },
      {
        path: '/solicitudes',
        element: <Solicitudes />,
      },
      {
        path: '/solicitudes/:id',
        element: <DetalleSolicitud />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

const App = () => {
  return (
    <ThemeProvider theme={corpicoTheme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;