import { initializeApp } from "firebase/app";
import { getDatabase, goOnline, goOffline } from "firebase/database";

const firebaseConfig = {
  apiKey: "XXXXXXXXX",
  authDomain: "XXXXXXXXX",
  databaseURL: "XXXXXXXXX",
  projectId: "XXXXXXXXX",
  storageBucket: "XXXXXXXXX",
  messagingSenderId: "XXXXXXXXX",
  appId: "XXXXXXXXX",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
goOnline (database)
database.persistenceEnabled = true;

export { database, goOffline, goOnline };
