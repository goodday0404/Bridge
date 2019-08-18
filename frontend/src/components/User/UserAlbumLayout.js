import React, { Component } from 'react';
import UserAlbum from './UserAlbum';
import Blurb from '../std/Blurb';
import Footer from '../std/Footer';
import { getAllUserInfo } from '../../Auth';
import SearchBox from '../AppBar/SearchBox';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { SelectOutlined } from '../std/Select';


class UserAlbumLayout extends Component {
    state = {
        users: [],
        searched: [],
        //searchString: '',
        criteria: '',
        isTutor: this.props.isTutor,
    } // state

    getSearchedItems = searchString => {
        const { criteria, users } = this.state
        if ( !searchString ) return users
        const target = searchString.trim().toLowerCase();
        return users.filter( user => {
console.log('filtered user: ', user)
            let criterion = user.name
            if ( criteria === 'courses' ) criterion = user.courses
            else if ( criteria === 'email' ) criterion = user.email
            else if ( criteria === 'program' ) criterion = user.program
            return criterion.toLowerCase().match( target ) 
        } ) // filter
    } // getSearchedItems
      
    handleInputChange = event => {
        this.setState( { searched: this.getSearchedItems( event.target.value ) } )
    } // handleInputChange

    handleSelect = event => {
        this.setState( { criteria: event.target.value } )
    } // handleSelect

    componentDidMount() {
        getAllUserInfo().then( data => {
            if ( data.error ) {
                console.log( data.error )
                return
            } // if
            // const items = !this.state.isTutor ? data : data.filter( user => {
            //     return user.tutor.match( 'yes' )
            // } ) // filter
            // this.setState( { users: items, searched: items } )
            const items = data.filter( user => {
                return user.tutor.match( this.state.isTutor ? 'yes' : 'no' )
            } ) // filter
            this.setState( { users: items, searched: items } )
        }) // then
    } // componentDidMount

    render() {
        const { searched, isTutor, call } = this.state
        const searchedItems = this.getSearchedItems();
        const styleContainer = {
            paddingTop: '60px',
            paddingBottom: '100px'
        } // styleContainer
        return (
            <React.Fragment>
                <CssBaseline />
                <main>
                    <Blurb  call={ call }
                            searched= { searched } 
                            body={ this.props.blurbText } 
                    />
                    <Container style={ styleContainer } maxWidth="md">
                        <Grid container spacing={1} style={ { paddingBottom: '60px' } } >
                            <SelectOutlined     isTutor={ isTutor } 
                                                handleSelect={ this.handleSelect } 
                            />
                            <SearchBox handleInputChange={ this.handleInputChange } />
                        </Grid>
                        <UserAlbum searched={ searched } />
                    </Container>
                </main>
                <Footer title='Posts footer' contents='Add someting here' />
            </React.Fragment>
          ) // return
    } // render
} // Post

export default UserAlbumLayout;
