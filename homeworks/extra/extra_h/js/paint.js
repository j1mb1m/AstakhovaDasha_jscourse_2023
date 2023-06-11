import { Album } from "./Album.js";
import { AlbumView } from "./AlbumView.js";
import { AlbumSound } from "./AlbumSound.js";
import { AlbumStorage } from "./AlbumStorage.js";
import { AlbumController } from "./AlbumController.js";


const field = document.getElementById('field1');
const album = new Album();
const albumView = new AlbumView(field);
const albumSound = new AlbumSound();
const albumStorage = new AlbumStorage();
const albumController = new AlbumController();

album.start(albumStorage, albumView, albumSound);
albumView.start(album);
albumSound.start();
albumStorage.start(album);
albumController.start(album, field);
albumView.showColorSet(); 
