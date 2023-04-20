import React, {useState, useEffect} from 'react';
import Star from './Star';

const StarField = ({width, height, count}) => {
    const [stars, setStars] = useState([]);

    useEffect(() => {
        const newStars = [];
        for (let i = 0; i < count; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const size = Math.random() * 3 + 1;
            newStars.push({x, y, size});
        }
        setStars(newStars);
    }, [count, height, width]);

    return (
        <div style={{position: 'relative', width, height}}>
            {stars.map((star, i) => (
                <Star key={i} {...star} />
            ))}
        </div>
    );
};

export default StarField;
