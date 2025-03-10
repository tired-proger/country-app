import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import GlobalSvgSelector from '../../GlobalSvgSelector';
import LoaderContent from '../LoaderContent/LoaderContent';
import LoaderImage from '../LoaderImage/LoaderImage';
import cl from "./CardCountry.module.scss"
import CardCountryBorderCountries from './CardCountryBorderCountries';
import CardCountryInfo from './CardCountryInfo';

export default function CardCountry() {

    const [countryData, setCountryData] = useState(null);
    const [isLoader, setIsLoader] = useState(true);
    const [isLoaderImg, setIsLoaderImg] = useState(true);
    const theme = useSelector(state => state.theme);

    const { name } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function getDataCountry() {
            
            setIsLoader(true);
            setIsLoaderImg(true);
            let data = null;

            try {
                let response = await fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
                data = await response.json();
            } catch(e) {
                console.log(e);
            } finally {
                setIsLoader(false);
                setCountryData(data[0]);
            }
            
        }
        getDataCountry();
    }, [name]);

    return (
        <div className={ theme === "dark" ? `${cl.wrapper} ${cl.dark}` : cl.wrapper }>
            <div className={cl.inner}>
                <button 
                className={cl.btnBack}
                onClick={() => navigate(-1)}
                >
                    <GlobalSvgSelector name="arrow-left" />
                    <span>Back</span>
                </button>

                {isLoader
                    ? <div className={cl.wrapperLoader}><LoaderContent loader={true} /></div>
                    : <div className={cl.content}>
                        <div className={cl.contentWrapper}>
                            <div className={cl.flag}>
                                <LoaderImage 
                                    loader={isLoaderImg} 
                                    isLoadingCountry={true}
                                    passTheme={theme}
                                />
                                {
                                    isLoaderImg ||  (
                                        <img 
                                            src={countryData.flags.svg}
                                            onLoad={() => setIsLoaderImg(false)} alt="flag" 
                                        />
                                    )
                                }
                            </div>
                            <div className={cl.info}>
                                <h1 className={cl.title}>{countryData.name.common}</h1>
                                <CardCountryInfo countryData={countryData} />
                            </div>
                        </div> 
                        <CardCountryBorderCountries countryData={countryData} />
                    </div>
                }
            </div>

        </div>
    )
}
