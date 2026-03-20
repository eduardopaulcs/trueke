import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ProtectedRoute } from './protected-route';

// Page components are null placeholders until pages are built.
const Placeholder = () => null;

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Placeholder />,
  },
  {
    path: '/register',
    element: <Placeholder />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: <Placeholder />,
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
