import { useStore } from "@nanostores/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes } from "react-router-dom";
import CreateCollecte from "./components/create/CreateCollecte";
import CreateEmploye from "./components/create/CreateEmploye";
import CreateExpedition from "./components/create/CreateExpedition";
import CreateTraitement from "./components/create/CreateTraitement";
import CollecteDetails from "./components/details/CollecteDetails";
import EmployeDetails from "./components/details/EmployeDetails";
import Mainlayout from "./layouts/MainLayout";
import Collecte from "./pages/Collectes";
import Employes from "./pages/Employes";
import Error from "./pages/Error";
import Expeditions from "./pages/Expeditions";
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
          {/*  page  route*/}
          <Route index element={<Home />} />
          <Route path="/collecte" element={authonly(<Collecte />)} />
          <Route path="/employes" element={authonly(<Employes />)} />
          <Route path="/expeditions" element={authonly(<Expeditions />)} />
          <Route path="/tiers-collecte" element={<TiersCollecte />} />
          <Route path="/login" element={notAuthOnly(<Login />)} />

          {/* Single page route */}

          <Route path="/collecte/:id" element={<CollecteDetails />} />
          <Route path="/employes/:id" element={<EmployeDetails />} />

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

          {/* Error page */}
          <Route path="/*" element={<Error />} />
        </Route>
      </Routes>
      {/* <ReactQueryDevtools initialIsOpen={true} /> */}
    </QueryClientProvider>
  );
}
