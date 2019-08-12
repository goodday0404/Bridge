import React from 'react';
import Blurb from '../std/Blurb';
import Footer from '../std/Footer';
import AlbumLayout from '../User/AlbumLayout';

const Tutor = () => (
    // <div className='jumbotron'>
    //     <Blurb body='Find your tutor' />
    //     <p className='lead'>
    //         welcome to reat front end
    //     </p>
    //     <Footer title='Tutor footer' content='Add contents here' />
    // </div>
    <AlbumLayout isTutor={ true } />
) // Tutor

export default Tutor;
