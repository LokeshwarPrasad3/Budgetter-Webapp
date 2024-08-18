import { RouterProvider } from 'react-router-dom';
import routes from './routes/routes.tsx';

const App: React.FC = () => {
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
};

export default App;
