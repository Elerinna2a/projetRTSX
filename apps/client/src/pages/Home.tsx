import { Box, Flex, HStack } from "@chakra-ui/react";
import { useStore } from "@nanostores/react";
import { employe } from "../store/employe.store";
import DebugCookies from "../utils/DebugCookie";
import Collecte from "./Collectes";
import Expeditions from "./Expeditions";
import Traitement from "./Traitement";

export default function Home() {
  const authedUser = useStore(employe);

  DebugCookies();

  return (
    <div>
      {authedUser.role === "ADMIN" && (
        <HStack>
          <Flex gap={4} flexWrap={"wrap"}>
            <Collecte />
            <Traitement />
            <Expeditions />
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
    </div>
  );
}
