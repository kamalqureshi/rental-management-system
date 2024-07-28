import React, { useEffect, useState } from "react";
import { PageHeader } from "../components/PageHeader";
import { Card } from "../components/Card";
import { ScrollView } from "react-native";
import { AddButton } from "../components/AddButton";
import { database } from "../firebaseConfig";
import { onValue, ref } from "firebase/database";

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

  useEffect(() => {
    if (assetsList) {
      const dataArray = Object.keys(assetsList).map((key) => ({
        id: key,
        ...assetsList[key],
      }));
      setFilteredList(dataArray.filter((data) => data.type === "Asset"));
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
