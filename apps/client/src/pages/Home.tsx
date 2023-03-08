import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { useStore } from "@nanostores/react";
import { user } from "../store/employe.store";

export default function Home() {
  const authedUser = useStore(user);
  return (
    <div>
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
              <Heading>Collecte</Heading>
              <Flex gap={4}>
                <Button>Modifier</Button>
                <Button>Créer</Button>
              </Flex>
            </Flex>
          </Box>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
