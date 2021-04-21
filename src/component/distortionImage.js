import gsap from 'gsap';
import React, { useEffect, useState, useCallback } from 'react'
export default function DistortionImage({ src }) {

    const [client, setClient] = useState({
        x: 0,
        y: 0,
    })

    let tween = {
        image: null,
        turbulence: null,
    };

    let stopMouseMoveTimer;

    const handleDocumentMouseMove = useCallback((e) => {

        if (stopMouseMoveTimer) {
            window.clearTimeout(stopMouseMoveTimer);
        }

        setClient((prevState) => {
            let newState = { ...prevState };
            newState.x = e.clientX;
            newState.y = e.clientY;
            return newState;
        })

        tween.turbulence.play();

        stopMouseMoveTimer = window.setTimeout(() => {
            tween.turbulence.reverse();
        }, 10)

    }, [])


    useEffect(() => {

        tween.turbulence = gsap.to('#turbulence', {
            duration: 2,
            attr: {
                baseFrequency: "0.025"
            }
        });

        document.addEventListener('mousemove', handleDocumentMouseMove);

        return () => {
            document.removeEventListener('mousemove', handleDocumentMouseMove);
        }

    }, [])

    useEffect(() => {

        tween.image = gsap.to('#image-distortion-effect', {
            duration: 0.5,
            x: client.x,
            y: client.y,
        });

    }, [client])


    return (
        <>
            <svg className="absolute">
                <filter id="distortion">
                    <feTurbulence id="turbulence" baseFrequency="0" numOctaves="1"></feTurbulence>
                    <feDisplacementMap id="displaceMap" in="SourceGraphic" scale="30"></feDisplacementMap>
                </filter>
            </svg>
            <div id="image-distortion-effect" className="z-10 fixed ">
                <img className="z-0 w-[360px] h-[460px] origin-center object-cover pointer-events-none" src={src} style={{ filter: 'url(#distortion)', transform:'translate(-50%,-50%)' }} />
            </div>
        </>
    )
}
