'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';

const Control = () => {
  const params = useParams();
  const id = params.id;
  const route = useRouter();
  return (
    <ul>
      <li>
        <Link href='/create'>Create</Link>
      </li>
      {id ? (
        <>
          <li>
            <Link href={'/update/' + id}>Update</Link>
          </li>
          <li>
            <input
              type='button'
              value='delete'
              onClick={() => {
                const options = { method: 'DELETE' };
                fetch(process.env.NEXT_PUBLIC_API_URL + 'topics/' + id, options)
                  .then(res => res.json())
                  .then(result => {
                    route.refresh();
                    route.push('/');
                  });
              }}
            />
          </li>
        </>
      ) : null}
    </ul>
  );
};

export default Control;
