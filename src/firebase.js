import app from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'


  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDZ2VFH5LZClxxoCG5ImD28D2hCX6HCe3w",
    authDomain: "crud-react-3c372.firebaseapp.com",
    projectId: "crud-react-3c372",
    storageBucket: "crud-react-3c372.appspot.com",
    messagingSenderId: "68240598107",
    appId: "1:68240598107:web:bac0085d250e8f4da2cb7e"
  };
  // Initialize Firebase
  app.initializeApp(firebaseConfig);

  const db = app.firestore()
  const auth = app.auth()

  export {db,auth}
