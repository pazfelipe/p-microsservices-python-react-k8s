import React from 'react';
import axios from 'axios';

const CreateComment = ({ postId }) => {
  const [title, setTitle] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`http://localhost:5001/posts/${postId}/comments`, {
      content: title
    });
    setTitle('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label className='form-control'>Inserir comentário</label>
          <input className='form-control' value={title} onChange={e => setTitle(e.target.value)}></input>
        </div>
        <button className='btn btn-primary' type='submit'>Cadastrar</button>
      </form>
    </div>
  );
};

export default CreateComment;