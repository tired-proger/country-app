import React from 'react'
import { useNavigate } from 'react-router-dom'
import cl from "./NotFoundPage.module.scss"
import { useSelector } from "react-redux";

export default function NotFoundPage() {

    const navigate = useNavigate();
    const theme = useSelector(state => state.theme);

    return (
        <div className={ theme === "dark" ? `${cl.wrapper} ${cl.dark}` : cl.wrapper }>
            <div className={cl.box}>
                <span className={cl.title}>404 Error Not Found Page</span>
                <button className={cl.btn} onClick={() => navigate("/", { replace: true })}>Go back</button>
            </div>
        </div>
    )
}
