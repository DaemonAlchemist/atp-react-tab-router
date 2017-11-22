import React from 'react';
import {Link} from 'react-router-dom';

export default ({to, onClick, children}) =>
    <Link to={to} onClick={onClick}>
        {children}
    </Link>