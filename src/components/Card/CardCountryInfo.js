import React from 'react'
import { editNumberPopulation } from '../../HelpFunctions/editNumberPopulation'
import cl from "./CardCountry.module.scss"

function CardCountryInfo({ countryData }) {

    const {
        name,
        population,
        region,
        subregion,
        tld,
        currencies,
        languages
    } = countryData;

    return (
            <div className={cl.rows}>
                <div className={cl.row}>
                    <div className={cl.rowBlock}>
                        <span>Native Name:</span>
                        <span className={cl.countryName}>
                            { name.nativeName ? Object.values(name.nativeName)[0].common : name.common }
                        </span>
                    </div>
                    <div className={cl.rowBlock}>
                        <span>Population:</span>
                        <span className={cl.countryPopulation}>{ editNumberPopulation(population) }</span>
                    </div>
                    <div className={cl.rowBlock}>
                        <span>Region:</span>
                        <span>{ region }</span>
                    </div>
                    <div className={cl.rowBlock}>
                        <span>Sub Region:</span>
                        <span>{ subregion }</span>
                    </div>
                    <div className={cl.rowBlock}>
                        <span>Capital:</span>
                        <span>{ countryData.capital?.length ? countryData.capital[0] : "Not Capital" }</span>
                    </div>
                </div>
                <div className={cl.row}>   
                    <div className={cl.rowBlock}>
                        <span>Top Level Domain:</span>
                        <span className={cl.list}>{ tld.join(", ") }</span>
                    </div>
                    <div className={cl.rowBlock}>
                        <span>Currencies:</span>
                        <span>{ currencies ? Object.values(currencies)[0].name : "Not Currencies" }</span>
                    </div>
                    <div className={cl.rowBlock}>
                        <span>Languages:</span>
                        <span className={cl.list}>
                            { languages 
                                ? Object.values(languages).map((el, index, arr) => (
                                    <span key={el}>{ `${el}${ index + 1 === arr.length ? "" : ", " }` }</span>
                                )) 
                                : "Not Languages"
                            }
                        </span>
                    </div>
                </div>
        </div>
    )
}

export default React.memo(CardCountryInfo)
