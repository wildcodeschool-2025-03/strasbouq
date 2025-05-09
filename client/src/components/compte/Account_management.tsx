import { useState } from "react";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  // Vérification de si l'input est érellement une adresse mail
  const isValidEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // --------------------------Fonction de création d'un nouveau compte utilisateur-------------------------------------------
  const createNewAccount = () => {
    const account = { mail: mailInput, password: passwordInput };

    // Sécurité au cas où aucun champs n'a été rempli
    if (mailInput === "" || passwordInput === "") {
      toast.error("Veuillez renseigner tous les champs");
      return;
    }

    if (!isValidEmail(mailInput)) {
      toast.error("Veuillez renseigner une adresse mail valide");
      return;
    }

    const storedData = localStorage.getItem("users");

    // Si aucun utilisateur n'existe encore, crée un tableau contenant l'objet utilisateur
    if (storedData === null) {
      localStorage.setItem("users", JSON.stringify([account]));
      toast.success(`${mailInput}, votre compte a bien été crée !`);
    }

    // Si un ou plusieurs compte existent déja...
    else {
      const users = JSON.parse(storedData);

      // ...Vérifie que l'adresse mail n'est pas déja renseignée --- CHECKER LA CASSE AUSSI
      let isAlreadyExistant = false;

      for (const user of users) {
        if (user.mail === mailInput || mailInput === ADMIN_LOGIN) {
          isAlreadyExistant = true;
        }
      }

      // Si oui, on annule la création de compte ---- MESSAGE ERREUR A FAIRE
      if (isAlreadyExistant) {
        toast.error("Ce mail est déja utilisé !");
        return;
      }

      // Si non, on crée le nouveau compte
      users.push(account);
      localStorage.setItem("users", JSON.stringify(users));
      toast.success(`${mailInput}, votre compte a bien été crée !`);
    }

    // Nettoie les inputs une fois le bouton cliqué
    setMailInput("");
    setPasswordInput("");
  };

  // --------------------------------Fonction de connexion au compte utilisateur--------------------------------------------
  const loginToAccount = () => {
    // Si le login n'est pas une adresse mail
    if (mailInput !== ADMIN_LOGIN && !isValidEmail(mailInput)) {
      toast.error("Veuillez renseigner une adresse mail valide");
      return;
    }

    // Si c'est le compte administrateur
    if (mailInput === ADMIN_LOGIN && passwordInput === ADMIN_PASSWORD) {
      sessionStorage.setItem("currentUser", JSON.stringify("admin"));
      navigate(0);
      onClose();
      return;
    }

    const storedData = localStorage.getItem("users");

    // Si aucun utilisateur n'existe dans la base de donnée
    if (storedData === null) {
      toast.error("Aucun compte existant");
      return;
    }

    // Si un ou plusieurs compte existent déja...
    const users = JSON.parse(storedData);

    for (const user of users) {
      // Vérifie si les informations de connexion matchent

      if (user.mail === mailInput && user.password === passwordInput) {
        sessionStorage.setItem("currentUser", JSON.stringify(user));
        navigate(0);
        onClose();

        return;
      }
    }

    alert("Aucun compte trouvé - vérifiez votre login ou mot de passe");
  };

  // -----------------------------------Fonction déconnexion---------------------------------------------------------
  return (
    <>
      <h2 className="text-2xl font-bold text-secondary text-center mb-8">
        Accéder à mon compte
      </h2>

      <section className="flex flex-col mb-8">
        <section className="flex justify-between mb-2">
          <p>Adresse mail :</p>
          <input
            type="email"
            value={mailInput}
            onChange={handleMailInputChange}
            className="border-2 border-black text-secondary text-center w-6/10"
            placeholder="exemple@mail.com"
          />
        </section>

        <section className="flex justify-between">
          <p>Mot de passe :</p>
          <input
            type="text"
            value={passwordInput}
            onChange={handlePasswordInputChange}
            className="border-2 border-black text-secondary text-center w-6/10"
            placeholder="Mon-mot-de-passe"
          />
        </section>
      </section>

      <section className="flex justify-center">
        <button
          type="button"
          onClick={createNewAccount}
          className="bg-secondary text-black w-40 rounded-full mr-8"
        >
          Créer compte
        </button>

        <button
          type="button"
          onClick={loginToAccount}
          className="bg-secondary text-black w-40 rounded-full"
        >
          Se connecter
        </button>

        <ToastContainer position="top-right" autoClose={3000} />
      </section>
    </>
  );
}

export default Account_management;
