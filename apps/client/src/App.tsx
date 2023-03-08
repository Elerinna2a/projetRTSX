import { useStore } from "@nanostores/react";
import axios from "axios";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { Route, Routes } from "react-router-dom";
import Mainlayout from "./layouts/MainLayout";
import Clients from "./pages/Clients";
import Collecte from "./pages/Collecte";
import Driver from "./pages/Driver";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Users from "./pages/Users";
import { setUser, user } from "./store/employe.store";
import { useAuth } from "./utils/CustomHook";

function App() {
  const [cookies] = useCookies(["sessionid"]);
  const authedUser = useStore(user);

  function authonly(page: JSX.Element) {
    const [cookie] = useCookies(["sessionid"]);
    return cookies.sessionid ? page : <Login />;
  }
  function notAuthOnly(page: JSX.Element) {
    const [cookie] = useCookies(["sessionid"]);
    return cookies.sessionid ? <Home /> : page;
  }

  useEffect(() => {
    if (!authedUser?.email) {
      axios
        .post("http://localhost:3000/auth/get-user-infos", {
          sessionId: cookies.sessionid,
        })
        .then((res) => setUser(res.data.user));
    }
  }, []);

  useAuth();

  return (
    <Routes>
      <Route path="/" element={<Mainlayout />}>
        <Route index element={<Home />} />
        <Route path="/users" element={authonly(<Users />)} />
        <Route path="/clients" element={authonly(<Clients />)} />
        <Route path="/collecte" element={authonly(<Collecte />)} />
        <Route path="/chauffeur" element={authonly(<Driver />)} />
        <Route path="/login" element={notAuthOnly(<Login />)} />
        <Route path="/*" element={<Error />} />
      </Route>
    </Routes>
  );
}

export default App;
