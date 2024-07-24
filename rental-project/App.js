import React, { useEffect, useState } from "react";
import RootNavigator from "./navigation/RootNavigator";
import NetInfo from '@react-native-community/netinfo';

export default function App() {
  const [isConnected, setIsConnected] = useState(null);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    // Cleanup subscription on unmount
    return () => {
      unsubscribe();
    };

  }, [])

  useEffect(() => {
    if(isConnected) {
      console.log("Connected to the internet: ", isConnected)
    }
  }, [isConnected])

  return <RootNavigator />;
}
