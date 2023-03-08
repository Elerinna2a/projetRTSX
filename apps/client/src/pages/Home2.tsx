import { Box, Flex, Heading } from "@chakra-ui/react";
import { useStore } from "@nanostores/react";
import { user } from "../store/employe.store";
import Clients from "./Clients";
import Collecte from "./Collecte";
import Driver from "./Driver";
import Users from "./Users";

export default function Home() {
  const authedUser = useStore(user);
  return (
    <div>
      {authedUser.role === "ADMIN" ? (
        <>
          <Box padding={4}>
            <Box padding={4}>
              <Heading>Informations</Heading>
            </Box>
            <Flex padding={4}>
              <Box>
                <Heading size={"md"}>Utilisateur</Heading>
                <Users />
              </Box>
              <Box>
                <Heading size={"md"}>Clients</Heading>
                <Clients />
              </Box>
              <Box>
                <Heading size={"md"}>Chauffeur</Heading>
                <Driver />
              </Box>
            </Flex>
            <Box>
              <Collecte />
            </Box>
          </Box>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
