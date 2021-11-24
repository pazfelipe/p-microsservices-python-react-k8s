import React from 'react';
import axios from 'axios';

const CreatePost = () => {
  const [title, setTitle] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000', {
      title
    });
    setTitle('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label className='form-control'>Título do post</label>
          <input className='form-control' value={title} onChange={e => setTitle(e.target.value)}></input>
        </div>
        <button className='btn btn-primary' type='submit'>Cadastrar</button>
      </form>
    </div>
  );
};

export default CreatePost;