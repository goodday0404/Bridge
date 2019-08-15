import React from 'react';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import useStyles from '../../styles/AppbarStyle';
import Toolbar from '@material-ui/core/Toolbar';

const SearchBox = props => {
    const classes = useStyles();
    const { handleInputChange, style } = props
    return(
        <div className={classes.grow} style={ style } >
            <Toolbar variant='regular' >
                <div className={ classes.search }>
                    <div className={ classes.searchIcon }>
                        <SearchIcon />
                    </div>
                    <InputBase
                        placeholder="Search…"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }} // classes
                        inputProps={{ 'aria-label': 'Search' }}
                        onChange={ handleInputChange }
                    />
                </div>
            </Toolbar>         
        </div>
    ) // return
} // SearchBox

export default SearchBox;