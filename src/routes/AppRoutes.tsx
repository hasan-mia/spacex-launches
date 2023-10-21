import { Outlet, Route, Routes } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import Home from "../pages/Home";
import Notfound from "../pages/Notfound";

export default function Approutes() {
  return (
    <Routes>
      {/* =====Frontend Route==== */}
      <Route
        path="/"
        element={
          <AppLayout>
            <Outlet />
          </AppLayout>
        }
      >
        <Route index element={<Home />} />
      </Route>

      <Route path="*" element={<Notfound />} />
    </Routes>
  );
}
