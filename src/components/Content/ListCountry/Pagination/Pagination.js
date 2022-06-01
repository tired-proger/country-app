import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import GlobalSvgSelector from '../../../../GlobalSvgSelector'
import { setCurrentPage } from '../../../../store/reducers/countriesReducer';
import { initPagination, setPaginationDisplayPage } from '../../../../store/reducers/paginationReducer';
import cl from "./Pagination.module.scss"

export default function Pagination() {

    const { 
        paginationAllPages, 
        paginationCurrentPage,
    } = useSelector(state => state.listCountries);

    const { 
        paginationAllDisplayPages,
        paginationDisplayPage,
        paginationDisplayPagesList,
        paginationDisplayPagesListDefault
    } = useSelector(state => state.paginate);

    const theme = useSelector(state => state.theme);

    const dispatch = useDispatch();

    useEffect(() => {
        if (!paginationDisplayPagesListDefault.length && paginationAllPages) {
            dispatch(initPagination(paginationAllPages))
        }
    }, [paginationAllPages])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [paginationCurrentPage]) 

    const nextPaginateRange = () => dispatch(setPaginationDisplayPage(paginationDisplayPage + 1));
    const prevPaginateRange = () => dispatch(setPaginationDisplayPage(paginationDisplayPage - 1));

    const nextCurrentPage = () => dispatch(setCurrentPage(paginationCurrentPage + 1));
    const prevCurrentPage = () => dispatch(setCurrentPage(paginationCurrentPage - 1));

    //if pagination not init
    if (!paginationDisplayPagesList.length) return null;

    return (
        <div className={ theme === "dark" ? `${cl.wrapper} ${cl.dark}` : cl.wrapper }>
            <div className={cl.inner}>
                <div className={cl.pagination}>
                    <button 
                    className={`${cl.btnPaginate} ${cl.prevBtn} ${ (paginationCurrentPage === 1) ? cl.disable : "" }`}
                    onClick={prevCurrentPage}
                    >
                        <GlobalSvgSelector name="arrow-down" />
                    </button>
                    <button 
                    className={`${cl.btnDots} ${paginationDisplayPage === 1 ? cl.disable : ""}`}
                    onClick={prevPaginateRange}
                    >
                        ...
                    </button>
                    <div className={cl.paginateList}>
                        {
                            paginationDisplayPagesList.map(el => {
                                el = Number(el);
                                return <button
                                key={el}
                                onClick={() => dispatch(setCurrentPage(el))}
                                className={`${cl.paginateListItem} ${ paginationCurrentPage === el ? cl.active : "" }`}
                                >
                                    {el}
                                </button>
                            })
                        }
                    </div>
                    <button 
                    className={`${cl.btnDots} ${
                        paginationDisplayPage === paginationAllDisplayPages ? cl.disable : ""}
                    `}
                    onClick={nextPaginateRange}
                    >
                        ...
                    </button>
                    <button className={`${cl.btnPaginate} ${cl.nextBtn} ${ 
                        (paginationCurrentPage === paginationAllPages) ? cl.disable : "" 
                    }`}
                    onClick={nextCurrentPage}
                    >
                        <GlobalSvgSelector name="arrow-down" />
                    </button>
                </div>
                <div className={cl.info}>
                    Page { `${paginationCurrentPage} / ${paginationAllPages}` }
                </div>
            </div>
        </div>
    )
}
