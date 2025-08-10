import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { router } from './routes';
import './menu';
import './index.css';
const rootEl = document.getElementById('root');
if (rootEl) {
  console.log(router);
  const root = ReactDOM.createRoot(rootEl);
  root.render(<RouterProvider router={router} />);
}
