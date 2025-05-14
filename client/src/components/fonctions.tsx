import { toast } from "react-toastify";

interface itemsContenu {
  id: number;
  nom: string;
  description: string;
  prix: number;
  image_url: string;
}

interface Article {
  flower: itemsContenu;
  quantity: number;
}

interface Utilisateur {
  mail: string;
  password: string;
  panier: Article[];
}

// Renvoie l'objet user de la base de donnée, qui correspond à l'utilisateur actuel
export function getCurrentUserData() {
  const storedData = localStorage.getItem("users");
  if (storedData === null) {
    toast.error("Aucun compte existant");
    return;
  }

  const users: Utilisateur[] = JSON.parse(storedData);

  const userStoredData = sessionStorage.getItem("currentUser");
  if (userStoredData === null) {
    toast.error("veuillez vous connecter");
    return;
  }
  const userConnected = JSON.parse(userStoredData);
  const user = users.find((u: Utilisateur) => u.mail === userConnected.mail);

  return user;
}
