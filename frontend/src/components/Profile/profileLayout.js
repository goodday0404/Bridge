import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import { School } from '@material-ui/icons'
import { Divider } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import Container from '@material-ui/core/Container';
import { SimpleCardMedia, SimpleCardContents, DefaultCardActions } from '../std/Card';
import { EditDeleteButtons, FollowUnFollowButtons } from './ProfileButtons';
import { GridButton } from '../std/Button'
import { SimpleCardButton } from '../std/Card';
import useStyles from '../../styles/PostCardExpandedStyle';
import NewComment from '../Comment/NewComment';
import Comments from '../Comment/Comments';
import { isAuth, path } from '../../Auth';
import Footer from '../std/Footer';
import Blurb from '../std/Blurb';
import SubView from './SubView';
import { ShowMyStudentsButton, ShowMyTutorsButton } from './ProfileButtons';
import CircularIndeterminate from '../Loading/CircularIndicator';
import { ShareAboutTutor } from './ProfileButtons';

const imageStyle={ 
    height: '400px', 
    width: 'auto', 
    paddingBottom: '20px', 
    objectFit: 'cover',
    marginLeft: 'auto',
    marginRight: 'auto'
} // imageStyle

const isLogInUser = ( logInUser, poster ) => {
    return logInUser && ( poster != undefined ) && logInUser._id === poster._id
} // isLogInUser

const ProfileLayout = props => {
    const classes = useStyles()
    const { user, image, follow, isLogInUser, isTutor, followHandler, handleShowMyTutor,
            handleShowMyStudents, showMyTutors, showMyStudents, commentHandler, comments,
            share, shareButtonHandler } = props
console.log('props.user: ', user)
    // const isAuthor = isLogInUser( isAuth().user, post.postedBy )
    // const haveImage = post.photo
// console.log('passed comments: ', comments)
// console.log('comments.length: ', comments.length)
    return (
            user.name === undefined ? 
            <CircularIndeterminate /> :

            <Card className={classes.card}>
                <div className={classes.cardDetails}>            
                    <CardContent >
                        {   // display schoolAvatar only when this user is a tutor
                            isTutor && 
                            <Grid container justify="center" alignItems="center">
                                <Avatar className={classes.schoolAvatar}>
                                    <School />
                                </Avatar>
                            </Grid>
                        }
                        <Typography className={ classes.title } component="h2" variant="h2">
                            { user.name }
                        </Typography>
                        <Typography className={ classes.email } variant="subtitle1" color="primary">
                            <p className='font-italic' >
                                { user.email }
                            </p>
                        </Typography>
                        <Typography className={ classes.name } variant="subtitle1" color="textSecondary">
                            <p className='font-italic' >
                                { user.program }
                            </p>
                        </Typography>
                        {
                            isTutor &&
                            <Typography className={ classes.tutor } variant="subtitle1" color="textSecondary">
                                <p className='font-italic' >
                                    Tutor for { user.courses }
                                </p>
                            </Typography>
                        }
                        {
                            isTutor && user.followers.length > 0 &&
                            <Typography className={ classes.follower } variant="subtitle1" color="textSecondary">
                                <p className='font-italic' >
                                    { user.followers.length } students follows { user.name }
                                </p>
                            </Typography>
                        }
                        {
                            isLogInUser ? 
                            <EditDeleteButtons  userId={ user._id } /> :

                            isTutor &&
                            <FollowUnFollowButtons 
                                follow={ follow } 
                                clickHandler={ followHandler }  
                            />
                        } 
                        <hr/>
                        {   // Display image if it exists
                            //haveImage && 
                            <SimpleCardMedia   
                                image={ image } title={ user.name } style={ imageStyle } 
                            />
                        }
                        <Typography className={ classes.about } variant="subtitle1" color='textPrimary' >
                            <p className='font-italic' >
                                { user.description }
                            </p>
                        </Typography>
                        {/* <Typography className={ classes.body } variant="subtitle1" paragraph>
                            { user.description }
                        </Typography> */}
                    </CardContent>
                    {   // display tutor cards only when this user is logged in
                        isLogInUser && 
                        <Grid container spacing={2} justify="center">
                            {
                                isTutor && <ShowMyStudentsButton
                                                show={ showMyStudents } 
                                                handler={ handleShowMyStudents } 
                                           />
                            }
                            <ShowMyTutorsButton 
                                show={ showMyTutors } 
                                handler={ handleShowMyTutor } 
                            />
                        </Grid>
                    }
                    {   // display a list of tutors this user follows
                        showMyTutors && <SubView follows={ user.follows } />
                    }
                    {   // display a list of students who follows this user
                        isTutor && showMyStudents && <SubView followers={ user.followers } />
                    }
                    {   // back to tutors or members page
                        isTutor ? 
                        <DefaultCardActions label='Back to Tutors' to='/tutors' /> :
                        <DefaultCardActions label='Back to Members' to='/users' />
                    }
                    <hr style={ { marginLeft: '15px', marginRight: '15px' } } />
                </div>
                { isTutor && <ShareAboutTutor handler={ shareButtonHandler } /> }
                {   // display comment section if this user is a tutor
                    isTutor && share &&

                    <div style={ { paddingBottom: '30px' } } >
                        <NewComment 
                            _id={ user._id } 
                            onNewComment={ commentHandler } 
                            isTutor={ isTutor }
                        />
                        {   // display the list of comments if there is at least 1 comment
                            comments.length > 0 && 
                            <Comments 
                                _id={ user._id }
                                comments={ comments } 
                                isPost={ false }
                                // onDeleteComment={ commentHandler } 
                                //onModifiedComment={ modifiedCommentHandler }
                                onComment={ commentHandler }
                                isTutor={ isTutor }
                            /> 
                        }
                        {
                            comments.length > 4 && 
                            <DefaultCardActions 
                                label='Back to Tutors' 
                                to='/tutors'
                                style={ { paddingTop: '20px' } } 
                            />
                        }
                    </div>
                }
            </Card>
    ) // return
} // ProfileLayout

export default ProfileLayout;