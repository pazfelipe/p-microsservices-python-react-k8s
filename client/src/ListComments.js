import axios from 'axios';
import React, { useState, useEffect } from 'react';
import CreateComment from './CreateComment';

const ListComments = ({ postId }) => {
  const [comments, setComments] = useState([]);


  const getComments = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5001/posts/${postId}/comments`);

      if (!data) {
        setComments([]);
        return;
      }
      setComments(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getComments();
  }, []);

  const renderedComments = comments.map(comment => {
    if (comment.content) {
      return <li key={comment.id}>
        <p>{comment.content}</p>
      </li>;
    }
    return null;
  });

  const content = comments.length
    ? <ul style={{ height: '150px', overflowY: 'auto' }}>
      {renderedComments}
    </ul>
    : null;

  return (
    <div >
      <h5>Comentários</h5>
      {content}
      <div className='card'>
        <div className='card-body'>
          <CreateComment postId={postId} />
        </div>
      </div>
    </div>
  );
};

export default ListComments;