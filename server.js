const express = require("express");
const fs = require("fs");
const app = express();
const databaseFile = "albumsData.json";

//FNC

function getAlbumsFromDatabase() {
  const text = fs.readFileSync(databaseFile);
  return JSON.parse(text);
}

function saveAlbumsFromDatabase(arr) {
  const text = JSON.stringify(arr, null, 2);
  fs.writeFileSync(databaseFile, text);
}

function getAlbums(req, res) {
  const albums = getAlbumsFromDatabase();
  res.send(albums);
}
function getAlbumsByID(req, res) {
  const albumId = req.params.albumId;
  const albums = getAlbumsFromDatabase();
  const album = albums.find((a) => a.albumId == albumId);
  res.send(album);
}
function saveAlbum(req, res) {
  const newAlbum = req.body;
  const albums = getAlbumsFromDatabase();
  albums.push(newAlbum);
  saveAlbumsFromDatabase(albums);

  res.status(200).send({ success: true });
}

function deleteAlbum(req, res) {
  const albumId = req.params.albumId;
  const albums = getAlbumsFromDatabase().filter((a) => a.albumId != albumId);
  saveAlbumsFromDatabase(albums);
  res.status(200).send({ success: true });
}
//MW

app.use(express.json());
app.get("/albums", getAlbums);
app.get("/albums/:albumId", getAlbumsByID);
app.post("/albums", saveAlbum);
app.delete("/albums/:albumId", deleteAlbum);

// SERVER
const port = 3000;
const url = `http://localhost:${port}/albums`;
app.listen(port, () => console.log(`Listening on port ${url}`));
