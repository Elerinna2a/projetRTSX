import { useStore } from "@nanostores/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes } from "react-router-dom";
import Collecte from "./components/Collecte";
import CreateCollecte from "./components/CreateCollecte";
import CreateEmploye from "./components/CreateEmploye";
import CreateTraitement from "./components/CreateTraitement";
import Employes from "./components/Employes";
import TiersCollecte from "./components/TiersCollecte";
import Mainlayout from "./layouts/MainLayout";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Login from "./pages/Login";
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
          {/* Single page */}
          <Route index element={<Home />} />
          <Route path="/collecte" element={authonly(<Collecte />)} />
          <Route path="/employes" element={authonly(<Employes />)} />
          <Route path="/tiers-collecte" element={<TiersCollecte />} />
          <Route path="/login" element={notAuthOnly(<Login />)} />

          {/* create page */}
          <Route path="/create-employe" element={authonly(<CreateEmploye />)} />
          <Route
            path="/create-collecte"
            element={authonly(<CreateCollecte />)}
          />
          <Route
            path="/create-traitement"
            element={authonly(<CreateTraitement />)}
          />

          {/* Error page */}
          <Route path="/*" element={<Error />} />
        </Route>
      </Routes>
      {/* <ReactQueryDevtools initialIsOpen={true} /> */}
    </QueryClientProvider>
  );
}
