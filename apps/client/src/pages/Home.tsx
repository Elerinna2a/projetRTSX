import { Box, Flex, HStack } from "@chakra-ui/react";
import { useStore } from "@nanostores/react";
import Collecte from "../components/Collecte";
import Traitement from "../components/Traitement";
import { employe } from "../store/employe.store";
import DebugCookies from "../utils/DebugCookie";

export default function Home() {
  const authedUser = useStore(employe);

  DebugCookies();

  return (
    <div>
      {authedUser.role === "ADMIN" && (
        <HStack>
          <Flex gap={4}>
            <Collecte />
            <Traitement />
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
