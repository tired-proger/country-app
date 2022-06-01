import React, { useRef, useEffect, useState } from 'react'
import cl from "./ScrollTopBtn.module.scss"
import GlobalSvgSelector from "../../../GlobalSvgSelector"
import { useSelector } from 'react-redux';

export default function ScrollTopBtn() {

    const [visible, setVisible] = useState(false);
    const refBtn = useRef(null);
    const allowLaunchHandler = useRef({ up: false, down: false })
    const theme = useSelector(state => state.theme);

    const btnUpScroll = () => document.documentElement.scrollTo(0, 0);

    useEffect(() => {

        function handlerScroll() {

            if (window.pageYOffset > window.innerHeight) {
                if (allowLaunchHandler.current.up) return;
                allowLaunchHandler.current.up = true;
                allowLaunchHandler.current.down = false;
                setVisible(true);
                return;
            }

            if (allowLaunchHandler.current.down) return;
            allowLaunchHandler.current.up = false;
            allowLaunchHandler.current.down = true;
            setVisible(false);

        }

        window.addEventListener("scroll", handlerScroll);
        return () => window.removeEventListener("scroll", handlerScroll);

    }, [])

    const addClass = theme === "dark" ? cl.dark : "";

    return (
        <button
        ref={refBtn} 
        className={ visible ? `${cl.btn} ${cl.active} ${addClass}` : `${cl.btn} ${addClass}` }
        onClick={btnUpScroll}
        >
            <GlobalSvgSelector name="arrow-down" />
        </button>
    )
}
