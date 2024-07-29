import { initializeApp } from "firebase/app";
import { getDatabase, goOnline, goOffline } from "firebase/database";
import 'react-native-get-random-values';

const firebaseConfig = {
  apiKey: "XXXXX_XXXXXXX_XXXXX",
  authDomain: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  databaseURL: "xxxxxxxxxxxxxxxxxxxxxxxxxx",
  projectId: "xxxxxxxxxx",
  storageBucket: "xxxxxxxxxx.xxxxx.com",
  messagingSenderId: "xxxxxxxxxxx",
  appId: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
goOnline (database)
database.persistenceEnabled = true;

export { database, goOffline, goOnline };
