import React from 'react';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

const SearchBox = props => {
    const { search, searchIcon, inputRoot, inputInput } = props
    return(
        <div className={search}>
            <div className={searchIcon}>
                <SearchIcon />
            </div>
            <InputBase
                placeholder="Search…"
                classes={{
                    root: inputRoot,
                    input: inputInput,
                }} // classes
                inputProps={{ 'aria-label': 'Search' }}
            />
        </div>
    ) // return
} // SearchBox

export default SearchBox;