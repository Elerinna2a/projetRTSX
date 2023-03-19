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

  return (
    <Flex
      padding={4}
      mb={"16"}
      alignItems="center"
      justifyContent="center"
      gap={4}
      boxShadow={"xl"}
      flexDirection={"column"}
    >
      <Box>
        <img src="/logo.png" alt="logo" width="200" height="200" />

        <Flex alignItems={"center"} justifyContent="center">
          <Box mr={4}>
            {authedEmploye?.email ? (
              <>
                {" "}
                Bonjour, {authedEmploye.nom} {authedEmploye.prenom}
              </>
            ) : (
              <></>
            )}
          </Box>
        </Flex>
      </Box>
      <Spacer />
      <Flex
        gap={4}
        fontSize={"20px"}
        flexWrap={"wrap"}
        alignItems="center"
        justifyContent="center"
      >
        {authedEmploye?.role === "ADMIN" ? (
          <>
            <Link to="/">
              <Button>Home</Button>
            </Link>
            <Link to="/collectes">
              <Button>Collecte</Button>
            </Link>
            <Link to="/employes">
              <Button>Employes</Button>
            </Link>
            <Link to="/tournees">
              <Button>Tournees</Button>
            </Link>
            <Link to="/traitements">
              <Button>Traitements</Button>
            </Link>
            <Link to="/expeditions">
              <Button>Expéditions</Button>
            </Link>
            <Link to="/factures">
              <Button>Factures</Button>
            </Link>
            <Link to="/tiers-collectes">
              <Button>Tiers Collecte</Button>
            </Link>
            <Link to="/tiers-compactes">
              <Button>Tiers Compacte</Button>
            </Link>
          </>
        ) : (
          <></>
        )}
      </Flex>
    </Flex>
  );
}
