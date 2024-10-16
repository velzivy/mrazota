import React from 'react'

import ArrowImage from '../../../Recources/Arrow.jpg';
import AudioRofl from '../../../Recources/nahui.mp3';

import classes from './ErrorPage.module.css';
import { useNavigate } from 'react-router-dom';

function ErrorPage() {

    const navigate = useNavigate();


  return (
    <div className={classes.ErrorPage__wrapper}>
    <h1>Ой... Ты помоему не туда попал... Давай-ка я дам тебе совет!</h1>
    <img src={ArrowImage} alt="" />
        <div>
            <audio onPlay={() => setTimeout(() => navigate('/'), 2000)} src={AudioRofl} controls></audio>
        </div>
    </div>
  )
}

export default ErrorPage