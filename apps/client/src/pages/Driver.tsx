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
import { Employe } from "../store/employe.store";
import Error from "./Error";

export default function Driver() {
  const [cookies] = useCookies(["sessionid"]);
  const [users, setUsers] = useState<Employe[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/users", {
        headers: {
          sessionid: cookies.sessionid,
        },
      })
      .then((res) => setUsers(res.data))
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
        {users.map((user) => (
          <div key={user.id}>
            {user.role === "DRIVER" ? (
              <Accordion allowMultiple>
                <AccordionItem>
                  <AccordionButton>
                    <Box>Utilisateur n°{user.id}</Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel>
                    <Flex>
                      <Flex flexDirection={"column"} justifyContent="center">
                        <p>
                          Nom & prénom : {user.nom} {user.prenom}
                        </p>
                        <p>Adresse :{user.adress}</p>
                        <p>Email : {user.email}</p>
                        <p>Tel : {user.tel} </p>
                        <p>Son role est : {user.role}</p>
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
            ) : (
              ""
            )}
          </div>
        ))}
      </Flex>
    </div>
  );
}
