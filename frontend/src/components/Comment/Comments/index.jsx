import React, { PureComponent } from 'react';
import Comment from '../index';
import Wrapper from './Wrapper';
import HideComments, { Button as HideCommentsButton } from './HideComments';
import List from './List';
import { path } from '../../../Auth';

class Comments extends PureComponent {
  constructor() {
    super();

    this.state = { visible: true };
  }

  getUserImage( _id ) {
    const date = new Date().getTime()
    return _id ? path( `user/photo/${ _id }?${ date }` ) : undefined
  } // getImage

  onToggle = () => {
    this.setState(prevProps => ({ visible: !prevProps.visible }));
  };

  render() {
    const { comments } = this.props;
    const { visible } = this.state;

    return (
      <Wrapper>
        <HideComments>
          <HideCommentsButton onClick={this.onToggle}>
            {visible ? 'Hide' : 'Show'}
            {' '}
            comments ( { comments.length } )
          </HideCommentsButton>
        </HideComments>
        {visible && (
          <List>
            {/* {comments
              .sort((a, b) => b.createdAt - a.createdAt)
              .map( ( comment, i ) => (
                <Comment key={ i } {...comment} />
              ))} */}
               {comments
              .sort((a, b) => b.createdAt - a.createdAt)
              .map( ( comment, i ) => {
                console.log(comment)   
                const { created, _id, text, postedBy } = comment
                return <Comment 
                          key={ i } 
                          photo={ this.getUserImage( postedBy._id ) } 
                          userName={ postedBy.name }
                          userId={ postedBy._id }
                          content={ text }
                          createdAt={ created }
                       />
               })}
          </List>
        )}
      </Wrapper>
    );
  }
}

export default Comments;
