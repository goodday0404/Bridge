import React from 'react';
import { Link } from 'react-router-dom';
import Photo from './Photo';

//import CommentPropTypes from './PropTypes';
import Wrapper from './Wrapper';
import DateView from './Date';

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

const Comment = ({
  photo, userName, userId, content, createdAt,
}) => (
  <Wrapper>
    <div>
      <Photo 
          src={photo} 
          alt={userName} 
          size="small"  
          onError={ error => { error.target.src = 'https://source.unsplash.com/random' } }
      />
    </div>
    <div>
      <strong>
          <Link to={ `/user/${ userId }` } > {userName} </Link>
      </strong>
      <br />
      {content}
    </div>
    {/* <DateView>{getFormattedTimestamp(createdAt)}</DateView> */}
        <DateView>{ new Date(createdAt).toDateString() }</DateView>
  </Wrapper>
);

//Comment.propTypes = CommentPropTypes;

export default Comment;