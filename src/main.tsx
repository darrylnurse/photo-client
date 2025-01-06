import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Root from './Root.tsx'
import { createBrowserRouter, RouterProvider } from "react-router";
import NewPhoto from "./pages/NewPhoto.tsx";
import Home from "./pages/Home.tsx";
import PhotoDetails from "./pages/PhotoDetails.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        children: [
            {
                index: true,
                element: <Home/>
            },
            {
                path: "new-photo",
                element: <NewPhoto/>
            },
            {
                path: "photo-details/:slug",
                element: <PhotoDetails/>
            }
        ]
    }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
