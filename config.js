const { initializeApp } = require('firebase/app');
const {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  deleteDoc,
} = require('firebase/firestore');
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require('firebase/storage');

const firebaseConfig = {
  apiKey: 'AIzaSyCo9lIn6Zim3kccqHsIoL-RHbiWfP-_C3g',
  authDomain: 'doclock-api.firebaseapp.com',
  projectId: 'doclock-api',
  storageBucket: 'doclock-api.firebasestorage.app',
  messagingSenderId: '1040201510950',
  appId: '1:1040201510950:web:f147d859adcb5265acf6e7',
  measurementId: 'G-K0M2V4ZG0M',
};

let app;

const initializeFirebaseApp = () => {
  try {
    app = initializeApp(firebaseConfig);
    firestoreDb = getFirestore(app);
  } catch (error) {
    console.log('Firebase app initialization failed: ', error);
  }
};

const generateId = () => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const idLength = 8;
  let id = '';
  for (let i = 0; i < idLength; i++) {
    id += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return id;
};

const uploadData = async (data) => {
  try {
    const uploaddata = {
      docid: data.docid,
      docname: data.docname,
      doclink: data.doclink,
      docpassword: data.docpassword,
    };
    const userRef = doc(firestoreDb, 'users', data.uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const userData = userSnap.data();
      if (!userData.documents) {
        userData.documents = [];
      }
      userData.documents.push(uploaddata);
      await setDoc(userRef, userData);
    } else {
      await setDoc(userRef, { documents: [uploaddata] });
    }
    return 'Data uploaded successfully';
  } catch (error) {
    console.error('Error uploading data: ', error);
  }
};
const fetchall = async (userId) => {
  try {
    const userRef = doc(firestoreDb, 'users', userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const userData = userSnap.data();
      if (userData.documents) {
        return userData.documents;
      } else {
        return [];
      }
    } else {
      return {
        status: 404,
        message: 'No User found for this User Id',
      };
    }
  } catch (error) {
    console.error('Error fetching all documents: ', error);
  }
};

const fetchData = async (userId, documentId) => {
  try {
    const userRef = doc(firestoreDb, 'users', userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const userData = userSnap.data();
      if (userData.documents) {
        const matchingData = userData.documents.find(
          (item) => item.docid === documentId
        );
        if (matchingData) {
          return matchingData;
        } else {
          return 'Not available';
        }
      } else {
        return 'Not available';
      }
    } else {
      return 'Not available';
    }
  } catch (error) {
    console.error('Error fetching data: ', error);
  }
};

const deleteDocument = async (userId, documentId) => {
  try {
    const userRef = doc(firestoreDb, 'users', userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const userData = userSnap.data();
      if (userData.documents) {
        const documentIndex = userData.documents.findIndex(
          (item) => item.docid === documentId
        );
        if (documentIndex !== -1) {
          userData.documents.splice(documentIndex, 1);
          await setDoc(userRef, userData);
          return 'Document deleted successfully';
        } else {
          return 'Document not found';
        }
      } else {
        return 'No documents found for this user';
      }
    } else {
      return 'No user found for this userId';
    }
  } catch (error) {
    console.error('Error deleting document: ', error);
    return 'Error deleting document';
  }
};

const deleteUser = async (userId) => {
  try {
    const userRef = doc(firestoreDb, 'users', userId);
    await deleteDoc(userRef);
    return 'User deleted successfully';
  } catch (error) {
    console.error('Error deleting user: ', error);
    return 'Error deleting user';
  }
};
const getFirebaseApp = () => app;
module.exports = {
  initializeFirebaseApp,
  getFirebaseApp,
  getFirestore,
  uploadData,
  fetchData,
  fetchall,
  deleteDocument,
  deleteUser,
};
