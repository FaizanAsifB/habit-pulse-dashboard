
import { 
  createRootRoute, 
  createRoute, 
  createRouter,
  RouterProvider,
  Outlet,
  Link
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import Homepage from './pages/Homepage';
import Index from './pages/Index';
import Habits from './pages/Habits';
import Tasks from './pages/Tasks';
import Goals from './pages/Goals';
import Calendar from './pages/Calendar';
import ProgressAnalytics from './pages/ProgressAnalytics';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

// Create a root route
const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      {process.env.NODE_ENV === 'development' && <TanStackRouterDevtools />}
    </>
  ),
  notFoundComponent: () => <NotFound />
});

// Define routes
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Homepage
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: Index
});

const habitsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/habits',
  component: Habits
});

const tasksRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tasks',
  component: Tasks
});

const goalsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/goals',
  component: Goals
});

const calendarRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/calendar',
  component: Calendar
});

const progressRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/progress',
  component: ProgressAnalytics
});

const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/settings',
  component: Settings
});

// Create the route tree using the routes
const routeTree = rootRoute.addChildren([
  indexRoute,
  dashboardRoute,
  habitsRoute,
  tasksRoute,
  goalsRoute,
  calendarRoute,
  progressRoute,
  settingsRoute
]);

// Create the router using the route tree
// @ts-ignore - Working around the strictNullChecks requirement
const router = createRouter({
  routeTree
});

// Register the router for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

// Export Link component to make it accessible throughout the app
export { router, RouterProvider, Link };
