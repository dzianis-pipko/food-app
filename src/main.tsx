import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.tsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Error as ErrorPage } from './pages/Error/Error.tsx'
import { Cart } from './pages/Cart/Cart.tsx'
import { Lauoyt } from './Layout/Layout/Layout.tsx'
import { Product } from './pages/Product/Product.tsx'
import axios from 'axios'
import { PREFIX_URL } from './helpers/API.ts'
import { AuthLayout } from './Layout/Auth/AuthLayout.tsx'
import { Login } from './pages/Login/Login.tsx'
import { Register } from './pages/Register/Register.tsx'
import { RequireAuth } from './helpers/RequireAuth.tsx'

const Menu = lazy(() => import('./pages/Menu/Menu.tsx'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <RequireAuth><Lauoyt /></RequireAuth>,
    children: [
      {
        path: '/',
        element: <Suspense fallback={<>Загрузка...</>}><Menu /></Suspense>
      },
      {
        path: '/cart',
        element: <Cart />
      },
      {
        path: '/product/:id',
        element: <Product />,
        errorElement: <>error</>,
        loader: async ({params}) => {
          // throw new Error('this is error')
          // await new Promise<void>((resolve) => {
          //       setTimeout(() => {
          //           resolve();
          //       }, 2000)
          //   })
          const {data} = await axios.get(`${PREFIX_URL}/products/${params.id}`)
          return data
        },
      }
    ]
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: '/auth/login',
        element: <Login />,
      },
      {
        path: '/auth/register',
        element: <Register />,
      },
    ]
  },
  {
    path: '*',
    element: <ErrorPage />
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
