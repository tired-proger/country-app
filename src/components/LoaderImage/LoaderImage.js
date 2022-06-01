import React from 'react'
import { useSelector } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import "./LoaderImage.scss"

export default function LoaderImage({ loader, isLoadingCountry, passTheme }) {

    const theme = useSelector(state => state.theme);

    const getBgColor = () => {
        if (isLoadingCountry) {
            return passTheme === "dark" ? "hsl(207, 26%, 17%)" : "hsl(0, 0%, 98%)";
        }
        return "";
    }

    return (
        <CSSTransition 
        in={loader} 
        timeout={300} 
        classNames="loader-image" 
        unmountOnExit
        >
            <div 
            className={ theme === "dark" ? "loader-image dark" : "loader-image" } 
            style={{ backgroundColor: getBgColor() }}
            />
        </CSSTransition>
    )
}
