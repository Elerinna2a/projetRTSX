import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";
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
            mb={4}
          >
            <Heading>Collecte </Heading>
            <Flex gap={4}>
              <Button>Créer</Button>
            </Flex>
          </Flex>

          {collectes.length === 0 ? (
            <p>Aucun collecte à faire</p>
          ) : (
            <>
              {collectes.map((collecte) => (
                <>
                  <Flex mb={"4"} border={"1px solid gray"} p={"4"}>
                    <Flex alignItems={"center"} gap={4} justifyContent="center">
                      <Flex>
                        <Box>
                          <Heading size={"md"} mb={4}>
                            Collecte N°{collecte.idNumLot}
                          </Heading>
                          <Box>
                            <p>
                              {" "}
                              <strong>Date</strong> : {collecte.dateCollecte}{" "}
                            </p>
                            <p> Quantité : {collecte.quantite} KG</p>
                            <p> Forme :{collecte.formeCollecte}</p>
                            <p>
                              Collecte fait par l'ID : {collecte.employeId}{" "}
                            </p>
                          </Box>
                        </Box>
                      </Flex>
                      <Flex gap={"4"} flexDirection="column">
                        <Button ml={6}>
                          <EditIcon />
                        </Button>
                        <Button ml={6}>
                          <DeleteIcon />
                        </Button>
                      </Flex>
                    </Flex>
                  </Flex>
                </>
              ))}
            </>
          )}
        </Box>
      </Flex>
    </div>
  );
}
