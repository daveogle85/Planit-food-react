import { RouteComponentProps } from 'react-router';

export type AppRoute = {
    path: string,
    exact: boolean,
    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>
};