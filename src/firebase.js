import * as firebase from 'firebase'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/database'

var firebaseConfig = {
    apiKey: "AIzaSyAAGRLg84Na3ETO3fay7GT0eFFAhoQBjbA",
    authDomain: "e-store-8593c.firebaseapp.com",
    databaseURL: "https://e-store-8593c.firebaseio.com",
    projectId: "e-store-8593c",
    storageBucket: "e-store-8593c.appspot.com",
    messagingSenderId: "18395114383",
    appId: "1:18395114383:web:a74de06528eeb1882b39fa"
  };


firebase.initializeApp(firebaseConfig);

export default firebase