import { Button, Flex } from "@chakra-ui/react";
import { useStore } from "@nanostores/react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { employe, removeEmploye } from "../store/employe.store";

export default function Error() {
  const [cookies, , removeCookie] = useCookies(["sessionid"]);
  const navigate = useNavigate();
  const authedEmploye = useStore(employe);

  function onClickLogout() {
    axios
      .post("http://localhost:3000/auth/logout/", {
        sessionId: cookies.sessionid,
      })
      .then(() => {
        removeCookie("sessionid");
        removeEmploye();
        navigate("/login");
      })
      .catch((err) => {
        console.log("error" + err);
      });
  }
  return (
    <Flex
      alignItems={"center"}
      justifyContent={"center"}
      gap={4}
      flexDirection={"column"}
      height={"30vh"}
    >
      <p>Error 404 page not found...</p>
      {authedEmploye.email ? (
        <>
          <Link to="/">
            <Button>Home page</Button>
          </Link>
        </>
      ) : (
        <>
          <Link to="/">
            <Button onClick={onClickLogout}>Home Page</Button>
          </Link>
        </>
      )}
    </Flex>
  );
}
