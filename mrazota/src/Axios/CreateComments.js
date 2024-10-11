import axios from 'axios';

const url = `${process.env.REACT_APP_AXIOS_URL}/comments`;

const CreateComments = async (name, text) => {
  try {
    const response = await axios.post(url, {
      name: name,
      text: text,
    });
    return response;
  } catch (error) {
    console.error('Не удалось созадть сплетню (Может оно и к лучшему)', error);
  }
}


export default CreateComments;