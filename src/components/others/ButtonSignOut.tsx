import firebase from "firebase/app";
import "firebase/auth";

export const ButtonSignOut = () => {
  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("Usuário desconectado");
      })
      .catch((error) => {
        console.error("Erro ao desconectar usuário:", error);
      });
  };

  return (
    <button className="flex items-center" onClick={handleLogout}>
      <lord-icon
        src="https://cdn.lordicon.com/moscwhoj.json"
        trigger="hover"
        colors="primary:#ffffff,secondary:#ffffff"
        style={{width:"32px", height:"32px"}}
      />
    </button>
  );
};
