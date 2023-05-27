import React, { useEffect, useRef } from 'react'

const frequencyLimit = {
    min: 0,
    max: 0.001,
    step: 0.0001,
}

export default function DistortionPaper({ alt = "fancy-image", src, width = 360, height = 460, opacity = 0.7, movementDelay = 100, ...rest }) {
    const turbulenceRef = useRef(null)
    const imageRef = useRef(null)
    const infoRef = useRef({
        canPlay: true,
    })

    const animationResetTimeout = useRef(null)
    const requestAnimateRef = useRef(null)

    function getFrequency() {
        return +turbulenceRef.current.getAttribute("baseFrequency")
    }

    function setFrequency(value) {
        turbulenceRef.current.setAttributeNS(null, "baseFrequency", value);
    }

    function playFrequency(translateX, translateY) {
        imageRef.current.style.transform = `translate(${translateX}px,${translateY}px)`
    }



    useEffect(function handleMouseMoveForAnimation() {
        function reverseFrequency() {
            const prevBaseFrequency = +turbulenceRef.current.getAttribute("baseFrequency")
            if (prevBaseFrequency > frequencyLimit.min) {
                let prevValue = getFrequency()
                setFrequency(prevValue - frequencyLimit.step)
                requestAnimateRef.current = window.requestAnimationFrame(reverseFrequency)
            } else {
                window.cancelAnimationFrame(requestAnimateRef.current)
                setFrequency(0)
            }
        }

        function handleMouseMove(event) {
            if (!infoRef.current.canPlay) {
                return "await delay"
            }
            if (animationResetTimeout.current) {
                window.clearTimeout(animationResetTimeout.current)
            }
            if (imageRef.current) {
                let { width, height } = imageRef.current.getBoundingClientRect()
                playFrequency(event.clientX - (width / 2), event.clientY - (height / 2))
            }
            if (turbulenceRef.current) {
                let prevValue = getFrequency(turbulenceRef)
                setFrequency(prevValue + frequencyLimit.step)
                animationResetTimeout.current = setTimeout(reverseFrequency, 100)
            }

        }

        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousedown", handleMouseMove)

    }, [])

    // style

    const svgWrapperStyle = {
        postion: 'absolute',
        opacity: 0,
        display: 'none',
    }


    const imageStyle = {
        pointerEvents: 'none',
        position: 'fixed',
        transition: `all ${movementDelay}ms`,
        width,
        height,
        zIndex: 0,
        objectFit: 'cover',
        PointerEvent: 'none',
        filter: 'url(#distortion)',
        opacity: 0.5
    }

    return (
        <>
            <svg style={svgWrapperStyle}>
                <filter id="distortion">
                    <feTurbulence ref={turbulenceRef} id="turbulence" baseFrequency="0" numOctaves="50"></feTurbulence>
                    <feDisplacementMap id="displaceMap" in="SourceGraphic" scale="30"></feDisplacementMap>
                </filter>
            </svg>
            <img ref={imageRef} src={src} id="image-distortion-effect" style={imageStyle} alt={alt} {...rest} />
        </>
    )
}
