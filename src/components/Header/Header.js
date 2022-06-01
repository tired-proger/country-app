import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import GlobalSvgSelector from '../../GlobalSvgSelector';
import { toggleTheme } from '../../store/reducers/themeReducer';
import cl from "./Header.module.scss"

export default function Header() {

    const theme = useSelector(state => state.theme);
    const dispatch = useDispatch();
    const handlerTheme = () => dispatch(toggleTheme());

    return (
        <header className={ theme === "dark" ? `${cl.header} ${cl.dark}` : cl.header }>
            <div className={cl.headerWrapper}>
                <Link to="/" className={cl.logo}>Where in the world?</Link>
                <button 
                className={cl.btnTheme}
                onClick={handlerTheme}
                >
                    <span className={cl.btnThemeIcon}>
                        { theme === "light"
                            ? <GlobalSvgSelector name="moon-stroke" classSvg={cl.moonStroke} />
                            : <GlobalSvgSelector name="moon-fill" classSvg={cl.moonFill} />
                        }
                    </span>
                    <span className={cl.btnThemeText}>Dark Mode</span>
                </button>
            </div>
        </header>
    )
}
