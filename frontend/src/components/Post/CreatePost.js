import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { isAuth, getUserInfo, updateProcess } from '../../Auth';
import { InputField, FormButton } from '../std/Form';
import AlertDiv from '../User/alert';
import CircularIndeterminate from '../Loading/CircularIndicator';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Footer from '../std/Footer';
import Blurb from '../std/Blurb';

class CreatePost extends Component {
    render() {
        const style = {
            paddingTop: '100px',
            paddingBottom: '100px'
        } // style
        return (
            <main>
                <Blurb body='Make your post' />
                <Container style={ style } maxWidth="md">
                    <Typography gutterBottom variant="h5" component="h2" align='center'>
                        implement form component here
                    </Typography>
                </Container>
                <Footer title='CreatePost footer' contents={ 'Add contents here' } />
            </main>
        ) // return
    } // render
} // CreatePost

export default CreatePost;
