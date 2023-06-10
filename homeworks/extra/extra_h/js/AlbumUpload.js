// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getStorage, ref, getDownloadURL, listAll } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-storage.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDp66XwmXPjZ_QBzYZyc-Sl76fp5bVT0NM",
    authDomain: "galleryapp-6d907.firebaseapp.com",
    projectId: "galleryapp-6d907",
    storageBucket: "galleryapp-6d907.appspot.com",
    messagingSenderId: "126127482908",
    appId: "1:126127482908:web:ea3c101bbe26afd10757d9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// Create a reference under which you want to list
const listRef = ref(storage, 'images/');

let list = [];

listAll(listRef)
    .then((res) => {
        res.items.forEach((itemRef) => {
            list.push(itemRef.name);
        });
    }).catch((error) => {
        // Uh-oh, an error occurred!
    });

function getNewImage(field) {
    
    getDownloadURL(ref(storage, 'images/'+list[0]))
        .then((url) => {

            console.log(url);
            const canvasDraw = field.querySelector('.draw');
            const ctxDraw = canvasDraw.getContext("2d", { willReadFrequently: true });

            album.clear();
            let image = new Image();
            image.src = url;
            image.onload = function () {

                let width = canvasDraw.width;
                let height = canvasDraw.height;
                let imgWidth = image.width;
                let imgHeight = image.height;
                let kX = image.width / width;
                let kY = image.height / height;
                if (kX <= kY) {
                    imgWidth = Math.floor(image.width / kY);
                    imgHeight = height;
                }
                else {
                    imgWidth = width;
                    imgHeight = Math.floor(image.height / kX);
                }
                ctxDraw.drawImage(image, 0, 0, imgWidth, imgHeight);
                album.loadImage(ctxDraw.getImageData(0, 0, width, height), width, height);
            }

        })
        .catch((error) => {
            console.log(error);
        });
}
