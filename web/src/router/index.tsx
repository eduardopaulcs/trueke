import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ProtectedRoute } from './protected-route';
import { HomePage } from '@/pages/home/HomePage';
import { LoginPage } from '@/pages/login/LoginPage';
import { RegisterPage } from '@/pages/register/RegisterPage';
import { NotFoundPage } from '@/pages/not-found/NotFoundPage';

// Null placeholder for pages not yet built.
const Placeholder = () => null;

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/home',
        element: <Placeholder />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
