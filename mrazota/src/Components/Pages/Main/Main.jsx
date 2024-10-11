import React, { useEffect, useState } from 'react'

import classes from './Main.module.css'

import Comment from '../../Comment/Comment'
import getComments from '../../../Axios/getComments'
import CreateComments from '../../../Axios/CreateComments';

function Main() {
    console.log(process.env.AXIOS_URL)
    const [ CommentsData, setCommentsData ]  = useState(null);
    const [ name, setName ]  = useState('');
    const [ text, setText ]  = useState('');

    const getData = async () => {
        const data = await getComments();
        setCommentsData(data);
    }

    const PostData = async (e) => {
        await CreateComments(name, text);
        setName('')
        setText('')
        e.preventDefault() 
    }

    const handleChange = (setState) => (event) => {
        setState(event.target.value);
      };

    useEffect(() => {
        getData();
    }, [])

  return (
    <div>
        <h1 className={classes.Main__Title}>Mrazota.kz</h1>

        <div className={classes.Main__FormWrapper}>
            <form className={classes.Main__Form} action="">
                <input value={name} onChange={handleChange(setName)} placeholder='Как тебя зовут мразь?' className={classes.Main__input} type="text" />
                <textarea value={text} onChange={handleChange(setText)} placeholder={'Ну-ка, Высри'} className={classes.Main__input} name="" id=""></textarea>
               { text && name ? <button onClick={PostData}>ДА - Я мразь, и чё?</button> : <button disabled>Дурак? Сначала напиши что-нибудь...</button>}
            </form>

        </div>

        <div className={classes.Main__UsersCommentsWrapper}>
            <h2 className={classes.Main__usersPresentTitle}>Мрази которые уже что-то высрали</h2>
        </div>
        {CommentsData?.data.map((userComment) => (
            <Comment 
            key={userComment.id}
            userName={userComment.name}
            text={userComment.text}
            date={new Date(userComment.date).toLocaleString()}
            />
        ))}
    </div>
  )
}

export default Main