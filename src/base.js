var Rebase = require('re-base');
var firebase = require('firebase');

var app = firebase.initializeApp({
    apiKey: "apiKey",
    authDomain: "projectId.firebaseapp.com",
    databaseURL: "https://databaseName.firebaseio.com",
});

var base = Rebase.createClass(app.database());
export default base;