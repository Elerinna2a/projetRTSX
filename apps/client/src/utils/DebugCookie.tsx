import { useEffect } from "react";
import { useCookies } from "react-cookie";

export default function DebugCookies() {
  const [cookies, setCookie] = useCookies(["sessionid"]);

  useEffect(() => {
    console.log(cookies); // Affiche le contenu du cookie dans la console du navigateur
  }, [cookies]);

  return null; // Ce composant ne rend rien à l'écran
}
