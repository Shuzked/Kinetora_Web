import { jsx, Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  useEffect(() => {
    const session = localStorage.getItem("kinetora_session");
    setIsAuthenticated(!!session);
  }, []);
  return { isAuthenticated };
};
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  if (isAuthenticated === null) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-[#0D0D0D] flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "w-8 h-8 border-2 border-[#B454FF] border-t-transparent rounded-full animate-spin" }) });
  }
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsx(Navigate, { to: "/portal/login", state: { from: location }, replace: true });
  }
  return /* @__PURE__ */ jsx(Fragment, { children });
};
export {
  ProtectedRoute as default
};
