import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { editNumberPopulation } from '../../../../HelpFunctions/editNumberPopulation';
import { useSelector } from "react-redux"
import LoaderImage from '../../../LoaderImage/LoaderImage';
import cl  from "./ListCountryItem.module.scss"

export default function ListCountryItem({ flag, title, population, region, capital }) {

    const [isLoadingImg, setIsLoadingImg] = useState(true);
    const refImg = useRef(null);
    const theme = useSelector(state => state.theme);

    useEffect(() => {
        if (refImg.current) {
            refImg.current.onload = () => setIsLoadingImg(false)
        }
    }, []);

    return (
        <Link 
        className={ theme === "dark" ? `${cl.card} ${cl.dark}` : cl.card } 
        to={`/country/${title}`}
        >
            <div className={cl.cardImage}>
                <LoaderImage loader={isLoadingImg} />
                <img ref={refImg} src={flag} alt="flag image" />
            </div>
            <div className={cl.cardContent}>
                <h2 className={cl.title}>{title}</h2>
                <div className={cl.item}>
                    <span className={cl.itemTitle}>Population:</span>
                    <span className={cl.itemText}>{editNumberPopulation(population)}</span>
                </div>
                <div className={cl.item}>
                    <span className={cl.itemTitle}>Region:</span>
                    <span className={cl.itemText}>{region}</span>
                </div>
                <div className={cl.item}>
                    <span className={cl.itemTitle}>Capital:</span>
                    <span className={cl.itemText}>{capital}</span>
                </div>
            </div>
        </Link>
    )
}
