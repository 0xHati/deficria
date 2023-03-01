import "./styles/index.scss";
import Home from "./pages/Home/Home";
import Layout from "./pages/Layout/Layout";
import FeesDetail from "./pages/FeesDetail/FeesDetail";
import NotFound from "./pages/Error/Error";
import { QueryClient, QueryClientProvider } from "react-query";
import Fees from "./pages/Fees/Fees";
import TotalValueLocked from "./pages/TotalValueLocked";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TotalValueLockedDetail from "./pages/TotalValueLockedDetail";
import Dex from "./pages/Volumes/Volumes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        errorElement: <NotFound />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/fees",
            element: <Fees />,
          },
          {
            path: "/fees/:protocol",
            element: <FeesDetail />,
          },
          {
            path: "/tvl",
            element: <TotalValueLocked />,
          },
          {
            path: "/tvl/:protocol",
            element: <TotalValueLockedDetail />,
          },
          {
            path: "/volumes",
            element: <Dex />,
          },
          {
            path: "/volumes/:protocol",
            element: <></>,
          },
        ],
      },
    ],
    errorElement: <Layout outlet={<NotFound />} />,
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider>
    </QueryClientProvider>
  );
}

export default App;
