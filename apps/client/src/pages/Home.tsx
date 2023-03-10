import { Box, Flex, Spacer } from "@chakra-ui/react";
import { useStore } from "@nanostores/react";
import Collecte from "../components/Collecte";
import Traitement from "../components/Traitement";
import { employe } from "../store/employe.store";

export default function Home() {
  const authedUser = useStore(employe);
  return (
    <div>
      <>
        {authedUser.role === "ADMIN" ? (
          <>
            <Box>
              <Flex gap={4} padding={4}>
                <Collecte />
                <Spacer />
                <Traitement />
              </Flex>
            </Box>
          </>
        ) : (
          ""
        )}
        {authedUser.role === "CHAUFFEUR" ? (
          <>
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
          </>
        ) : (
          ""
        )}
        {authedUser.role === "OPERATEUR" ? (
          <>
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
          </>
        ) : (
          ""
        )}
      </>
    </div>
  );
}
