import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import UserAlbum from '../User/UserAlbum';
import Blurb from '../std/Blurb';

class SubView extends Component {
    
    render() {
        const { follows, followers } = this.props
        const isTutor = follows === undefined
        const list = isTutor ? followers : follows
        const title = isTutor ? `${ list.length } students are following you!` :
                                `You are following ${ list.length } tutors!`
        const zeroListMsg = isTutor ? 'No students follow you yet!' : 
                                      'You have 0 tutors who you are currentyl following!'
        const style = {
            paddingTop: '30px',
            paddingBottom: '30px'
        } // style
        return (
            list.length > 0 ?

            <Container maxWidth="md">
                <Blurb body={ title } />
                <UserAlbum searched={ list } /> 
            </Container> :

            <Blurb body={ zeroListMsg } />

            // <div style={ style  }>
            //     <div>follows: { JSON.stringify( follows ) }</div> 
            //     <div>followers: { JSON.stringify( followers ) }</div>
            // </div>
        ) // return
    } // render
} // SubView

export default SubView;