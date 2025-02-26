import { createBrowserRouter, createHashRouter, useNavigate, useRoutes } from "react-router-dom";
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
import PdfPrintTest from "./views/pages/PdfPrintTest";
import NeoSerialDumperRoutine from "./views/pages/NeoSerialDumperRoutine";

const LogoutScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    removeStorage("loginKey");
    navigate("/");
    location.reload();
  }, []);

  return <></>;
};

const router = createHashRouter([
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
        path: "/neo-serial-dumper-routine",
        element: <NeoSerialDumperRoutine />,
      },
      {
        path: "/serial-sender",
        element: <SerialSender />,
      },
      {
        path: "/pdf-print-test",
        element: <PdfPrintTest />,
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
