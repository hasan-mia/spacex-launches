/* eslint-disable @typescript-eslint/no-unused-vars */
import { BrowserRouter } from "react-router-dom";
import Approutes from "./routes/AppRoutes";

export default function App() {
  return (
    <BrowserRouter>
      <Approutes />
    </BrowserRouter>
  );
}
