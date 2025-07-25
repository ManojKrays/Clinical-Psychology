import DoctorDetails from "@/pages/DoctorDetails";
import Index from "@/pages/Main/Index";
import Layout from "@/pages/Layout";
import PaymentSuccess from "@/pages/PaymentSuccess";
import PaymentFailure from "@/pages/PaymentFailure";

const PublicRoutes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Index /> },
      {
        path: "/doctor/:therapistId",
        element: <DoctorDetails />,
      },
    ],
  },
  {
    path: "/payment-success/:sessionId",
    element: <PaymentSuccess />,
  },
  {
    path: "/payment-failure/:sessionId",
    element: <PaymentFailure />,
  },
];

export default PublicRoutes;
