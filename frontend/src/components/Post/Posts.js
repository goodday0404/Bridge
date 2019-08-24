import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PostAlbum from './PostAlbum';

import Blurb from '../std/Blurb';
import Footer from '../std/Footer';
import { isAuth, getUserInfo, getAllUserInfo } from '../../Auth';
import { getAllPostsRequest, getMyPostsRequest } from '../../API/postAPI';
import SearchBox from '../AppBar/SearchBox';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { SelectPost } from '../std/Select';
import { PostButton } from './index';
import CircularIndeterminate from '../Loading/CircularIndicator';


class Posts extends Component {
    state = {
        user: '',
        posts: [],
        myPosts: [],
        searched: [],
        //searchString: '',
        criteria: '',
        isTutor: this.props.isTutor,
        isLoading: false,
    } // state

    setMyPosts = ( _id, token ) => {
        getMyPostsRequest( _id, token ).then( data => {
            if ( data.error ) console.log( data.error )
            else this.setState( { myPosts: data } )
        }) // then
    } // setMyPosts

    getSearchedItems = searchString => {
        const { criteria, posts } = this.state
        if ( !searchString ) return posts
        const target = searchString.trim().toLowerCase();
        return posts.filter( post => {
console.log('filtered post: ', post)
            let criterion = post.title
            if ( criteria === 'body' ) criterion = post.body
            else if ( criteria === 'name' ) criterion = post.postedBy.name
            return criterion.toLowerCase().match( target ) 
        } ) // filter
    } // getSearchedItems

    handleUserInfo( auth ) {
        //const token = isAuth().token
        getUserInfo( auth.user._id, auth.token )
        .then( data => {
          if ( data.error ) {
              this.setState( { route: true } )
              return
          } // if
          this.setState( { user: data } )
          this.setMyPosts( data._id, auth.token )
        }) // then
    } // handleUserInfo
      
    handleInputChange = event => {
        this.setState( { searched: this.getSearchedItems( event.target.value ) } )
    } // handleInputChange

    handleSelect = event => {
        this.setState( { criteria: event.target.value } )
    } // handleSelect

    ClickPostButton = posts => event => {
        this.setState( { searched: posts } )
    } // ClickPostButton

    componentDidMount() {
        this.setState( { isLoading: true } )
// console.log('posts are mounted')
        // this.handleUserInfo( this.props.match.params.userId )
        this.handleUserInfo( isAuth() )
        getAllPostsRequest().then( data => {
            if ( data.error ) {
                console.log( data.error )
                return
            } // if
            // const items = !this.state.isTutor ? data : data.filter( user => {
            //     return user.tutor.match( 'yes' )
            // } ) // filter
            this.setState( { posts: data.posts, searched: data.posts, isLoading: false } )
        }) // then
    } // componentDidMount

    render() {
        const { posts, myPosts, searched, isLoading } = this.state
        const styleContainer = {
            paddingTop: '60px',
            paddingBottom: '100px'
        } // styleContainer
//console.log('posts render')
        return (
            <React.Fragment>
                <CssBaseline />
                <Blurb body='See what others have been asking!' />
                {
                    isLoading ? 
                    <CircularIndeterminate
                        style= { { marginTop: '100px', marginBottom: '100px' } } 
                     /> :

                    <Container style={ styleContainer } maxWidth="lg">
                        <Grid container spacing={1} style={ { paddingBottom: '60px' } } >
                            <SelectPost   handleSelect={ this.handleSelect } />
                            <SearchBox 
                                handleInputChange={ this.handleInputChange } 
                                //style={ { marginLeft: '10px' } } 
                            />
                            <PostButton 
                                label='All Posts'
                                variant='contained'
                                color='primary' 
                                handler={ this.ClickPostButton( posts ) } 
                            />
                            <PostButton 
                                label='My Posts'
                                variant='outlined' 
                                color='primary' 
                                handler={ this.ClickPostButton( myPosts ) } 
                            />
                            {/* <GridButton 
                                label='My posts' 
                                handler={ this.ClickPostButton } 
                                style={ { marginTop: '10px' } }
                                color='primary'
                                variant='outlined'
                            /> */}
                            </Grid>
                        <PostAlbum searched={ searched } />
                    </Container>
                }
                <Footer title='Posts footer' contents={ 'add something here' } />
            </React.Fragment>   
          ) // return
    } // render
} // Post

// export default withRouter( Posts );
export default Posts;
