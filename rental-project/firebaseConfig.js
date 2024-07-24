import { initializeApp } from "firebase/app";
import { getDatabase, goOnline, goOffline } from "firebase/database";

// const firebaseConfig = {
//   apiKey: "AIzaSyABgpCDuSzEw6_Zc6pDUx7sRpmHXuKQr0c",
//   authDomain: "rental-system-2f6b4.firebaseapp.com",
//   databaseURL: 'https://rental-system-2f6b4-default-rtdb.firebaseio.com',
//   projectId: "rental-system-2f6b4",
//   storageBucket: "rental-system-2f6b4.appspot.com",
//   messagingSenderId: "862030347364",
//   appId: "1:862030347364:web:3f93878a76cee8794ff371",
//   measurementId: "G-08YPXNMHV3"
// };

const firebaseConfig = {
  apiKey: "AIzaSyApj4HWYhFq-GW3KpWEd_A_bk3EAs6c22Q",
  authDomain: "rental-management-system-01.firebaseapp.com",
  databaseURL:
    "https://rental-management-system-01-default-rtdb.firebaseio.com",
  projectId: "rental-management-system-01",
  storageBucket: "rental-management-system-01.appspot.com",
  messagingSenderId: "476743866480",
  appId: "1:476743866480:web:b0d0409bd1ee52ddd8fcb5",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
goOnline (database)
database.persistenceEnabled = true;

export { database, goOffline, goOnline };
