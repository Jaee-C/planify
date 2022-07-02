import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Backlog from "./pages/Backlog";

const AppRoutes = [
  {
    path: '/',
    element: <Home />,
    name: "Home",
  },
  {
    path: '/backlog',
    element: <Backlog />,
    name: "Backlog"
  },
  {
    path: '/counter',
    element: <Counter />,
    name: "Counter",
  },
  {
    path: '/fetch-data',
    element: <FetchData />,
    name: "Fetch Data",
  },
  {
    path: '/signup',
    element: <Signup />,
    name: "Signup",
  },
  {
    path: "/login",
    element: <Login />,
    name: "Login",
  },
];

export default AppRoutes;
