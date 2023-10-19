import { initializeApp } from "firebase/app";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDkmWxtP-qgKTkkOy0nW2P1j3UHZl6T61U",
    authDomain: "cakeshop-7d3fa.firebaseapp.com",
    projectId: "cakeshop-7d3fa",
    storageBucket: "cakeshop-7d3fa.appspot.com",
    messagingSenderId: "720649489346",
    appId: "1:720649489346:web:ff90194ec06114930fa45b"
};



// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export { firebaseApp, firebaseConfig };