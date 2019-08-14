import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import UserAlbum from '../User/UserAlbum';
import Blurb from '../std/Blurb';

class SubView extends Component {
    
    render() {
        const { follows, followers } = this.props
        const style = {
            paddingTop: '30px',
            paddingBottom: '30px'
        } // style

        return (
            <div>
                {/* <Typography style={ style } gutterBottom variant="h5" component="h2" align='center' color="textPrimary">
                        My tutors 
                </Typography> */}
                <Blurb body='My tutors' />
                <UserAlbum searched={ follows } />
            </div>
            // <div style={ style  }>
            //     <div>follows: { JSON.stringify( follows ) }</div> 
            //     <div>followers: { JSON.stringify( followers ) }</div>
            // </div>
        ) // return
    } // render
} // SubView

export default SubView;