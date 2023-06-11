// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getStorage, ref, getDownloadURL, listAll, uploadBytesResumable } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-storage.js";


export class AlbumStorage {
    // Your web app's Firebase configuration
    firebaseConfig = {
        apiKey: "AIzaSyDp66XwmXPjZ_QBzYZyc-Sl76fp5bVT0NM",
        authDomain: "galleryapp-6d907.firebaseapp.com",
        projectId: "galleryapp-6d907",
        storageBucket: "galleryapp-6d907.appspot.com",
        messagingSenderId: "126127482908",
        appId: "1:126127482908:web:ea3c101bbe26afd10757d9"
    };
    fileURL = 'images/';
    list = [];

    #currentImage = -1;

    constructor() {
        // Initialize Firebase
        this.app = initializeApp(this.firebaseConfig);
        this.storage = getStorage(this.app);
    }

    start(model) {
        this.model = model;

        // Create a reference under which you want to list
        const listRef = ref(this.storage, this.fileURL);

        //получаем список картинок, но вообще можно было бы периодически обновлять
        listAll(listRef)
            .then((res) => {
                res.items.forEach((itemRef) => {
                    this.list.push(itemRef.name);
                });
                this.getNewImage();
            }).catch((error) => {
                console.log(error)
            });
    }

    getNewImage() {

        this.#currentImage++;

        if (this.#currentImage >= this.list.length) this.#currentImage = 0;

        getDownloadURL(ref(this.storage, this.fileURL + this.list[this.#currentImage]))
            .then((url) => {
                this.model.getImageFromURL(url);
            })
            .catch((error) => {
                if (this.#currentImage  < this.#currentImage ) {
                    this.list.slice(currImage, 1);
                }
                console.log(error);
            });

    }

    uploadImage(file) {

        if (!file) return currImage;

        let fileName = this.#renameFile(file.name);

        let storageRef = ref(this.storage, this.fileURL + fileName);
        let uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', (snapshot) => {
            let percent = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            this.model.updateProgress(percent);
        }, (error) => {
            console.log(error);
        }, () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                this.model.getImageFromURL(url);
                this.list.push(fileName);

            }).catch((error) => {
                console.log(error);
            });
        })

    }

    #renameFile(string) {
        if (!string) return string;

        let point = string.lastIndexOf('.');

        if (point === -1) return string;
        else if (point === 0) {
            return (new Date().toJSON().slice(0, 10)) + string.substr(point);
        }
        return string.substr(0, point - 1) + (new Date().getTime()) + string.substr(point);
    }
}


