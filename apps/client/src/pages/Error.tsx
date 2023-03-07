import { Button, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Error() {
  return (
    <Flex
      alignItems={"center"}
      justifyContent={"center"}
      gap={4}
      flexDirection={"column"}
      height={"30vh"}
    >
      <p>Error 404 page not found...</p>
      <Button>
        <Link to="/">Home Page</Link>
      </Button>
    </Flex>
  );
}
