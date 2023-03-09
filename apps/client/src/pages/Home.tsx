import { Box, Flex } from "@chakra-ui/react";
import { useStore } from "@nanostores/react";
import { employe } from "../store/employe.store";
import Collecte from "./Collecte";

export default function Home() {
  const authedUser = useStore(employe);
  return (
    <div>
      <>
        {authedUser.role === "ADMIN" ? (
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
      </>
    </div>
  );
}
