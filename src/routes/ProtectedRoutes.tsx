import DoctorDetails from "@/pages/DoctorDetails";

const ProtectedRoutes = [
  {
    path: "/doctor/:id",
    element: <DoctorDetails />,
  },
];

export default ProtectedRoutes;
