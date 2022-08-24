import Swal from "sweetalert2";
import { toast } from "react-toastify";

const useAlert = () => {
  // Alert : 1
  const simpleAlert = (info) => {
    const { text = "Have a problem", symbol = "error", title = "error" } = info;

    Swal.fire(`${title}`, `${text}`, `${symbol}`);
  };

  // Alert : 2
  const successfulAlertWithAutoClose = (text, icon = "success") => {
    Swal.fire({
      position: "center",
      icon: `${icon}`,
      title: `${text}`,
      showConfirmButton: false,
      timer: 3000,
    });
  };

  // Alert : 3
  const deleteModal = (cb) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#fb5200",
      cancelButtonColor: "#3B82F6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Call the cb function
        cb();
      }
    });
  };


  /*--------------------------- Input box ---------------------------------*/ 
const inputBox1 = async({type= 'text', label="Input", placeholder ='Type here...'}) => {

  const { value } = await Swal.fire({
    title: `Enter your ${label}`,
    input: `${type}`,
    inputLabel: `${label}`,
    inputPlaceholder: `${placeholder}`,
    inputAttributes: {
      autocapitalize: 'off',
      autocorrect: 'off'
    }
  })

  return value;
}

  // Toast-1 : success toast
  function successToast(text = "🦄 Wow so easy!") {
    toast.success(`${text}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  return {
    simpleAlert,
    successfulAlertWithAutoClose,
    deleteModal,
    successToast,
    inputBox1,

  };
};

export default useAlert;
