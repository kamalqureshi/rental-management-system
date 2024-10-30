import React, { useEffect, useState } from "react";
import { PageHeader } from "../components/PageHeader";
import { Card } from "../components/Card";
import { ScrollView } from "react-native";
import { AddButton } from "../components/AddButton";
import { database } from "../firebaseConfig";
import { onValue, ref } from "firebase/database";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function AssetView() {
  const assetsRef = ref(database);
  const [assetsList, setAssetsList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    onValue(assetsRef, (snapshot) => {
      const assetsData = snapshot.val();
      setAssetsList(assetsData);
    });
  }, []);

  const getFilteredList = async(dataArray) => {
    const emailPromise = await AsyncStorage.getItem('@email').then(email => {
      return email
    })
    setFilteredList(
      dataArray.filter((data) => {
        return data.type === "Asset" && data?.userEmail === emailPromise})
    );
  }

  useEffect(() => {
    if (assetsList) {
      const dataArray = Object.keys(assetsList).map((key) => ({
        id: key,
        ...assetsList[key],
      }));
      getFilteredList(dataArray)
    }
  }, [assetsList]);

  return (
    <>
      <PageHeader pageTitle="Assets" />
      <ScrollView>
        {filteredList.map((asset) => (
          <Card isAsset={true} data={asset} />
        ))}
        <AddButton label="Add Asset" isAsset={true} />
      </ScrollView>
    </>
  );
}
