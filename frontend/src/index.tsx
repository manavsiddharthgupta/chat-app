import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Chat } from "./components/Chat";
import App from './App';

const router = createBrowserRouter([
  {
    path: "/",
    element: <main>
      <App />
    </main>,
  },
  {
    path: "chat",
    element: <main>
      <Chat />
    </main>,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <RouterProvider router={router} />
);