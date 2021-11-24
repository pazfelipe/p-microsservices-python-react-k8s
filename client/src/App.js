import React from 'react';
import CreatePost from './CreatePost';
import ListPosts from './ListPosts';

const App = () => {
  return (
    <div className='container'>
      <h1>Hello World</h1>
      <CreatePost />
      <hr />
      <ListPosts />
    </div>
  );
};

export default App;