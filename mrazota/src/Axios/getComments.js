import axios from 'axios';

const url = `${process.env.REACT_APP_AXIOS_URL}/comments`;

const getComments = async () => {
  try {
    const response = await axios.get(url);
    return response;
  } catch (error) {
    console.error('Не удалось получить сплетни... Ну и правильно, нехуй!', error);
  }
}


export default getComments;