import AdminDashboard from "@/pages/Dashboard/AdminDashboard";
import AdminClientSection from "@/pages/Dashboard/AdminDashboard/AdminSection/AdminClientSection";
import AdminTherapistSection from "@/pages/Dashboard/AdminDashboard/AdminSection/AdminTherapistSection";
import ClientDashboard from "@/pages/Dashboard/ClientDashboard";
import TherapistDashboard from "@/pages/Dashboard/TherapistDashboard";
import DoctorDetails from "@/pages/DoctorDetails";
import Layout from "@/pages/Layout";
import ClientProfile from "@/pages/Profile/ClientProfile";
import TherapistProfile from "@/pages/Profile/TherapistProfile";

const ProtectedRoutes = [
  {
    element: <Layout />,
    children: [
      {
        path: "/doctor/:id",
        element: <DoctorDetails />,
      },
      {
        path: "/therapist-profile",
        element: <TherapistProfile />,
      },
      {
        path: "/client-profile",
        element: <ClientProfile />,
      },
      {
        path: "/AdminDashboard",
        element: <AdminDashboard />,
      },
      {
        path: "/therapistdashboard",
        element: <TherapistDashboard />,
      },
      {
        path: "/clientdashboard",
        element: <ClientDashboard />,
      },
      {
        path: "/AdminDashboard/therapist",
        element: <AdminTherapistSection />,
      },
      {
        path: "/AdminDashboard/client",
        element: <AdminClientSection />,
      },
    ],
  },
];

export default ProtectedRoutes;
