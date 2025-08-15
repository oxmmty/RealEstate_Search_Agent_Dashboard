import type { FC, ReactElement } from 'react';
import type { RouteProps } from 'react-router';
import PrivateRoute from './pravateRoute';

export interface WrapperRouteProps extends RouteProps {
  /** document title locale id */
  titleId: string;
  /** authorization？ */
  auth?: boolean;
}

const WrapperRouteComponent: FC<WrapperRouteProps> = ({ titleId, auth, ...props }) => {

  if (titleId) {
    try {
      document.title = "Real Estates"
    } catch (err) {}
  }

  return auth ? <PrivateRoute {...props} /> : (props.element as ReactElement);
};

export default WrapperRouteComponent;
