import React from 'react';
import Lottie from 'react-lottie';

const AnimatedIcon = (props) => {
    const { icon, height, width } = props
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: icon,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <Lottie options={defaultOptions} height={height} width={width} />
    );
}

export default AnimatedIcon;