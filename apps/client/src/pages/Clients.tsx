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
  Spacer,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { TierCollecte } from "../store/tierCollecte.store";
import Error from "./Error";

export default function Clients() {
  const [cookies] = useCookies(["sessionid"]);
  const [clients, setClients] = useState<TierCollecte[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/clients", {
        headers: {
          sessionid: cookies.sessionid,
        },
      })
      .then((res) => setClients(res.data))
      .catch((err) =>
        setError(
          "Impssible d'acceder a cette page car vos droit ne le permettant pas"
        )
      );
  }, []);

  const f = new Intl.DateTimeFormat("fr-fr", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  if (error) {
    return <Error />;
  }

  return (
    <div>
      <Flex flexDirection={"column"} padding={4} borderRadius={4} ml={4}>
        {clients.map((client) => (
          <div key={client.id}>
            <Accordion allowMultiple>
              <AccordionItem>
                <AccordionButton>
                  <Box>Utilisateur n°{client.id}</Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>
                  <Flex>
                    <Flex flexDirection={"column"} justifyContent="center">
                      <p>Nom & prénom : {client.nom}</p>
                      <p>Adresse :{client.adresse}</p>
                      <p>Email : {client.contact_email}</p>
                      <p>Tel : {client.contact_num} </p>
                      <p>Type: {client.type_tier}</p>
                      <p>Score : {client.score_facilite_acces}</p>
                    </Flex>
                    <Spacer />
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
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </div>
        ))}
      </Flex>
    </div>
  );
}
