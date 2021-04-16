import React from 'react';

const NotFoundScreen = () => {
  return (
    <div className='center py-5'>
      <h1 className='x-large text-primary'>
        <i className='fas fa-exclamation-triangle' /> Page Not Found
      </h1>
      <p className='large'>Sorry, this page does not exist</p>
    </div>
  );
};

export default NotFoundScreen;
