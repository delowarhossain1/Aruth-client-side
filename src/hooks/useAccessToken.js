import { useState } from "react";

const useAccessToken = (user) => {
  const [accessToken, setAccessToken] = useState("");

  // Get access token;
  function getAccessToken() {
    const email = user?.user?.email;

    // Get access token;
    const url = `http://localhost:5000/access-token?email=${email}`;
    fetch(url)
      .then((res) => res.json())
      .then((token) => {
        setAccessToken(token.token);

        // set access token in local storage
        localStorage.setItem("accessToken", token.token);
      });
  }

  // Update database
  function updateDatabase() {
    const name = user?.user?.displayName || 'Your name here';
    const email = user?.user?.email;
    const img = user?.user?.photoURL || 'https://i.ibb.co/10JxYVW/user.png';

    const url = `http://localhost:5000/register?email=${email}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        img,
      }),
    })
  }


  if (user?.user) {
    getAccessToken();
    updateDatabase();
  }


  return [accessToken];
};

export default useAccessToken;
