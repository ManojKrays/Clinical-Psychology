import DoctorDetails from "@/pages/DoctorDetails";
import Index from "@/pages/Main/Index";
import Layout from "@/pages/Layout";

const PublicRoutes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Index /> },
      {
        path: "/doctor/:id",
        element: <DoctorDetails />,
      },
    ],
  },
];

export default PublicRoutes;
