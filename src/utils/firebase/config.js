import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyASaNSOxgc19QGgO9Tc-z4aoJxGIi1dKHI',
  authDomain: 'restaurant-d6a71.firebaseapp.com',
  projectId: 'restaurant-d6a71',
  storageBucket: 'restaurant-d6a71.appspot.com',
  messagingSenderId: '758606231414',
  appId: '1:758606231414:web:82fc3a61b91b5ece41ec57',
  measurementId: 'G-2JBWF682GE',
}

initializeApp(firebaseConfig)

// eslint-disable-next-line import/prefer-default-export
export const db = getFirestore()
