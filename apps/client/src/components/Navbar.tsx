import { Box, Button, Flex, Spacer, useColorMode } from "@chakra-ui/react";
import { useStore } from "@nanostores/react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { employe, removeEmploye } from "../store/employe.store";

export default function Navbar() {
  const [cookies, setCookies, removeCookie] = useCookies(["sessionid"]);
  const authedEmploye = useStore(employe);
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();

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

  // function deleteAllSessions() {
  //   axios
  //     .post("http://localhost:3000/auth/deleteAllSessions")
  //     .then(() => {
  //       console.log("All sessions deleted successfully");
  //     })
  //     .catch((err) => {
  //       console.log("Error deleting sessions: " + err);
  //     });
  // }

  return (
    <Flex padding={4}>
      <Box>
        <img src="/logo.png" alt="logo" width="200" height="200" />
        {authedEmploye?.email ? (
          <>
            {" "}
            Bonjour, {authedEmploye.nom} {authedEmploye.prenom}
          </>
        ) : (
          <></>
        )}
      </Box>
      <Spacer />
      <Flex gap={4} fontSize={"20px"}>
        {authedEmploye?.role === "ADMIN" ? (
          <>
            <Button>
              <Link to="/">Home</Link>
            </Button>
            <Button>
              <Link to="/tiers-collecte">Tiers Collecte</Link>
            </Button>
            {authedEmploye?.email ? (
              <>
                <Button onClick={onClickLogout}>
                  <Link to="/login">Déconnexion</Link>
                </Button>
              </>
            ) : (
              <>
                <Button>
                  <Link to="/login">Login</Link>
                </Button>
              </>
            )}
          </>
        ) : (
          <>
            {authedEmploye?.email ? (
              <Button onClick={onClickLogout}>
                <Link to="/login">Déconnexion</Link>
              </Button>
            ) : (
              <Button>
                <Link to="/login">Login</Link>
              </Button>
            )}
          </>
        )}
        <Button onClick={toggleColorMode}>
          {colorMode === "light" ? "🌙" : "☀️"}
        </Button>
      </Flex>
    </Flex>
  );
}
