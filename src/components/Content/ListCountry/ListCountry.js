import React, { useEffect } from 'react'
import ListCountryItem from './ListCountryItem/ListCountryItem'
import cl from "./ListCountry.module.scss"
import { useDispatch, useSelector } from 'react-redux';
import { firstGetAllCountriesThunk } from '../../../store/reducers/countriesReducer';
import Pagination from './Pagination/Pagination';
import LoaderContent from '../../LoaderContent/LoaderContent';

function ListCountry() {

    const { 
        isLoader, 
        displayListCountries, 
        paginationVisible
    } = useSelector(state => state.listCountries);

    const { searchListCountries, searchValue } = useSelector(state => state.search);
    const theme = useSelector(state => state.theme);
    
    const dispatch = useDispatch();

    useEffect(() => {
        if (!displayListCountries.length) {
            dispatch(firstGetAllCountriesThunk);
        }
    }, []);

    if (isLoader) return <div className={cl.wrapperLoader}><LoaderContent loader={true} /></div>

    //if search failed
    if ( searchValue.trim() !== "" && searchListCountries.length === 0 ) {
        return <div className={ theme === "dark" ? `${cl.nothingSearch} ${cl.dark}` : cl.nothingSearch }>Nothing Found</div>
    }

    //define render list
    const endDisplayList = searchListCountries.length ? searchListCountries : displayListCountries;
    
    return (
        <React.Fragment>
            <div className={cl.wrapper}>
                {
                    endDisplayList.map(data => (
                        <ListCountryItem
                            key={data.name.common}
                            title={data.name.common}
                            region={data.region}
                            population={data.population}
                            flag={data.flags.svg}
                            capital={ data.capital?.length ? data.capital[0] : "Not Capital" }
                        />
                    ))
                }
            </div>
            { paginationVisible && searchListCountries.length === 0 ? <Pagination /> : null }
        </React.Fragment>
    )
}

export default React.memo(ListCountry)
