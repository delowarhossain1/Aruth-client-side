import { useState } from 'react';

const useAccessToken = (user, userInfo = null) => {
    const [accessToken, setAccessToken] = useState('');

    // Get access token;
    function getAccessToken(){
        const email = user?.user?.email;

        // Get access token;
        const url = `http://localhost:5000/access-token?email=${email}`;
        fetch(url)
        .then(res => res.json())
        .then(token => {
            setAccessToken(token.token)

            // set access token in local storage
            localStorage.setItem('accessToken', token.token)
        });
    }

    if(user?.user){
        getAccessToken()
    };

    if(userInfo?.email && user?.user){
        const email = user?.user?.email;

        const url = `http://localhost:5000/register?email=${email}`;
        fetch(url, {
            method : "PUT",
            headers : {
                'content-type' : 'application/json'
            },
            body : JSON.stringify(userInfo)
        })
        .then(res => res.json())
        .then(data => console.log(data));        
    }

    return [accessToken]
};

export default useAccessToken;