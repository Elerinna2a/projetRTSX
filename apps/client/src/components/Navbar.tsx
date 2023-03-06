import { Flex, Spacer } from "@chakra-ui/react";
import Navlinks from "./Navlinks";

export default function Navbar() {
  return (
    <div>
      <Flex>
        <h1>Corstyrène, (utilisateur connecté)</h1>
        <Spacer />
        <Navlinks />
      </Flex>
    </div>
  );
}
