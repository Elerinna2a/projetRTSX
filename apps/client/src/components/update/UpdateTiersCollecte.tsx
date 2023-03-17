import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Spacer,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Employes from "../../pages/Employes";
import { TierCollecte } from "../../store/tierCollecte.store";

export default function UpdateTiersCollecte({}) {
  const navigate = useNavigate();
  const { id } = useParams();

  const [tiersCollecte, setTiersCollecte] = useState<TierCollecte>();

  const nomRef = useRef<HTMLInputElement | null>(null);
  const adresseRef = useRef<HTMLInputElement | null>(null);
  const typeEntrepriseRef = useRef<HTMLInputElement | null>(null);
  const scoringFaciliteRef = useRef<HTMLSelectElement | null>(null);
  const nomContactRef = useRef<HTMLInputElement | null>(null);
  const telRef = useRef<HTMLInputElement | null>(null);
  const mailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const collectesRef = useRef<HTMLInputElement | null>(null);
  const factureRef = useRef<HTMLInputElement | null>(null);

  const handleUpdateTiersCollecte = async () => {
    const nom = nomRef.current?.value;
    const adresse = adresseRef.current?.value;
    const typeEntreprise = typeEntrepriseRef.current?.value;
    const scoringFacilite = scoringFaciliteRef.current?.value;
    const nomContact = nomContactRef.current?.value;
    const tel = telRef.current?.value;
    const mail = mailRef.current?.value;
    const password = passwordRef.current?.value;
    const collectes = collectesRef.current?.value;
    const facture = factureRef.current?.value;

    try {
      const response = await axios.put(
        `http://localhost:3000/tierscollectes/${id}`,
        {
          nom,
          adresse,
          typeEntreprise,
          scoringFacilite,
          nomContact,
          tel,
          mail,
          password,
          collectes,
          facture,
        }
      );
      navigate("/factures");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getTierCollecte = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/tierscollectes/${id}`
        );
        setTiersCollecte(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getTierCollecte();
  }, [id]);

  return (
    <div>
      <Flex gap={4} flexDirection={"column"}>
        <Flex width={"30%"} m={"auto"} flexDirection={"column"} gap={3}>
          <Heading>Créer un tiers Collecte:</Heading>
          <FormControl isRequired>
            <FormLabel>Nom</FormLabel>
            <Input type="text" defaultValue={tiersCollecte?.nom} ref={nomRef} />
            <FormLabel>Adresse</FormLabel>
            <Input
              type="text"
              defaultValue={tiersCollecte?.adresse}
              ref={adresseRef}
            />
            <FormLabel>Type de tiers</FormLabel>
            <Input
              type="text"
              defaultValue={tiersCollecte?.typeEntreprise}
              ref={typeEntrepriseRef}
            />
            <FormLabel>Scoring facilité</FormLabel>
            <Select
              ref={scoringFaciliteRef}
              defaultValue={tiersCollecte?.scoringFacilite}
            >
              <option value="UN">UN</option>
              <option value="DEUX">DEUX</option>
              <option value="TROIS">TROIS</option>
            </Select>
            <FormLabel>Nom du contact</FormLabel>
            <Input
              ref={nomContactRef}
              defaultValue={tiersCollecte?.nomContact}
              type="text"
            />
            <FormLabel>Tel du contact</FormLabel>
            <Input type="tel" defaultValue={tiersCollecte?.tel} ref={telRef} />
            <FormLabel>E-Mail</FormLabel>
            <Input
              type="email"
              defaultValue={tiersCollecte?.mail}
              ref={mailRef}
            />
            <FormLabel>Password</FormLabel>
            <Input
              ref={passwordRef}
              defaultValue={tiersCollecte?.password}
              type="password"
            />
          </FormControl>
          {/* <FormControl>
            <FormLabel>Facture n°</FormLabel>
            <Input
              type="number"
              defaultValue={tiersCollecte?.factures?.connect[0].idFacture}
              ref={factureRef}
            />
            <FormLabel>Collectes n°</FormLabel>
            <Input
              type="number"
              defaultValue={tiersCollecte?.collectes?.connect[0].idCollecte}
              ref={collectesRef}
            />
          </FormControl> */}
          <Button onClick={() => handleUpdateTiersCollecte()}>Valider</Button>
        </Flex>
        <Spacer />
        <Flex flexDirection={"column"}>
          <Employes />
        </Flex>
      </Flex>
    </div>
  );
}
