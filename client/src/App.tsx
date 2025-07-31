import { RouterProvider } from 'react-router-dom';
import routes from './routes/routes.tsx';
import FollowCursor from './components/animation/FollowCursor.tsx';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCurrentWindowWidth,
  setIsMobile,
} from './features/windowWidth/windowWidthSlice.ts';
import * as Sentry from '@sentry/react';
import ErrorPage from './components/layout/ErrorPage.tsx';

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  sendDefaultPii: true,
  tracesSampleRate: 1.0,
});

const App: React.FC = () => {
  // set window width
  const dispatch = useDispatch();
  useEffect(() => {
    const handleResize = () => {
      dispatch(setCurrentWindowWidth(window.innerWidth));
      dispatch(setIsMobile(window.innerWidth <= 768));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [window.innerWidth]);

  // get current width from redux
  const windowWidth = useSelector(
    (state: any) => state.windowWidth.windowWidth
  );

  return (
    <Sentry.ErrorBoundary fallback={<ErrorPage />}>
      <RouterProvider
        router={routes}
        future={{
          v7_startTransition: true,
        }}
      />
      {windowWidth > 768 && <FollowCursor />}
    </Sentry.ErrorBoundary>
  );
};

export default App;
