import firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDd2_R5UWyIp0rzyC2R-6qg1G_ilKH-ems",
    authDomain: "whatsappclone-2351a.firebaseapp.com",
    databaseURL: "https://whatsappclone-2351a.firebaseio.com",
    projectId: "whatsappclone-2351a",
    storageBucket: "whatsappclone-2351a.appspot.com",
    messagingSenderId: "1055630799424",
    appId: "1:1055630799424:web:c6a4e3ea9d1af12462e5a5",
    measurementId: "G-W8WJX3G9BW"
  };
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db=firebaseApp.firestore(); 
  const auth = firebase.auth();
  const provider=new firebase.auth.GoogleAuthProvider();
  export {auth, provider};
  export default db;

