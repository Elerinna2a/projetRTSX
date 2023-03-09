import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Heading,
  Spacer,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Collecte as Collectes } from "../store/collecte.store";

export default function Collecte() {
  const [cookies] = useCookies(["sessionid"]);
  const [collectes, setCollectes] = useState<Collectes[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/collectes")
      .then((res) => setCollectes(res.data))
      .catch((err) =>
        setError(
          "Impssible d'acceder a cette page car vos droit ne le permettant pas"
        )
      );
  }, []);

  const f = new Intl.DateTimeFormat("fr-fr", {
    dateStyle: "short",
    timeStyle: "short",
  });

  return (
    <div>
      <Flex>
        <Box>
          <Flex
            flexDirection={"column"}
            gap={3}
            justifyContent={"center"}
            alignItems="center"
            mb={4}
          >
            <Heading>Collecte</Heading>
            <Flex gap={4}>
              <Button>Créer</Button>
            </Flex>
          </Flex>
          <Heading size={"md"}>Collecte à faire</Heading>
          {collectes.length === 0 ? (
            <p>Aucun collecte à faire</p>
          ) : (
            <>
              {collectes.map((collecte) => (
                <Accordion allowMultiple>
                  <AccordionItem>
                    <AccordionButton display={"flex"}>
                      <Box>ID numéro de lot : {collecte.idNumLot}</Box>
                      <Spacer />
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel>
                      <Box>
                        <Flex flexDirection={"column"} justifyContent="center">
                          <Text>ID numéro de lot : {collecte.idNumLot}</Text>
                          <Text>ID collecte : {collecte.TierCollecteId}</Text>
                          <Text>
                            Quantite collecte : {collecte.quantite} kg
                          </Text>
                          <Text>
                            Forme de la collecte : {collecte.formeCollecte}
                          </Text>
                          <Text>
                            ID employé effectuant la collecte :{" "}
                            {collecte.employeId}
                          </Text>
                          {/* <Text>
                      Date de la collecte :{" "}
                      {f.format(new Date(collecte.dateCollecte))}{" "}
                    </Text> */}
                          <Flex
                            alignItems={"center"}
                            flexDirection={"column"}
                            gap={4}
                            justifyContent="center"
                          >
                            <Button ml={6}>
                              <EditIcon />
                            </Button>
                            <Button ml={6}>
                              <DeleteIcon />
                            </Button>
                          </Flex>
                        </Flex>
                        <Spacer />
                      </Box>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              ))}
            </>
          )}
        </Box>
      </Flex>
    </div>
  );
}
