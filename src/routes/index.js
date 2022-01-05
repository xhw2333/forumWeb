import Main from "../pages/main/main";
import Login from "../pages/login/login";
import Home from "../pages/home/home";
import Note from "../pages/note/note";
import Friend from "../pages/friend/friend";
import Me from "../pages/me/me";
import Detail from "../pages/detail/detail";
import Publish from "../pages/publish/publish";

export const mainRoutes = [
    {
        path: '/main/home',
        component: Home,
        exact: true,
    },
    {
        path: '/main/note',
        component: Note,
        exact: true,
    },
    {
        path: '/main/friend',
        component: Friend,
        exact: true,
    },
    {
        path: '/main/me',
        component: Me,
        exact: true,
    },
    {
        path: '/main/detail',
        component: Detail,
        exact: true,
    },
    {
        path: '/main/publish',
        component: Publish,
        exact: true,
    },
]

const routes = [
    {
        path: '/login',
        component: Login,
        exact: true,
    },
    {
        path: '/main',
        component: Main,
        exact:false
    }
]

export default routes;