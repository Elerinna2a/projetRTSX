import { Route, Routes } from "react-router-dom";
import Mainlayout from "./layouts/MainLayout";
import Collecte from "./pages/Collecte";
import Driver from "./pages/Driver";
import Error from "./pages/Error";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Mainlayout />}>
        <Route index element={<Home />} />
        <Route path="/collecte" element={<Collecte />} />
        <Route path="/chauffeur" element={<Driver />} />
        <Route path="/*" element={<Error />} />
      </Route>
    </Routes>
  );
}

export default App;
