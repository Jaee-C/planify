import { Home } from "./components/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Backlog from "./pages/Backlog";
import Projects from "./pages/Projects";

const AppRoutes = [
  {
    path: '/',
    element: <Home />,
    name: "Home",
  },
  {
    path: '/projects/:key/backlog',
    element: <Backlog />,
    name: "Backlog",
    hidden: true,
  },
  {
    path: '/projects/*',
    element: <Projects />,
    name: "Projects"
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
