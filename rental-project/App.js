import React, { useEffect } from "react";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { database } from "./firebaseConfig";
import RootNavigator from "./navigation/RootNavigator";

export default function App() {
  // useEffect(() => {
  //   // Write data to the Firebase Realtime Database
  //   const writeData = async () => {
  //     try {
  //       await set(ref(database, "test/"), {
  //         name: "Test User",
  //         age: 30,
  //       });
  //       console.log("Data written to Firebase");
  //     } catch (error) {
  //       console.error("Error writing to Firebase:", error);
  //     }
  //   };

  //   // Read data from the Firebase Realtime Database
  //   const readData = () => {
  //     const testRef = ref(database, "test/");
  //     onValue(testRef, (snapshot) => {
  //       const data = snapshot.val();
  //       console.log("Data read from Firebase:", data);
  //     });
  //   };

  //   writeData();
  //   readData();
  // }, []);

  return <RootNavigator />;
}
