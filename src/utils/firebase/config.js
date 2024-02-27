import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, doc, deleteDoc, addDoc, onSnapshot } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyASaNSOxgc19QGgO9Tc-z4aoJxGIi1dKHI',
  authDomain: 'restaurant-d6a71.firebaseapp.com',
  projectId: 'restaurant-d6a71',
  storageBucket: 'restaurant-d6a71.appspot.com',
  messagingSenderId: '758606231414',
  appId: '1:758606231414:web:82fc3a61b91b5ece41ec57',
  measurementId: 'G-2JBWF682GE',
}

// init firebase app
initializeApp(firebaseConfig)

// init services
const db = getFirestore()

// collection ref
const colRef = collection(db, 'menu-items')

// get collection data
getDocs(colRef)
  .then((snapshot) => {
    let menuItems = []
    snapshot.docs.forEach((doc) => {
      menuItems.push({ ...doc.data(), id: doc.id })
    })
    console.log(menuItems)
  })
  .catch((err) => {
    console.log(err.message)
  })

//   adding document
// addDoc(colRef, {
//     ..itemData
// })

// Deleting a document
// const docRef = doc(db, 'menu-items', id)
// deleteDoc(docRef)

onSnapshot(colRef, () => {})
