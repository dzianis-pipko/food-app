import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.tsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Error } from './pages/Error/Error.tsx'
import { Menu } from './pages/Menu/Menu.tsx'
import { Cart } from './pages/Cart/Cart.tsx'
import { Lauoyt } from './Layout/Layout/Layout.tsx'
import { Product } from './pages/Product/Product.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Lauoyt />,
    children: [
      {
        path: '/',
        element: <Menu />
      },
      {
        path: '/cart',
        element: <Cart />
      },
      {
        path: '/product/:id',
        element: <Product />
      }
    ]
  },
  {
    path: '*',
    element: <Error />
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
