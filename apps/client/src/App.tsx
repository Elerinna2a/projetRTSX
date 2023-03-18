import { useStore } from "@nanostores/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes } from "react-router-dom";
import CollecteDetails from "./components/details/CollecteDetails";
import EmployeDetails from "./components/details/EmployeDetails";
import ExpeditionDetails from "./components/details/ExpeditionDetails";
import TourneeDetails from "./components/details/TourneeDetails";
import TraitementDetails from "./components/details/TraitementDetails";
import UpdateCollecte from "./components/update/UpdateCollecte";
import UpdateEmploye from "./components/update/UpdateEmploye";
import UpdateExpedition from "./components/update/UpdateExpedition";
import UpdateFacture from "./components/update/UpdateFacture";
import UpdateTiersTiersCollecte from "./components/update/UpdateTiersCollecte";
import UpdateTournee from "./components/update/UpdateTournee";
import UpdateTraitement from "./components/update/UpdateTraitement";
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
import Traitement from "./pages/Traitement";
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
          <Route
            path="/tiers-compactes"
            element={authonly(<TiersCompactes />)}
          />
          <Route
            path="/tiers-collectes"
            element={authonly(<TiersCollecte />)}
          />
          <Route path="/login" element={notAuthOnly(<Login />)} />
          <Route path="/traitements" element={authonly(<Traitement />)} />

          {/* Single page route */}
          <Route
            path="/collectes/:id"
            element={authonly(<CollecteDetails />)}
          />
          <Route path="/employes/:id" element={authonly(<EmployeDetails />)} />
          <Route
            path="/expeditions/:id"
            element={authonly(<ExpeditionDetails />)}
          />
          <Route path="/traitements/:id" element={<TraitementDetails />} />
          <Route path="/tournees/:id" element={<TourneeDetails />} />

          {/* update page */}
          <Route path="/update-employes/:id" element={<UpdateEmploye />} />
          <Route path="/update-collectes/:id" element={<UpdateCollecte />} />
          <Route path="/update-tournees/:id" element={<UpdateTournee />} />
          <Route
            path="/update-traitements/:id"
            element={<UpdateTraitement />}
          />
          <Route path="/update-expedition/:id" element={<UpdateExpedition />} />
          <Route path="/update-facture/:id" element={<UpdateFacture />} />
          <Route
            path="/update-tierscollecte/:id"
            element={<UpdateTiersTiersCollecte />}
          />

          {/* Error page */}
          <Route path="/*" element={<Error />} />
        </Route>
      </Routes>
      {/* <ReactQueryDevtools initialIsOpen={true} /> */}
    </QueryClientProvider>
  );
}
