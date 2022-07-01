import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Backlog from "./pages/Backlog";

const AppRoutes = [
  {
    index: true,
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/fetch-data',
    element: <FetchData />
  },
  {
    path: '/backlog',
    element: <Backlog />
  }
];

export default AppRoutes;
