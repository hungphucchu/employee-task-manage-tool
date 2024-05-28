import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDtyntvA2Pt655TUvSXfHXlhmCZ3HFBo3w",
  authDomain: "tool-manage-94e6a.firebaseapp.com",
  databaseURL:
    "https://tool-manage-94e6a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "tool-manage-94e6a",
  storageBucket: "tool-manage-94e6a.appspot.com",
  messagingSenderId: "582408028589",
  appId: "1:582408028589:web:ce0977f10df34cd7b12124",
  measurementId: "G-159F7YRR60",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
