import React, { useState, useEffect } from 'react'
import LoaderContent from "../LoaderContent/LoaderContent"
import cl from "./CardCountry.module.scss"
import { Link } from 'react-router-dom';

function CardCountryBorderCountries({ countryData }) {

    const borders = countryData.borders ? countryData.borders : null;
    const [bordersCountriesData, setBordersCountriesData] = useState([]);
    const [isLoader, setIsLoader] = useState(true);

    useEffect(() => {

        if (borders) {
            async function getDataBorders() {

                setIsLoader(true);

                let fetchesBorderCountries = borders.map(el => fetch(`https://restcountries.com/v3.1/alpha/${el}`));
                let requests = await Promise.all(fetchesBorderCountries);
                let data = await Promise.all(requests.map(r => r.json()));

                setBordersCountriesData(data.map(el => el[0]));
                setIsLoader(false);

            }
    
            getDataBorders();
        }

    }, [countryData]);

    return (
        <div className={cl.footerInfo}>
            <span className={cl.footerTitle}>Border Countries:</span>
            {
                borders
                    ? <div className={cl.parentBorders}>
                        <LoaderContent loader={isLoader} />
                        {
                            bordersCountriesData.map(el => (
                                <Link 
                                to={`/country/${el.name.common}`}
                                className={cl.borderCountry}
                                key={el.population}
                                >
                                    {el.name.common}
                                </Link>))
                        }
                    </div>
                    : <span className={cl.defaultTitleBorders}>Not Countries</span>
            }
        </div>
    )
}

export default React.memo(CardCountryBorderCountries);