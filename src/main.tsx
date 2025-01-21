import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Root from './Root.tsx'
import { createBrowserRouter, RouterProvider } from "react-router";
import NewPhoto from "./pages/NewPhoto.tsx";
import Home from "./pages/Home.tsx";
import PhotoDetails from "./pages/PhotoDetails.tsx";
import GeneralError from "./pages/GeneralError.tsx";
import AdminLogin from "./pages/AdminLogin.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        errorElement: <GeneralError/>,
        children: [
            {
                index: true,
                element: <Home/>,
                errorElement: <GeneralError/>
            },
            {
                path: "new-photo",
                element: <NewPhoto/>,
                errorElement: <GeneralError/>
            },
            {
                path: "photo-details/:slug",
                element: <PhotoDetails/>,
                errorElement: <GeneralError/>
            },
            {
                path: "login",
                element: <AdminLogin/>,
                errorElement: <GeneralError/>
            }
        ]
    }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
