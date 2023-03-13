import { useStore } from "@nanostores/react";
import axios from "axios";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { employe, setEmploye } from "../store/employe.store";

export function useAuth() {
  const [cookies] = useCookies(["sessionid"]);
  const authedUser = useStore(employe);
  const navigate = useNavigate();

  useEffect(() => {
    if (!cookies.sessionid) {
      navigate("/login");
    }
    if (!authedUser?.email && cookies.sessionid) {
      axios
        .post("http://localhost:3000/auth/get-employe-infos", {
          sessionId: cookies.sessionid,
        })
        .then((res) => setEmploye(res.data.employe));
    }
  }, [authedUser?.email, cookies.sessionid]);

  // // Vérifier que authedUser est défini et a une propriété "role" avant de retourner les informations de l'utilisateur.
  // if (!authedUser || !authedUser.role) {
  //   return null;
  // }

  // return {
  //   isAuthenticated: !!authedUser.email,
  //   role: authedUser.role,
  // };
}

// import { useEffect } from "react";
// import { useCookies } from "react-cookie";
// import { useNavigate } from "react-router-dom";

// export function useAuth() {
//   const navigate = useNavigate();
//   const [cookies] = useCookies(["sessionid"]);

//   useEffect(() => {
//     if (!cookies.sessionid) {
//       navigate("/login");
//     }
//   }, []);
// }
