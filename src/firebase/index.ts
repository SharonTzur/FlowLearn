import { AngularFireModule, AuthMethods } from 'angularfire2';


const firebaseConfig = {
  apiKey: 'AIzaSyATVo4-ToKFGqopE4MMQbqeWSO70Dn_9hE',
    authDomain: 'learning-journal.firebaseapp.com',
    databaseURL: 'https://learning-journal.firebaseio.com',
    storageBucket: 'learning-journal.appspot.com'
};

const firebaseAuthConfig = {
  method: AuthMethods.Popup,
  remember: 'default'
};


export const FirebaseModule = AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig);
