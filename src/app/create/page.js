'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

const Create = () => {
  const route = useRouter();
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        const title = e.target.title.value;
        const body = e.target.body.value;
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, body }),
        };
        fetch(process.env.NEXT_PUBLIC_API_URL + `topics`, options)
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
        <input type='text' name='title' placeholder='title' />
      </p>
      <p>
        <textarea name='body' placeholder='body'></textarea>
      </p>
      <p>
        <input type='submit' value='create' />
      </p>
    </form>
  );
};

export default Create;
