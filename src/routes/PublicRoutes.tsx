import Index from "@/pages/Index";
import Layout from "@/pages/Layout";

const PublicRoutes = [
  {
    path: "/",
    element: <Layout />,
    children: [{ path: "/", element: <Index /> }],
  },
];

export default PublicRoutes;
