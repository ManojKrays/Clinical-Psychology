import { useRoutes } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import ProtectedRoutes from "./ProtectedRoutes";

export default function AppRoutes() {
  const elements = useRoutes([
    ...PublicRoutes,
    ...ProtectedRoutes,
    { path: "*", element: <>Not Found</> },
  ]);
  return <>{elements}</>;
}
