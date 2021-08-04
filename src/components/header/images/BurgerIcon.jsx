import React from 'react';

export const BurgerIcon = ({ className, ...props }) => (
    <svg
        {...props}
        className={className}
        width="35"
        height="26"
        viewBox="0 0 35 26"
        xmlns="http://www.w3.org/2000/svg"
    >
        <line y1="1" x2="35" y2="1" strokeWidth="1.7" />
        <line y1="13" x2="35" y2="13" strokeWidth="1.7" />
        <line y1="25" x2="35" y2="25" strokeWidth="1.7" />
    </svg>
);
