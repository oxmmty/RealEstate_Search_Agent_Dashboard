import type { FC } from 'react';
import type { RouteObject } from 'react-router';

import { lazy } from 'react';
import { Navigate } from 'react-router';
import { useRoutes } from 'react-router-dom';

import LayoutPage from '@/pages/layout';
import LoginPage from '@/pages/login';

import WrapperRouteComponent from './config';
import HomePage from '@/pages/home';


const NotFound = lazy(() => import(/* webpackChunkName: "404'"*/ '@/pages/404'));

const routeList: RouteObject[] = [
  {
    path: '/login',
    element: <WrapperRouteComponent element={<LoginPage />} titleId="Login" />,
  },
  {
    path: '/',
    element: <WrapperRouteComponent element={<LayoutPage />} titleId="" auth />,
    children: [
      {
        path: '',
        element: <Navigate to="home" />,
      },
      {
        path: 'home',
        element: <WrapperRouteComponent element={<HomePage />} titleId="Home" />,
      },
      {
        path: '*',
        element: <WrapperRouteComponent element={<NotFound />} titleId="Not Found" />,
      },
    ],
  },
];

const RenderRouter: FC = () => {
  const element = useRoutes(routeList);

  return element;
};

export default RenderRouter;
