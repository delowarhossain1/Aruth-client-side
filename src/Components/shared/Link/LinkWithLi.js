import React from 'react';
import { Link } from 'react-router-dom';

const LinkWithLi = ({menu, styles = ''}) => {
    const {link, text} = menu;
    
    return (
        <li>
            <Link to={link} className={`${styles}`}>{text}</Link>
        </li>
    );
};

export default LinkWithLi;