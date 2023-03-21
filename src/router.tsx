import { createBrowserRouter, useNavigate, useRoutes } from "react-router-dom";
import Root from "@/views/Root";
import ErrorPage from "@/views/ErrorPage";
import Home from "@/views/pages/Home";
import MapEditor from "@/views/pages/MapEditor";
import MapViewer from "@/views/pages/MapViewer";
import SerialDumper from "@/views/pages/SerialDumper";
import SerialDumperRoutine from "@/views/pages/SerialDumperRoutine";
import SerialSender from "@/views/pages/SerialSender";
import { removeStorage } from "./lib/GenericStorage";
import { useEffect } from "react";

const LogoutScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    removeStorage("loginKey");
    navigate("/");
    location.reload();
  }, []);

  return <></>;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/serial-dumper",
        element: <SerialDumper />,
      },
      {
        path: "/serial-dumper-routine",
        element: <SerialDumperRoutine />,
      },
      {
        path: "/serial-sender",
        element: <SerialSender />,
      },
      // {
      //   path: "/map-editor",
      //   element: <MapEditor />,
      // },
      // {
      //   path: "/map-viewer",
      //   element: <MapViewer />,
      // },
      {
        path: "/logout",
        element: <LogoutScreen />,
      },
    ],
  },
]);

export default router;
