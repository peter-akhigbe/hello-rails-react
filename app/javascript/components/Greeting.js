import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRandomGreeting } from '../redux/randomGreetingSlice';

function Greeting() {
  const dispatch = useDispatch();
  const { greeting, status, error } = useSelector(
    (state) => state.randomGreeting,
  );

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchRandomGreeting());
    }
  }, [dispatch, status]);

  return (
    <div>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'succeeded' && <h1>{greeting}</h1>}
      {status === 'failed' && <p>Error: {error}</p>}
    </div>
  );
}

export default Greeting;
