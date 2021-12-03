import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBnJN03nshL_iTaokPzIzP-8DxMIgoJ1dQ",
  authDomain: "afk-nn.firebaseapp.com",
  databaseURL: "https://afk-nn-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "afk-nn",
  storageBucket: "afk-nn.appspot.com",
  messagingSenderId: "522161399276",
  appId: "1:522161399276:web:6763870764cfbc464bccc9"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
