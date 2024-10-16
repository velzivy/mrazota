import React, { useEffect, useState } from 'react'

import './App.css';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Main from './Components/Pages/Main/Main'
import ErrorPage from './Components/Pages/ErrorPage/ErrorPage';
import Chat from './Components/Pages/Chat/Chat';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement: <ErrorPage></ErrorPage>
    },
    {
      path: "/chat",
      element: <Chat />,
      errorElement: <ErrorPage></ErrorPage>
    },
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App