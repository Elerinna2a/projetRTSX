import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Employe } from "../store/employe.store";

export default function Employes() {
  const [employes, setEmployes] = useState<Employe[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [idToDelete, setIdToDelete] = useState<number | null>(null);
  const [idToTake, setIdToTake] = useState<number | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenSingleEmploye,
    onOpen: onOpenSingleEmploye,
    onClose: onCloseSingleEmploye,
  } = useDisclosure();
  const {
    isOpen: isOpenCreateEmploye,
    onOpen: onOpenCreateEmploye,
    onClose: onCloseCreateEmploye,
  } = useDisclosure();
  const navigate = useNavigate();
  // userREF
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const nomRef = useRef<HTMLInputElement | null>(null);
  const prenomRef = useRef<HTMLInputElement | null>(null);
  const adresseRef = useRef<HTMLInputElement | null>(null);
  const telRef = useRef<HTMLInputElement | null>(null);
  const roleRef = useRef<HTMLSelectElement | null>(null);

  const handleCreateEmploye = async () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const nom = nomRef.current?.value;
    const prenom = prenomRef.current?.value;
    const adresse = adresseRef.current?.value;
    const tel = telRef.current?.value;
    const role = roleRef.current?.value;
    try {
      const response = await axios.post("http://localhost:3000/employes", {
        email,
        password,
        nom,
        prenom,
        adresse,
        tel,
        role,
      });
      onCloseCreateEmploye();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/employes")
      .then((res) => setEmployes(res.data))
      .catch((err) =>
        setError(
          "Impssible d'acceder a cette page car vos droit ne le permettant pas"
        )
      );
  }, ["", handleCreateEmploye]);

  const handleDelete = (id: number | undefined) => {
    if (id) {
      setIdToDelete(id);
      onOpen();
    } else {
      console.log("id to delete is undefined");
    }
  };

  const confirmDelete = () => {
    if (idToDelete) {
      axios
        .delete(`http://localhost:3000/employes/${idToDelete}`)
        .then(() => {
          const updatedEmployes = employes.filter(
            (employe) => employe.id !== idToDelete
          );
          setEmployes(updatedEmployes);
          setIdToDelete(null);
          onClose();
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <div>
      <Flex flexDirection={"column"}>
        <Flex gap={3} mb={"10"} mr={"10"} alignItems="center">
          <Heading>Employés </Heading>
          <Button
            leftIcon={<AddIcon />}
            colorScheme={"teal"}
            onClick={onOpenCreateEmploye}
          >
            Créer un employé
          </Button>
        </Flex>
        <Flex flexWrap={"wrap"} gap={4}>
          {employes.length === 0 ? (
            <>
              <Text>Voulez vous en créer un ?</Text>
              <AddIcon />
            </>
          ) : (
            <>
              {employes.map((employe) => (
                <Flex key={employe.id} justifyContent={"center"}>
                  {employe.role === "ADMIN" ? (
                    ""
                  ) : (
                    <Flex>
                      <Flex
                        mb={"4"}
                        border={"1px solid teal"}
                        borderRadius={"xl"}
                        p={"4"}
                        boxShadow={"md"}
                      >
                        <Box>
                          <Heading size={"md"} mb={4}>
                            <Link to={`/employes/${employe.id}`}>
                              <Button> Employe N°{employe.id}</Button>
                            </Link>
                          </Heading>
                          <Box>
                            <Text>
                              {" "}
                              <strong> Nom </strong>: {employe.nom}{" "}
                            </Text>
                            <Text>
                              {" "}
                              <strong>Prénom </strong> : {employe.prenom}{" "}
                            </Text>
                            <Text>
                              {" "}
                              <strong>tel </strong> : {employe.tel}{" "}
                            </Text>
                            <Text>
                              {" "}
                              <strong> Role</strong> : {employe.role}{" "}
                            </Text>
                          </Box>
                        </Box>
                        <Flex gap={"4"} flexDirection="column">
                          <Link to={`/update-employes/${employe.id}`}>
                            <Button ml={6}>
                              <EditIcon color="teal" />
                            </Button>
                          </Link>
                          <Button
                            ml={6}
                            onClick={() => handleDelete(employe.id)}
                          >
                            <DeleteIcon color="crimson" />
                          </Button>
                        </Flex>
                      </Flex>
                    </Flex>
                  )}
                </Flex>
              ))}
            </>
          )}
        </Flex>
      </Flex>
      <Modal isOpen={isOpenCreateEmploye} onClose={onCloseCreateEmploye}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Création d'un employé</ModalHeader>
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input type="email" ref={emailRef} />
              <FormLabel>Password</FormLabel>
              <Input type="password" ref={passwordRef} />
              <FormLabel>Nom</FormLabel>
              <Input type="text" ref={nomRef} />
              <FormLabel>Prenom</FormLabel>
              <Input type="text" ref={prenomRef} />
              <FormLabel>Adresse</FormLabel>
              <Input type="text" ref={adresseRef} />
              <FormLabel>Telephone</FormLabel>
              <Input type="text" ref={telRef} />
              <FormLabel>Role</FormLabel>
              <Select placeholder="Selection du rôle" ref={roleRef}>
                <option value={"ADMIN"}>ADMIN</option>
                <option value={"CLIENT"}>CLIENT</option>
                <option value={"OPERATEUR"}>OPERATEUR</option>
                <option value={"CHAUFFEUR"}>CHAUFFEUR</option>
              </Select>
            </FormControl>
            <Button onClick={handleCreateEmploye}>Creer Employe</Button>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onCloseCreateEmploye}>
              Annuler
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmer la suppression</ModalHeader>
          <ModalBody>
            Êtes-vous sûr de vouloir supprimer cet employé ?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={confirmDelete}>
              Supprimer
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Annuler
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
