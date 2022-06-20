import axios from 'axios';

export const getBand = async (name) => {
  const { data } = await axios.get(
    `https://musicbrainz.org/ws/2/artist?query=artist:${name}&inc=mbid`
  );
  return data.artists;
};

export const getAlbumsBand = async (id) => {
    const { data } = await axios.get(`https://musicbrainz.org/ws/2/release-group?artist=${id}&inc=ratings+url-rels+artist-credits&fmt=json&limit=25`)
    const rel = "release-groups"
    return data[rel];
};
