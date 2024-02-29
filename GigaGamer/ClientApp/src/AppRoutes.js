import { Home } from "./components/Home";
import { MainForm } from "./components/MainForm";
import { LogOn } from "./components/LogOn";
import { MyList } from "./components/MyList";
import { SignUp } from "./components/SignUp";

const AppRoutes = [
    {
        index: true,
        element: <Home/>
    },
    {
        path: "main_form",
        element: <MainForm/>
    },
    {
        path: "log_on",
        element: <LogOn/>
    },
    {
        path: "my_games",
        element: <MyList/>
    },
    {
        path: "sign_up",
        element: <SignUp/>
    }
];

export default AppRoutes;
