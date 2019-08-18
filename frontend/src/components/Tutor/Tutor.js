import React from 'react';
import Blurb from '../std/Blurb';
import Footer from '../std/Footer';
import UserAlbumLayout from '../User/UserAlbumLayout';

const Tutor = () => (
    // <div className='jumbotron'>
    //     <Blurb body='Find your tutor' />
    //     <p className='lead'>
    //         welcome to reat front end
    //     </p>
    //     <Footer title='Tutor footer' content='Add contents here' />
    // </div>
    <UserAlbumLayout isTutor={ true } blurbText='Find your next tutor here!' />
) // Tutor

export default Tutor;
