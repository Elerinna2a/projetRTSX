import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Employe {
  id: number;
  email: string;
  password: string;
  nom: string;
  prenom: string;
  adresse: string;
  tel: string;
  role: string;
}

export default function UpdateEmploye() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [employe, setEmploye] = useState<Employe>();

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const nomRef = useRef<HTMLInputElement | null>(null);
  const prenomRef = useRef<HTMLInputElement | null>(null);
  const adresseRef = useRef<HTMLInputElement | null>(null);
  const telRef = useRef<HTMLInputElement | null>(null);
  const roleRef = useRef<HTMLSelectElement | null>(null);

  const handleUpdateEmploye = async () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const nom = nomRef.current?.value;
    const prenom = prenomRef.current?.value;
    const adresse = adresseRef.current?.value;
    const tel = telRef.current?.value;
    const role = roleRef.current?.value;
    try {
      const response = await axios.put(`http://localhost:3000/employes/${id}`, {
        email,
        password,
        nom,
        prenom,
        adresse,
        tel,
        role,
      });
      if (response.status === 200) {
        navigate("/employes");
      }
      return;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getEmploye = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/employes/${id}`
        );
        setEmploye(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getEmploye();
  }, [id]);

  return (
    <div>
      <VStack width={"30%"} m={"auto"}>
        <Heading>Modifier un Employe:</Heading>
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
        <Button onClick={handleUpdateEmploye}>Modifier Employe</Button>
      </VStack>
    </div>
  );
}
