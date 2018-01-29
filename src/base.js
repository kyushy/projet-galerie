var firebase = require('firebase');

var app = firebase.initializeApp({
    apiKey: "AIzaSyDxDJWgyaqEndd39Z1eMwD9PsAID6N7fuo",
    authDomain: "mbds-galerie.firebaseapp.com",
    databaseURL: "https://mbds-galerie.firebaseio.com",
    storageBucket: "mbds-galerie.appspot.com",
    messagingSenderId: "759092493318"
});

export default app;