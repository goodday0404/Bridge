import React from 'react';
import { Link } from 'react-router-dom';
import Photo from './Photo';
//import CommentPropTypes from './PropTypes';
import Wrapper from './Wrapper';
import DateView from './Date';
import { AlertDialog } from '../std/Alert';
import { isAuth } from '../../Auth';
import { deleteCommentRequest } from '../../API/postAPI';

export const getFormattedTimestamp = (time) => {
  const diff = (Date.now() - time) / 1000 / 60; // Minutes

  if (diff < 60) {
    return `${Math.round(diff)}m`;
  }

  if (diff >= 60 && diff < 24 * 60) {
    return `${Math.round(diff / 60)}h`;
  }

  return `${Math.round(diff / (24 * 60))}d`;
};

const isLogInUser = ( logInUser, poster ) => {
  return logInUser && ( poster != undefined ) && logInUser._id === poster._id
} // isLogInUser

const Comment = ( { photo, post, comment, onDeleteComment } ) => {
  const { name, postedBy, text, created } = comment
  const isAuthor = isLogInUser( isAuth().user, postedBy )

  const handleDelete = comment => () => {
    const auth = isAuth() 
    deleteCommentRequest( auth.user._id, post._id, auth.token, comment )
    .then( data => {
      if ( data.error ) console.log( data.error )
      else onDeleteComment( data.comments )
    }) // then
  } // handleDelete

  return (
    <Wrapper>
      <div>
        <Photo 
            src={ photo } 
            alt={ name } 
            size="small"  
            onError={ error => { error.target.src = 'https://source.unsplash.com/random' } }
        />
      </div>
      <div>
        <strong>
            <Link to={ `/user/${ postedBy._id }` } > { postedBy.name } </Link>
        </strong>
        <br />
        { text }
      </div>
      {/* <DateView>{getFormattedTimestamp(createdAt)}</DateView> */}
      <DateView>{ new Date( created ).toDateString() }</DateView>
      { // display trash icon only on comment of this user.
        isAuthor && <AlertDialog 
                        label='Delete' 
                        title='Do you want to delele this Comment?'
                        body='This actino will permenantly delele this Comment'
                        handler={ handleDelete( comment ) } 
                        trash={ true }
                        addButton={ true }
                    />
      }
    </Wrapper>
)}

//Comment.propTypes = CommentPropTypes;

export default Comment;