import React from 'react';

const Star = ({x, y, size}) => {
    return (
        <svg
            viewBox="0 0 24 24"
            width={size}
            height={size}
            style={{position: 'absolute', left: x, top: y}}
        >
            <polygon
                fill="#FFF"
                stroke="#FFF"
                strokeWidth="1"
                points="12,2 15.09,8.09 22,9.5 17,14.5 18.18,21.59 12,18.5 5.82,21.59 7,14.5 2,9.5 8.91,8.09 "
            />
        </svg>
    );
};

export default Star;
