// react
import { Suspense, lazy } from 'react';
import { useRoutes, useLocation } from 'react-router-dom';
import DashboardLayout from '../layouts/dashboard';

// components
import LoadingScreen from '../components/LoadingScreen';

// guards
import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard';

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense fallback={<LoadingScreen isDashboard={pathname.includes('/dashboard')} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: (
        <GuestGuard>
          <Signin />
        </GuestGuard>
      ),
    },
    {
      path: '/signup',
      element: (
        <GuestGuard>
          <Signup />
        </GuestGuard>
      ),
    },
    // removed route
    {
      path: 'user',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Home />, index: true },
        { path: 'deposits', element: <Deposits /> },
        { path: 'settings', element: <Accounts /> },
        { path: 'withdrawals', element: <Withdrawal /> },
        { path: 'trading', element: <Trading /> },
        { path: 'signals', element: <Signals /> },
        { path: 'trading/new-trader', element: <NewTrader /> },
        { path: 'trading/traders', element: <Traders /> },
        { path: 'image/:imageId', element: <ImagePage /> },
        { path: 'settings/create-admin', element: <Signup /> },
        // { path: 'settings/update-password', element: <UpdatePassword /> },
        { path: 'admin', element: <Admins /> },
      ],
    },
  ]);
}

const Signin = Loadable(lazy(() => import('../pages/Signin')));
const Signup = Loadable(lazy(() => import('../pages/Signup')));
 
// // dashboard

const Home = Loadable(lazy(() => import('../pages/user/Home')));
const Deposits = Loadable(lazy(() => import('../pages/user/Deposits')));
const Accounts = Loadable(lazy(() => import('../pages/user/Settings')));
const Withdrawal = Loadable(lazy(() => import('../pages/user/Withdrawal')));
const Trading = Loadable(lazy(() => import('../pages/user/Trading')));
const Signals = Loadable(lazy(() => import('../pages/user/Signals')));
const ImagePage = Loadable(lazy(() => import('../pages/user/ImageUrl')));
const NewTrader = Loadable(lazy(() => import('../pages/user/NewTrader')));
const Traders = Loadable(lazy(() => import('../pages/user/Traders'))); 
const Admins = Loadable(lazy(() => import('../pages/user/Admins')));
// const UpdatePassword = Loadable(lazy(() => import('../pages/user/user/UpdatePassword')));
 