import Swal from "sweetalert2";

const useAlert = () => {

  // Alert : 1  
  const simpleAlert = (info) => {
    const { text = "Have a problem", symbol = "error", title = "error" } = info;

    Swal.fire(`${title}`, `${text}`, `${symbol}`);
  };

  // Alert : 2
  const successfulAlertWithAutoClose = (text, icon = 'success') => {
    Swal.fire({
        position: "center",
        icon: `${icon}`,
        title: `${text}`,
        showConfirmButton: false,
        timer: 3000,
      });
  }

  // Alert : 3
  const deleteModal = (cb, ) =>{
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#fb5200',
      cancelButtonColor: '#3B82F6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }

  return { simpleAlert, successfulAlertWithAutoClose };
};

export default useAlert;
