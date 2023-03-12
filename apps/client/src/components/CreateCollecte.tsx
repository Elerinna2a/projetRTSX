import { Button, Heading, Input, VStack } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { createCollecte } from "../utils/collecte.fetcher";

export default function CreateCollecte() {
  const navigate = useNavigate();
  const createCollecteMutation = useMutation(createCollecte, {
    onSuccess: ({ idNumLot }) => {
      queryClient.refetchQueries(["collectes"]);
      if (idNumLot?.current?.value) idNumLot.current.value = "";
    },
    onError: () => {
      console.log("Error fetching queries");
    },
  });

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
