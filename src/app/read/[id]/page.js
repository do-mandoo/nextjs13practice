import React from 'react';

const Read = async props => {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + `topics/${props.params.id}`, {
    cache: 'no-store',
  });
  const topic = await res.json();
  return (
    <div>
      <h2>{topic.title}</h2>
      {topic.body}
    </div>
  );
};

export default Read;
