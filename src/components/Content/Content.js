import React from 'react'
import { useSelector } from 'react-redux'
import cl from "./Content.module.scss"
import ListCountry from './ListCountry/ListCountry'
import Preferences from './Preferences/Preferences'
import ScrollTopBtn from './ScrollTopBtn/ScrollTopBtn'

export default function Content() {

    const isVisibleBtnUp = useSelector(state => state.listCountries.isVisibleBtnUp);
    const theme = useSelector(state => state.theme);

    return (
        <div className={ theme === "dark" ? `${cl.content} ${cl.dark}` : cl.content }>
            <div className={cl.contentWrapper}>
                <Preferences />
                <ListCountry />
                { isVisibleBtnUp ? <ScrollTopBtn /> : null }
            </div>
        </div>
    )
}
