import React from 'react'
import SearchCountry from './SearchCountry/SearchCountry'
import cl from "./Preferences.module.scss"
import SelectRegion from './SelectRegion/SelectRegion'

export default React.memo(
    function Preferences() {
        return (
            <div className={cl.contentPreferences}>
                <SearchCountry />
                <SelectRegion />
            </div>
        )
})