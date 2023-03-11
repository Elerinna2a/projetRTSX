import { useStore } from "@nanostores/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes } from "react-router-dom";
import Collecte from "./components/Collecte";
import CreateCollecte from "./components/CreateCollecte";
import Mainlayout from "./layouts/MainLayout";
import Users from "./pages/Employes";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Login from "./pages/Login";
import TiersCollecte from "./pages/TiersCollecte";
import { employe } from "./store/employe.store";
import { useAuth } from "./utils/CustomHook";

const queryClient = new QueryClient();

export default function App() {
  const authedUser = useStore(employe);

  function authonly(page: JSX.Element) {
    return authedUser?.email ? page : <Login />;
  }

  function notAuthOnly(page: JSX.Element) {
    return !authedUser?.email ? page : <Home />;
  }

  useAuth();
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Mainlayout />}>
          <Route index element={<Home />} />
          <Route path="/users" element={authonly(<Users />)} />
          <Route path="/collecte" element={authonly(<Collecte />)} />
          <Route
            path="/create-collecte"
            element={authonly(<CreateCollecte />)}
          />
          <Route path="/login" element={notAuthOnly(<Login />)} />
          <Route path="/tiers-collecte" element={<TiersCollecte />} />
          <Route path="/*" element={<Error />} />
        </Route>
      </Routes>
      {/* <ReactQueryDevtools initialIsOpen={true} /> */}
    </QueryClientProvider>
  );
}
