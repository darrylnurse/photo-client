import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Root from './Root.tsx'
import { createBrowserRouter, RouterProvider } from "react-router";
import NewPhoto from "./pages/NewPhoto.tsx";
import Home from "./pages/Home.tsx";

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
            }
        ]
    }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
