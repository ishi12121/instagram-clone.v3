import Firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getAuth, GoogleAuthProvider,signInWithPopup } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';

// import { seedDatabase } from '../seed';


const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
  };

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;
const app = Firebase.initializeApp(config);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();

const signInWithGoogle = () => {
    
    signInWithPopup(auth, provider)
        .then((result) => {
       
        console.log(result);
            const user = result.user;
            const name = result.user.displayName;
            const email = result.user.email;
            localStorage.setItem("name", name);
            localStorage.setItem("email", email);

             // Update user data in Firestore database
             const db = getFirestore(); // Get Firestore instance
             const usersCollection = collection(db, 'users'); // Reference to 'users' collection
             const userDoc = doc(usersCollection, user.uid);
          // Data to be added or updated in the document
          const userData = {
            name: name,
            email: email,
            // Add more data as needed
        };

        // Use setDoc to add or update the document
        setDoc(userDoc, userData, { merge: true })
            .then(() => {
                console.log("User data updated in Firestore");
                // Redirect to the dashboard page
                window.location.href = "/dashboard"; // Replace with your dashboard route
            })
            .catch((error) => {
                console.error("Error updating user data:", error);
            });
    })
    .catch((error) => {
        console.log(error);
    });
};


export { firebase, FieldValue,signInWithGoogle };
