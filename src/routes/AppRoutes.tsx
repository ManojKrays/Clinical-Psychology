import { useLocation, useRoutes } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import ProtectedRoutes from "./ProtectedRoutes";
import { useEffect } from "react";
import NotFound from "@/pages/NotFound";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
};

export default function AppRoutes() {
  const elements = useRoutes([
    ...PublicRoutes,
    ...ProtectedRoutes,
    { path: "*", element: <NotFound /> },
  ]);
  return (
    <>
      <ScrollToTop />
      {elements}
    </>
  );
}
