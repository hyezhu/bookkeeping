import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider, Routes, Route, BrowserRouter } from "react-router-dom";

import Root from "./routes/root";
import Next from "./routes/next";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "next",
    element: <Next />,
  },
]);

export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Root/>} />
      <Route path="next" element={<Next/>} />
    </Routes>
    </BrowserRouter>
  )
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
