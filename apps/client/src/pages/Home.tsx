import { Box, Flex, HStack, Spacer } from "@chakra-ui/react";
import { useStore } from "@nanostores/react";
import { employe } from "../store/employe.store";
import DebugCookies from "../utils/DebugCookie";
import Collecte from "./Collectes";
import Employes from "./Employes";
import Expeditions from "./Expeditions";
import Traitement from "./Traitement";

export default function Home() {
  const authedUser = useStore(employe);

  DebugCookies();

  return (
    <Flex justifyContent={"center"}>
      {authedUser.role === "ADMIN" && (
        <HStack>
          <Flex gap={4} alignItems={"center"} flexDirection={"column"}>
            <Flex gap={4}>
              <Collecte />
              <Spacer />
              <Expeditions />
            </Flex>
            <Flex>
              <Employes />
            </Flex>
          </Flex>
        </HStack>
      )}
      {authedUser.role === "CHAUFFEUR" && (
        <Box>
          <Flex
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={4}
            padding={4}
          >
            <Collecte />
          </Flex>
        </Box>
      )}
      {authedUser.role === "OPERATEUR" && (
        <Box>
          <Flex
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={4}
            padding={4}
          >
            <Traitement />
          </Flex>
        </Box>
      )}
    </Flex>
  );
}
