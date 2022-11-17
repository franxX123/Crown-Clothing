import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  doc,
  getFirestore,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyDDU4V-_QV3M8GyhC9SVieRTDM4dbiT0Yk",
//   authDomain: "crwn-clothing-db-98d4d.firebaseapp.com",
//   projectId: "crwn-clothing-db-98d4d",
//   storageBucket: "crwn-clothing-db-98d4d.appspot.com",
//   messagingSenderId: "626766232035",
//   appId: "1:626766232035:web:506621582dab103a4d08d6",
// };

const firebaseConfig = {
  apiKey: "AIzaSyCgMhVnYd_dJ-9kLGBlX4eLIlnFMG2etk0",
  authDomain: "crown-clothing-db-38534.firebaseapp.com",
  projectId: "crown-clothing-db-38534",
  storageBucket: "crown-clothing-db-38534.appspot.com",
  messagingSenderId: "108373338158",
  appId: "1:108373338158:web:82a240c7de73dcea18d7bf",
};

const firebaseApp = initializeApp(firebaseConfig);

// IMPORTANT: Think the database db as a tree rooted at db, then
// a bunch of collection branches, and then documents under it, and so on

// This function allows us to write information to our firebase db
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToUpload
) => {
  const collectionRef = collection(db, collectionKey);

  // batch allows us to perform transactions with the given db
  // which include operations like set, get, and so on.
  const batch = writeBatch(db);

  objectsToUpload.forEach((obj) => {
    const docRef = doc(collectionRef, obj.title.toLowerCase());
    batch.set(docRef, obj);
  });

  await batch.commit();
  console.log("done");
};

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  console.log(userAuth);
};

export const auth = getAuth();

export const signInWithGooglePopup = async () =>
  signInWithPopup(auth, provider);

export const signIn = async (email, password) => {
  if (!email || !password) return;
  return signInWithEmailAndPassword(auth, email, password);
};

export const db = getFirestore();

export const createUserDocument = async (user, additionalInfo = {}) => {
  // NOTE: userDocRef is a reference to some document in firestore
  // userDocRef(database, collectionName, documentId)
  console.log(user);
  const userDocRef = doc(db, "users", user.uid);

  // NOTE: a snapshot is some data obtained from the reference to a particular document
  // This returns either an empty object or a non-empty one. USed for checking content in document reference
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const createdAt = new Date();
    const { email, displayName } = user;

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo,
      });
    } catch (error) {
      console.log("There was an error creating a user document", error);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

// IMPORTANT: Creates permanent Observer that looks notices the changes made in auth
// and uses the callback function passed.
export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const documents = querySnapshot.docs.reduce((acc, document) => {
    const { title, items } = document.data();
    // console.log(document.data());
    acc[title.toLowerCase()] = items;
    return acc;
    // always return the accumulator to update it
  }, {});

  return documents;
};
