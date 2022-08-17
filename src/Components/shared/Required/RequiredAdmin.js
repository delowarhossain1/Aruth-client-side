import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import Loading from '../Loading/Loading';
import useAdmin from './../../../hooks/useAdmin';
import {signOut} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const RequiredAdmin = ({children}) => {
    const [user, userLoading] = useAuthState(auth);
    const [admin, adminLoading] = useAdmin(user);
    const navigate = useNavigate();

    if(userLoading || adminLoading){
        return <Loading />
    }

    if(! admin){
        signOut(auth);
        navigate('/login');
    }

    return children;
};

export default RequiredAdmin;