import React from 'react';
import Blurb from '../std/Blurb';
import Footer from '../std/Footer';

const Tutor = () => (
    <div className='jumbotron'>
        <Blurb body='Find your tutor' />
        <p className='lead'>
            welcome to reat front end
        </p>
        <Footer title='Tutor footer' content='Add contents here' />
    </div>
) // Tutor

export default Tutor;
