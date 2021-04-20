import React, { useEffect, useState, useRef, useCallback } from 'react'

export default function DistortionImage({ src }) {

    const imageRef = useRef({});

    const [getScale, setScale] = useState(0);
    
    let stopMouseMoveTimer;
    let decrementScaleTimer;

    const handleDocumentMouseMove = useCallback((e)=>{

        //clear previous timeout and intarval
        if (stopMouseMoveTimer) {
            window.clearTimeout(stopMouseMoveTimer);
            window.clearInterval(decrementScaleTimer);
        }

        setScale((prev,next)=>{
            if(prev < 40){
                return prev +1;
            }
            return prev;
        })
        
        //- image move along cursor and parallax effect with rotation
        imageRef.current.style.transform = ` translateZ(100px) translate(${e.clientX - (imageRef.current.getBoundingClientRect().width / 2)}px,${e.clientY - (imageRef.current.getBoundingClientRect().height / 2)}px) rotateY(${(e.clientX - window.innerWidth/2) * 0.03 }deg) rotateX(${-(e.clientY - window.innerHeight/2) * 0.03 }deg)`

        //after clear previous ,start delay 10ms before decrement value to make image look default
        stopMouseMoveTimer = window.setTimeout(() => {
            decrementScaleTimer = window.setInterval(() => {
                setScale((prev,next)=>{
                    if(prev > 0){
                        return prev  - 1;
                    }
                    return prev;
                })
            }, 10)
        }, 50)

    },[])

    useEffect(() => {
        document.addEventListener('mousemove', handleDocumentMouseMove);
        return ()=>{
            document.removeEventListener('mousemove',handleDocumentMouseMove);
        }
    }, [])

    return (
        <>
            <svg className="absolute">
                <filter id="distortion">
                    <feTurbulence id="turbulence" type="turbulence" baseFrequency="0" numOctaves="5" seed="2"></feTurbulence>
                    <feDisplacementMap id="displaceMap" in="SourceGraphic" scale={getScale*5}></feDisplacementMap>
                    <animate href="#turbulence" attributeName="baseFrequency" dur="6s" keyTimes="0;0.5;1" values="0.002 0.003;0.003 0.006;0.002 0.003;" repeatCount="indefinite"/>
                </filter>
            </svg>
            <figure className="z-10 transform" style={{transformStyle:'preserve-3d',perspective:'800px'}}>
                <img ref={imageRef} className="z-0 w-[320px] h-[420px] fixed origin-center object-cover pointer-events-none" src={src} style={{ filter: 'url(#distortion)' ,transformStyle:'preserve-3d'}} />
            </figure>
        </>
    )
}
