import { createBrowserRouter } from "react-router-dom";

import { AppLayout } from "../layouts/AppLayout";
import { DashboardPage } from "../pages/DashboardPage";
import { HealthPage } from "../pages/HealthPage";
import { ReleasesPage } from "../pages/ReleasesPage";
import { CreateReleasePage } from "../pages/CreateReleasePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "health",
        element: <HealthPage />,
      },
      {
        path: "releases",
        element: <ReleasesPage />,
      },
      {
        path: "releases/new",
        element: <CreateReleasePage />,
      },
    ],
  },
]);
