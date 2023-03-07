import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export function useAuth() {
  const navigate = useNavigate();
  const [cookies] = useCookies(["sessionid"]);

  useEffect(() => {
    if (!cookies.sessionid) {
      navigate("/login");
    }
  }, []);
}
