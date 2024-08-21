import { RouterProvider } from 'react-router-dom';
import routes from './routes/routes.tsx';
import FollowCursor from './components/animation/FollowCursor.tsx';

const App: React.FC = () => {
  return (
    <>
      <RouterProvider router={routes} />
      <FollowCursor />
    </>
  );
};

export default App;
