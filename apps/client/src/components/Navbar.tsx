import { Box, Button, Flex, Spacer, useColorMode } from "@chakra-ui/react";
import { useStore } from "@nanostores/react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { removeUser, user } from "../store/users.store";

export default function Navbar() {
  const [cookies, , removeCookie] = useCookies(["sessionid"]);
  const authedUser = useStore(user);
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();

  function onClickLogout() {
    axios
      .post("http://localhost:3000/auth/logout/", {
        sessionId: cookies.sessionid,
      })
      .then(() => {
        removeCookie("sessionid");
        removeUser();
        navigate("/login");
      })
      .catch((err) => {
        console.log("error" + err);
      });
  }

  return (
    <Flex padding={4}>
      <Box>
        <img src="/logo.png" alt="logo" width="200" height="200" />
        {authedUser?.email ? (
          <>
            {" "}
            Bonjour, {authedUser.nom} {authedUser.prenom}
          </>
        ) : (
          <></>
        )}
      </Box>
      <Spacer />
      <Flex gap={4} fontSize={"20px"}>
        {authedUser?.role === "ADMIN" ? (
          <>
            <Button>
              <Link to="/">Home</Link>
            </Button>
            <Button>
              <Link to="/collecte">Collecte</Link>
            </Button>
            {authedUser?.email ? (
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
            {authedUser?.email ? (
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
