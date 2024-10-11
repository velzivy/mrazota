import React from 'react'

import avatar from '../../Recources/UserAvatar.jpg'
import TimeIcon from '../Icons/TimeIcon/TimeIcon';

import classes from './Comment.module.css';

function Comment({userName, text, date}) {
  
  return (
    <div className={classes.Comment__Wrapper}>
      <div className={classes.Comment__Container}>
        <div className={classes.Comment__Info}>
          <img className={classes.Comment__userAvatar} src={avatar} alt="" />
            <p className={classes.Comment__userName}>{userName}</p>
          <div className={classes.Comment__timeMarkBlock}>
            <TimeIcon></TimeIcon>
            <p className={classes.Comment__dateTime}>{date}</p>
          </div>
        </div>
    
        <div className={classes.Comment__text}>
          <p>{text}</p>
        </div>
      </div>
    </div>
  )
}

export default Comment;