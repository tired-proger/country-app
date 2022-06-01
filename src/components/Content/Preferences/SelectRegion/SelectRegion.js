import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Select, { components } from "react-select";
import GlobalSvgSelector from '../../../../GlobalSvgSelector';
import { setAllCountries, setRegionCountriesThunk, setSelectedOption } from '../../../../store/reducers/countriesReducer';
import { resetListCountries } from '../../../../store/reducers/searchReducer';
import cl from "./SelectRegion.module.scss"

export default function SelectRegion() {

    const dispatch = useDispatch();
    const selectedOption = useSelector(state => state.listCountries.selectedOption);
    const isLoading = useSelector(state => state.listCountries.isLoader);
    const theme = useSelector(state => state.theme);

    const DropdownIndicator = (props) => {
        return (
            <components.DropdownIndicator {...props}>
                <GlobalSvgSelector name="arrow-down" />
            </components.DropdownIndicator>
        )
    }

    const handleChange = (selectedOption) => {

        let valueOption = selectedOption.value;

        dispatch(resetListCountries());
        dispatch(setSelectedOption(selectedOption));
        
        if (valueOption !== "All") {
            dispatch(setRegionCountriesThunk(valueOption));
            return;
        }

        dispatch(setAllCountries());

    }

    const handleCloseMenu = () => {
        const menuEl = document.querySelector(".menu--select");
        const parentMenu = menuEl?.parentElement;
        const clonedMenu = menuEl?.cloneNode(true);
        if (!clonedMenu) return;
        clonedMenu.classList.add("hide--menu");
        function removeEl() {
            clonedMenu.removeEventListener("animationend", removeEl)
            clonedMenu.remove();
        }
        clonedMenu.addEventListener("animationend", removeEl);
        parentMenu?.append(clonedMenu);
    }

    const options = [
        { value: "All", label: "All" },
        { value: "Africa", label: "Africa" },
        { value: "America", label: "America" },
        { value: "Asia", label: "Asia" },
        { value: "Europe", label: "Europe" },
        { value: "Oceania", label: "Oceania" }
    ]

    return (
        <div className={ cl.selectWrapper } >
            <Select
             options={options} 
             placeholder="Filter by Region"
             isSearchable={false}
             onChange={handleChange}
             onMenuClose={handleCloseMenu}
             className={ theme === "dark" ? "react-select-container-dark" : "react-select-container" }
             classNamePrefix="react-select"
             defaultValue={ selectedOption }
             isDisabled={ isLoading }
             components={
                { 
                    DropdownIndicator,
                    Menu: (props) => <components.Menu {...props} className="menu--select" />
                }
            }
            />
        </div>
    )
}
