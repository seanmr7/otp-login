import { initializeApp } from 'firebase/app'
import { getAuth, RecaptchaVerifier } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyA1GwLDE6BO52ioN9h2beDUTugde-pE3hU',
  authDomain: 'otp-feature.firebaseapp.com',
  projectId: 'otp-feature',
  storageBucket: 'otp-feature.appspot.com',
  messagingSenderId: '877405151730',
  appId: '1:877405151730:web:3f9077cccf74ea0527cb6b',
  measurementId: 'G-K1BWC5CVZG',
}

// Initialize Firebase
initializeApp(firebaseConfig)
const auth = getAuth()
auth.languageCode = 'en'

export { auth }
