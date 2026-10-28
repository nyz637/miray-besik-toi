// ISO 8601 with timezone, for example YYYY-MM-DDTHH:mm:ss+05:00.
export const event = {
  date: '',
  time: '',
  venue: '',
  address: '',
  twoGisUrl: '',
  musicUrl: `${import.meta.env.BASE_URL}music.mp3`,
  // Set to an async function accepting { name, attendance, wish }.
  // Resolve only after the server confirms the response was saved.
  onRsvp: null,
};
