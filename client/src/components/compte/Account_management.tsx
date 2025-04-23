import { useState } from "react";
import { useNavigate } from "react-router";

function Account_management({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();
  const ADMIN_LOGIN = import.meta.env.VITE_ADMIN_LOGIN;
  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

  // State pour gérer les inputs de manière robuste
  const [mailInput, setMailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  // Mets à jour le state des inputs mail / mdp
  const handleMailInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setMailInput(event.target.value);
  };

  const handlePasswordInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPasswordInput(event.target.value);
  };

  // --------------------------Fonction de création d'un nouveau compte utilisateur-------------------------------------------
  const createNewAccount = () => {
    const account = { mail: mailInput, password: passwordInput };

    // Sécurité au cas où aucun champs n'a été rempli
    if (mailInput === "" || passwordInput === "") {
      return;
    }

    const storedData = localStorage.getItem("users");

    // Si aucun utilisateur n'existe encore, crée un tableau contenant l'objet utilisateur
    if (storedData === null) {
      localStorage.setItem("users", JSON.stringify([account]));
    }

    // Si un ou plusieurs compte existent déja...
    else {
      const users = JSON.parse(storedData);

      // ...Vérifie que l'adresse mail n'est pas déja renseignée --- CHECKER LA CASSE AUSSI
      let isAlreadyExistant = false;

      for (const user of users) {
        if (user.mail === mailInput) {
          isAlreadyExistant = true;
        }
      }

      // Si oui, on annule la création de compte ---- MESSAGE ERREUR A FAIRE
      if (isAlreadyExistant) {
        return;
      }

      // Si non, on crée le nouveau compte
      users.push(account);
      localStorage.setItem("users", JSON.stringify(users));
      alert(
        `Votre compte a bien été crée - login: ${mailInput}, mot de passe: ${passwordInput}`,
      );
    }

    // Nettoie les inputs une fois le bouton cliqué
    setMailInput("");
    setPasswordInput("");
  };

  // --------------------------------Fonction de connexion au compte utilisateur--------------------------------------------
  const loginToAccount = () => {
    // Si c'est le compte administrateur
    if (mailInput === ADMIN_LOGIN && passwordInput === ADMIN_PASSWORD) {
      localStorage.setItem("currentUser", JSON.stringify("admin"));
      alert("Bienvenue administrateur !");

      // Passe à la page "administration" et ferme la modale
      navigate("/Administration");
      onClose();

      return;
    }

    const storedData = localStorage.getItem("users");

    // Si aucun utilisateur n'existe dans la base de donnée
    if (storedData === null) {
      alert("Aucun compte existant");
      return;
    }

    // Si un ou plusieurs compte existent déja...
    const users = JSON.parse(storedData);

    for (const user of users) {
      // Vérifie si les informations de connexion matchent

      if (user.mail === mailInput && user.password === passwordInput) {
        localStorage.setItem("currentUser", JSON.stringify(user));

        // Passe à la page "mon compte" et ferme la modale
        alert(`Bienvenue ${mailInput}`);
        navigate("/Compte");
        onClose();

        return;
      }
    }

    alert("Aucun compte trouvé - vérifiez votre login ou mot de passe");
  };

  // -----------------------------------Fonction déconnexion---------------------------------------------------------
  const logoutAccount = () => {
    const storedData = localStorage.getItem("currentUser");

    if (storedData != null) {
      localStorage.removeItem("currentUser");
    }

    alert("Bien déconnecté");
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-secondary text-center mb-8">
        Se connecter à mon compte
      </h2>

      <section className="flex flex-col mb-8">
        <section className="flex justify-between">
          <p>Adresse mail :</p>
          <input
            type="text"
            value={mailInput}
            onChange={handleMailInputChange}
            className="border-2 border-amber-950"
          />
        </section>

        <section className="flex justify-between">
          <p>Mot de passe :</p>
          <input
            type="text"
            value={passwordInput}
            onChange={handlePasswordInputChange}
            className="border-2 border-amber-950"
          />
        </section>
      </section>

      <button
        type="button"
        onClick={createNewAccount}
        className="border-2 border-amber-950"
      >
        Créer un nouveau compte
      </button>

      <button
        type="button"
        onClick={loginToAccount}
        className="border-2 border-amber-950"
      >
        Se connecter
      </button>

      <button
        type="button"
        onClick={() => localStorage.removeItem("users")}
        className="border-2 border-amber-950"
      >
        Supprimer la BDD utilisateur
      </button>

      <button
        type="button"
        onClick={logoutAccount}
        className="border-2 border-amber-950"
      >
        Déconnection
      </button>
    </>
  );
}

export default Account_management;
