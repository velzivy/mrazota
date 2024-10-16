import React, { useEffect, useState } from 'react';
import classes from './Chat.module.css';

import axios from 'axios';

import handleChange from '../../../Utils/handleChange';

import avatar from '../../../Recources/UserAvatar.jpg';

import Comment from '../../Comment/Comment';
import getComments from '../../../Axios/getComments';

function Chat() {
    const [dataMessages, setDataMessages] = useState(null);
    const [imgLink, setImgLink] = useState(undefined);
    const [textMessage, setTextMessage] = useState('');
    const [userName, setUserName] = useState('');
    const [isAvatarVisible, setAvatarVisible] = useState(true);
    const [showFirstMessage, setShowFirstMessage] = useState(false);
    const [showSecondMessage, setShowSecondMessage] = useState(false);

    const trueMessageAvatarStyle = {
        color: '#33b93a',
        opacity: 1,
        marginTop: '15px',
        marginBottom: '15px',
        textAlign: 'center',
    };

    const falseMessageAvatarStyle = {
        color: '#ff2525',
        opacity: 1,
        marginTop: '15px',
        marginBottom: '15px',
        textAlign: 'center',
    };

    const changeAvatar = (e) => {
        e.preventDefault();

        setShowFirstMessage(true);
        setAvatarVisible(false);

        setTimeout(() => {
            setShowFirstMessage(false);
            setShowSecondMessage(true);
            setAvatarVisible(true);
        }, 3000);
    };

    const subscribe = async () => {
        try {
            const data = await axios.get(`${process.env.REACT_APP_AXIOS_URL}/chatmessages`, { timeout: 30000 });
            setDataMessages([...dataMessages, data]);
            await subscribe()
        } catch (error) {
            console.error(error);
            setTimeout(() => {  
                subscribe();
            }, 1000);
        }
    };

    const sendMessage = async (e) => {
        try {
            await axios.post(`${process.env.REACT_APP_AXIOS_URL}/chatmessages`, {
                name: userName,
                message: textMessage,
            });
            setTextMessage('');
            console.log(dataMessages)
        } catch (error) {
            console.error("Ошибка при отправке сообщения:", error);
        }
    };

    const getData = async () => {
        const data = await getComments();
        setDataMessages(data);
    }

    console.log(dataMessages)

    useEffect(() => {
        getData();
        subscribe();

    }, []);


    return (
        <div className={classes.Chat__wrapper}>
            <div>
                <div>
                    {dataMessages?.data?.map(message => (
                        <Comment
                            key={message?.id} 
                            text={message?.text}
                            userName={message?.name}
                            date={new Date(message?.date ).toLocaleString()} 
                        />
                    ))}
                </div>
            </div>

            <div className={classes.Chat__Title}>
                <h1>Mrazota.kz</h1>
                <p>Мразятки - тебе видимо сюда :)</p>
            </div>

            <div className={classes.Chat__form}>
                <form action="">
                    <div className={classes.Chat__AvatarBlock}>
                        {isAvatarVisible ? (
                            <img src={avatar} alt="avatar" />
                        ) : (
                            <img src={imgLink} alt="avatar" />
                        )}
                        <input
                            onChange={handleChange(setUserName)}
                            value={userName}
                            placeholder="А мразям вообще нужны имена?"
                            type="text"
                        />
                    </div>

                    <input
                        onChange={handleChange(setImgLink)}
                        value={imgLink}
                        placeholder="Вставь ссылку на аву, чо как мразь?)"
                        type="text"
                    />

                    {showFirstMessage && (
                        <p style={trueMessageAvatarStyle}>Красивая, но...</p>
                    )}
                    {showSecondMessage && (
                        <p style={falseMessageAvatarStyle}>
                            Ты же мразь, Какая тебе аватарка!? Хах...) Расмешил :) Соси писю
                        </p>
                    )}


                    {showSecondMessage ? <></> : <button onClick={changeAvatar}>Ну-ка, посмотрим на твою аву</button>}

                    <textarea
                        value={textMessage}
                        onChange={handleChange(setTextMessage)}
                        placeholder='буквы ты писать умеешь (я надеюсь...)'
                        type="text"
                    />
                     { userName && textMessage ? <button onClick={sendMessage}>Поныть</button> : <button disabled>Чел ты... Хочешь отправить пустое сообщение..?</button>}
                </form>
            </div>
        </div>
    );
}

export default Chat;
