import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { router } from './routes';
import './index.css';
const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(<RouterProvider router={router} />);
}
