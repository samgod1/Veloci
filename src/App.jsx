import { createBrowserRouter, RouterProvider } from "react-router";

import { Home } from "./pages/index.js";
import "./App.css";

let router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
