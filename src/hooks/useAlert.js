import Swal from 'sweetalert2';

const useAlert = () => {
    
    const simpleAlert = (info) => {
        const {text ='Have a problem', symbol='error', title = 'error' } = info;

        Swal.fire(
            `${title}`,
            `${text}`,
            `${symbol}`
        )
    }



    return {simpleAlert};
};

export default useAlert;