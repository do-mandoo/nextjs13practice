'use client';

import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Update = () => {
  const route = useRouter();
  const params = useParams();
  const id = params.id;

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  useEffect(() => {
    fetch(`http://localhost:9999/topics/${id}`)
      .then(res => res.json())
      .then(result => {
        setBody(result.body);
        setTitle(result.title);
      });
  }, []);
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        const title = e.target.title.value;
        const body = e.target.body.value;
        const options = {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, body }),
        };
        fetch(process.env.NEXT_PUBLIC_API_URL + `topics/` + id, options)
          .then(res => res.json())
          .then(result => {
            console.log(result);
            const lastId = result.id;
            route.refresh();
            route.push(`/read/${lastId}`); // redirection하는 부분
          });
      }}
    >
      <p>
        <input
          type='text'
          name='title'
          placeholder='title'
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </p>
      <p>
        <textarea
          name='body'
          placeholder='body'
          value={body}
          onChange={e => setBody(e.target.value)}
        ></textarea>
      </p>
      <p>
        <input type='submit' value='update' />
      </p>
    </form>
  );
};

export default Update;
