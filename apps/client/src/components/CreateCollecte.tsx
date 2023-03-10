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
      <h1>CreateCollecte Page</h1>
    </div>
  );
}
