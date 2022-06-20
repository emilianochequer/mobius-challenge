import React from 'react';
import { useQuery } from 'react-query';

import { getBand } from '../actions';
const key = 'artist';

export default function SearchBar({
  albumsBand,
  setAlbumsBand,
  setGroup,
  name,
  setName,
}) {
  const { refetch } = useQuery([key, name], () => getBand(name), {
    enabled: false,
    onSuccess: (data) => {
      setGroup(data);
    },
  });

  function handleInputChange(e) {
    e.preventDefault(e);
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    refetch();
    if (albumsBand.length) {
      setAlbumsBand([]);
    }
  }

  return (
    <div>
      <input
        className="focus:ring-2 focus:ring-black-900 focus:outline-none appearance-none w-48 text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm"
        type="text"
        placeholder="Name..."
        onChange={handleInputChange}
      />
      <button
        className="h-10 px-6 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-gray-700 ml-5"
        onClick={handleSubmit}
      >
        Search
      </button>
    </div>
  );
}
