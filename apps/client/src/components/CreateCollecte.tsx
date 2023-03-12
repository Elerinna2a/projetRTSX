import { Button, Heading, Input, VStack } from "@chakra-ui/react";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

export default function CreateCollecte() {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  return (
    <div>
      <VStack width={"30%"} m={"auto"}>
        <Heading>Creer une collecte:</Heading>
        <Input placeholder="Quantité" />
        <Input placeholder="Nom du tiers" />
        <Input placeholder="Forme de la collecte" />
        <Input placeholder="EmployeId" />
        <Button onClick={() => navigate("/")}>Valider</Button>
      </VStack>
    </div>
  );
}
