import React from 'react';
import taka from "../../../Images/icon/taka.png";

const Taka = ({className = 'w-5'}) => {
    return <img src={taka} alt="taka" className={`inline-block ${className}`} />
};

export default Taka;