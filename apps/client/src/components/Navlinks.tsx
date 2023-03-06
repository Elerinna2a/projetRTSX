import { Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Navlinks() {
  return (
    <div>
      <Flex gap={4}>
        <Link to="/">Home</Link>
        <Link to="/collecte">Collecte</Link>
        <Link to="/chauffeur">Chauffeur</Link>
      </Flex>
    </div>
  );
}
