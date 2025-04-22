import { useState } from "react";

function Account_management() {
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

  // Fonction de création d'un nouveau compte utilisateur
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
    }

    // Nettoie les inputs une fois le bouton cliqué
    setMailInput("");
    setPasswordInput("");
  };

  return (
    <>
      <p>Adresse mail :</p>
      <input type="text" value={mailInput} onChange={handleMailInputChange} />

      <p>Mot de passe :</p>
      <input
        type="text"
        value={passwordInput}
        onChange={handlePasswordInputChange}
      />

      <button type="button" onClick={createNewAccount}>
        Créer un nouvel utilisateur{" "}
      </button>
    </>
  );
}

export default Account_management;
