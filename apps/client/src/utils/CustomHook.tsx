import { useStore } from "@nanostores/react";
import axios from "axios";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { employe, setEmploye } from "../store/employe.store";

// export function useAuth() {
//   const [cookies] = useCookies(["sessionid"]);
//   const authedUser = useStore(employe);

//   useEffect(() => {
//     if (!authedUser?.email && cookies.sessionid) {
//       axios
//         .post("http://localhost:3000/auth/get-employe-infos", {
//           sessionId: cookies.sessionid,
//         })
//         .then((res) => setEmploye(res.data.employe));
//     }
//   }, [authedUser?.email, cookies.sessionid]);
// }

export function useAuth() {
  const [cookies] = useCookies(["sessionid"]);
  const authedUser = useStore(employe);

  useEffect(() => {
    if (!authedUser?.email && cookies.sessionid) {
      axios
        .post("http://localhost:3000/auth/get-employe-infos", {
          sessionId: cookies.sessionid,
        })
        .then((res) => {
          setEmploye(res.data.employe);
          console.log(res.data.employe);
        });
    }
  }, [authedUser?.email, cookies.sessionid]);
}
