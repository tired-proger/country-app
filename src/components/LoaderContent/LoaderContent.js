import React from 'react'
import { CSSTransition } from 'react-transition-group'
import { useSelector } from "react-redux"
import "./LoaderContent.scss"

export default function LoaderContent({ loader }) {

    const theme = useSelector(state => state.theme);

    return (
        <CSSTransition 
        in={loader} 
        timeout={300} 
        classNames="loader-content" 
        unmountOnExit
        >
            <div className={ theme === "dark" ? "loader-content dark" : "loader-content" } />
        </CSSTransition>
    )
}