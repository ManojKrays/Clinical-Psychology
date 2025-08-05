import DoctorDetails from "@/pages/DoctorDetails";
import Index from "@/pages/Main/Index";
import Layout from "@/pages/Layout";
import PaymentSuccess from "@/pages/PaymentSuccess";
import PaymentFailure from "@/pages/PaymentFailure";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import ForgotPassword from "@/pages/ForgotPassword";
import Therapist from "@/pages/Therapist";
import Chat from "@/pages/Chat";

const PublicRoutes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Index /> },
      { path: "/signup", element: <Signup /> },
      { path: "/login", element: <Login /> },
      { path: "/forgot-password", element: <ForgotPassword /> },
      { path: "/therapist-register", element: <Therapist /> },
      {
        path: "/doctor/:therapistId",
        element: <DoctorDetails />,
      },
    ],
  },
  {
    path: "/chat",
    element: <Chat />,
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
