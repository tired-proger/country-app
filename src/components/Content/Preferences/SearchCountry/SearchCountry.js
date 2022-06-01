import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import GlobalSvgSelector from '../../../../GlobalSvgSelector'
import cl from "./SearchCountry.module.scss"
import { setSearchValue, setSearchListCountries, resetListCountries } from '../../../../store/reducers/searchReducer';

export default function SearchCountry() {

    const list = useSelector(state => state.listCountries.defaultListCountries);
    const value = useSelector(state => state.search.searchValue);
    const isLoading = useSelector(state => state.listCountries.isLoader);
    const theme = useSelector(state => state.theme);

    const setDefaultValue = () => value.trim() !== "" ? false : true;

    const [isFocus, setIsFocus] = useState(false);
    const [labelVisibility, setLabelVisibility] = useState(setDefaultValue);
    const dispatch = useDispatch();

    useEffect(() => {
        if ( !isFocus && !labelVisibility && value === "" ) setLabelVisibility(true);
    }, [value]);

    const focusHandler = () => {
        setIsFocus(true);
        setLabelVisibility(false);
    }

    const blurHandler = (e) => {
        setIsFocus(false);
        if (value === "") {
            setLabelVisibility(true);
        }
    }

    const changeHandler = (e) => {

        let inputValue = e.target.value;

        if (inputValue.trim() === "") {
            dispatch(resetListCountries());
            return;
        }

        dispatch(setSearchValue(inputValue));
        dispatch(setSearchListCountries(list));
    }

    const getClasses = () => {

        if (isLoading) return `${cl.searchCountry} ${cl.loading}`;

        if (isFocus) {
            return `${cl.searchCountry} ${cl.focus}`;
        } else {
            return `${cl.searchCountry}`;
        }

    }

    return (
        <form action="#" 
        className={ getClasses() + ` ${ theme === "dark" ? cl.dark : "" }` } 
        >
            <button className={cl.searchCountryBtn}>
                <GlobalSvgSelector name="search" />
            </button>
            <div className={cl.wrapper}>
                <div 
                className={cl.label} 
                style={{ display: labelVisibility ? "block" : "none" }}
                >
                    Search for a country...
                </div>
                <input 
                type="text" 
                className={cl.input} 
                value={value}
                onChange={changeHandler}
                onFocus={focusHandler}
                onBlur={blurHandler}
                />
            </div>
        </form>
    )
}
