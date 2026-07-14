// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import { BrowserRouter } from 'react-router-dom'
// import { Toaster } from 'sonner'
// import { StoreProvider } from './lib/Store.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <BrowserRouter>
//       <StoreProvider>
//         <App />
//         <Toaster position="top-right" />
//       </StoreProvider>
//     </BrowserRouter>
//   </StrictMode>,
// )


import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import "./index.css";

import router from "./routes/Routes.jsx";
import { StoreProvider } from "./lib/Store.jsx";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <StoreProvider>
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </StoreProvider>
  </StrictMode>
);