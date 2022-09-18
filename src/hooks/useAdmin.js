import { useEffect, useState } from 'react';

const useAdmin = (user) => {
    const [admin, setAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        if(user){
            const email = user?.email;

            fetch(`https://afternoon-cove-39130.herokuapp.com/is-admin/${email}`)
            .then(res => res.json())
            .then(adminInfo =>{
                setAdmin(adminInfo?.isAdmin);
                setLoading(false);
            })
        }
    }, [user]);


    return [admin, loading];
};

export default useAdmin;