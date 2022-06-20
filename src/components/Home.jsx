import React, { useState } from 'react';
import { getAlbumsBand } from '../actions';
import { useQuery } from 'react-query';
import SearchBar from './SearchBar';
const year = 'first-release-date';

export default function Home() {
  const [group, setGroup] = useState([]);
  const [name, setName] = useState('');
  const [albumsBand, setAlbumsBand] = useState([]);
  const [idBand, setIdBand] = useState('');

  useQuery(
    ['artist', { idBand, order: 'ASC', orderBy: 'rating.value' }],
    () => getAlbumsBand(idBand),
    {
      enabled: idBand.length > 0,
      onSuccess: (data) => {
        setAlbumsBand(data);
        setIdBand('');
      },
      queryKeyHashFn: '',
    }
  );

  function handleAlbum(id) {
    setIdBand(id['id']);
    setGroup([]);
  }

  return (
    <div className="m-10">
      <h1 className="mb-20 mt-10 flex-auto text-lg font-semibold text-slate-900 text-6xl">
        All your favorite music here
      </h1>
      <SearchBar
        albumsBand={albumsBand}
        setAlbumsBand={setAlbumsBand}
        name={name}
        setName={setName}
        setGroup={setGroup}
      />
      {!!albumsBand.length && (
        <div className="relative m-[50px] overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Album name
                </th>
                <th scope="col" className="px-6 py-3">
                  Rating
                </th>
                <th scope="col" className="px-6 py-3">
                  Year of release
                </th>
                <th scope="col" className="px-6 py-3">
                  Links
                </th>
              </tr>
            </thead>
            <tbody className="space-y-4">
              {albumsBand
                ?.sort(function (a, b) {
                  return b.rating.value - a.rating.value;
                })
                .map((p, i) => {
                  return (
                    <tr
                      key={i}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <td className="px-6 py-4">{p.title}</td>

                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <svg
                            className="w-5 h-5 text-yellow-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                          <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">
                            {p.rating.value || 'N/A'}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">{p[year]}</td>
                      <td className="px-6 py-4">
                        <div>
                          {p.relations.map(
                            (links) =>
                              links.type === 'discogs' && (
                                <div className="flex">
                                  <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Discogs_record_icon.svg/1200px-Discogs_record_icon.svg.png"
                                    jsaction="load:XAeZkd;"
                                    jsname="HiaYvf"
                                    className="h-[20px] w-[20px] mr-[5px]"
                                    alt="File:Discogs record icon.svg - Wikimedia Commons"
                                    data-noaft="1"
                                  />
                                  <a href={links.url.resource}>Discogs</a>
                                </div>
                              )
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      )}

      <ul className="">
        {group?.map((p, i) => {
          return (
            <div
              key={i}
              className="flex flex-col space-y-4 m-8 p-8 border rounded-lg border-gray-100 shadow-lg hover:shadow-2xl"
              // className="bg-green-800 py-2 px-6 text-white font-medium rounded-md"
              onClick={() => handleAlbum(p)}
            >
              <p className="font-sans">
                {p.name} {p.country ? ' (' + p.country + ')' : ''}
              </p>
              <div>
                <p className=""> {p.title}</p>
                <p className=""> {p[year]}</p>
              </div>
            </div>
          );
        })}
      </ul>
    </div>
  );
}
