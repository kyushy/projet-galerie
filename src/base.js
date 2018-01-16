var Rebase = require('re-base');
var firebase = require('firebase');

var app = firebase.initializeApp({
    apiKey: "AIzaSyDxDJWgyaqEndd39Z1eMwD9PsAID6N7fuo",
    authDomain: "mbds-galerie.firebaseapp.com",
    databaseURL: "https://mbds-galerie.firebaseio.com",
});

var base = Rebase.createClass(app.database());
export default base;