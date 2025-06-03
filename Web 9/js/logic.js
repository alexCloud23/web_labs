const artists = [
  "the weeknd",
  "Beyonce",
  "radiohead",
  "Daft Punk",
  "tame impala",
  "Arctic Monkeys",
  "kendrick lamar",
  "Lana Del Rey",
  "JPEGMAFIA",
  "MF DOOM"
];

function getOriginalArtists() {
  return artists;
}

function getProcessedArtists() {
  return artists
    .map(a => a.charAt(0).toUpperCase() + a.slice(1).toLowerCase())
    .sort();
}

module.exports = { getOriginalArtists, getProcessedArtists }; 