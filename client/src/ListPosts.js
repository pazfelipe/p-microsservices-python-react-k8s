import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ListComments from './ListComments';

const ListPosts = () => {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getPosts = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000');
      setPosts(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setLoading(true);
    getPosts();
  }, []);

  const contentPost = Object.values(posts).map((post) => {
    return (
      <div
        key={post.id}
        className='card'
        style={{ width: '30%', marginBottom: '20px' }}
      >
        <div className='card-body'>
          <h3>{post.title}</h3>
          <hr />
          <ListComments postId={post.id} />
        </div>
      </div>
    );
  });

  return loading
    ? <div>Carregando posts ... </div>
    : <div className="d-flex flex-row flex-wrap justify-content-between">
      {contentPost}
    </div>;
};

export default ListPosts;