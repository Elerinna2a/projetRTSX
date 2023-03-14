import { useStore } from "@nanostores/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes } from "react-router-dom";
import CreateCollecte from "./components/create/CreateCollecte";
import CreateEmploye from "./components/create/CreateEmploye";
import CreateExpedition from "./components/create/CreateExpedition";
import CreateTraitement from "./components/create/CreateTraitement";
import CollecteDetails from "./components/details/CollecteDetails";
import EmployeDetails from "./components/details/EmployeDetails";
import ExpeditionDetails from "./components/details/ExpeditionDetails";
import UpdateCollecte from "./components/update/UpdateCollecte";
import UpdateEmploye from "./components/update/UpdateEmploye";
import Mainlayout from "./layouts/MainLayout";
import Collecte from "./pages/Collectes";
import Employes from "./pages/Employes";
import Error from "./pages/Error";
import Expeditions from "./pages/Expeditions";
import Factures from "./pages/Factures";
import Home from "./pages/Home";
import Login from "./pages/Login";
import TiersCollecte from "./pages/TiersCollecte";
import TiersCompactes from "./pages/TiersCompactes";
import Tournees from "./pages/Tournees";
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
          {/*  page  route*/}
          <Route index element={<Home />} />
          <Route path="/collectes" element={authonly(<Collecte />)} />
          <Route path="/employes" element={authonly(<Employes />)} />
          <Route path="/expeditions" element={authonly(<Expeditions />)} />
          <Route path="/tournees" element={authonly(<Tournees />)} />
          <Route path="/factures" element={authonly(<Factures />)} />
          <Route path="/tiers-compactes" element={<TiersCompactes />} />
          <Route path="/tiers-collectes" element={<TiersCollecte />} />
          <Route path="/login" element={notAuthOnly(<Login />)} />

          {/* Single page route */}

          <Route path="/collectes/:id" element={<CollecteDetails />} />
          <Route path="/employes/:id" element={<EmployeDetails />} />
          <Route path="/expeditions/:id" element={<ExpeditionDetails />} />

          {/* create page route */}
          <Route path="/create-employe" element={authonly(<CreateEmploye />)} />
          <Route
            path="/create-expedition"
            element={authonly(<CreateExpedition />)}
          />
          <Route
            path="/create-collecte"
            element={authonly(<CreateCollecte />)}
          />
          <Route
            path="/create-traitement"
            element={authonly(<CreateTraitement />)}
          />

          {/* update page */}
          <Route path="/update-employes/:id" element={<UpdateEmploye />} />
          <Route path="/update-collectes/:id" element={<UpdateCollecte />} />

          {/* Error page */}
          <Route path="/*" element={<Error />} />
        </Route>
      </Routes>
      {/* <ReactQueryDevtools initialIsOpen={true} /> */}
    </QueryClientProvider>
  );
}
