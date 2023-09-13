// using react-router-dom createBrowserRouter & loader

import React from 'react';

import { createBrowserRouter } from 'react-router-dom';
import ChartPage from './pages/ChartPage';
import chartDataLoader from './loader/chart-data';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ChartPage />,
    loader: chartDataLoader,
  },
]);

export default router;
