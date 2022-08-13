import Swal from "sweetalert2";

const useAlert = () => {

  const simpleAlert = (info) => {
    const { text = "Have a problem", symbol = "error", title = "error" } = info;

    Swal.fire(`${title}`, `${text}`, `${symbol}`);
  };

  
  const successfulAlertWithAutoClose = (text, icon = 'success') => {
    Swal.fire({
        position: "center",
        icon: `${icon}`,
        title: `${text}`,
        showConfirmButton: false,
        timer: 3000,
      });
  }

  return { simpleAlert, successfulAlertWithAutoClose };
};

export default useAlert;
