"use strict";
var angularfire2_1 = require('angularfire2');
var firebaseConfig = {
    apiKey: 'AIzaSyATVo4-ToKFGqopE4MMQbqeWSO70Dn_9hE',
    authDomain: 'learning-journal.firebaseio.com',
    databaseURL: 'https://learning-journal.firebaseio.com',
    storageBucket: 'learning-journal.appspot.com'
};
var firebaseAuthConfig = {
    method: angularfire2_1.AuthMethods.Popup,
    remember: 'default'
};
exports.FirebaseModule = angularfire2_1.AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig);
//# sourceMappingURL=index.js.map