import React, { useEffect, useState } from "react";
import { PageHeader } from "../components/PageHeader";
import { Card } from "../components/Card";
import { AddButton } from "../components/AddButton";
import { ScrollView } from "react-native";
import { database, goOnline } from "../firebaseConfig";
import { onValue, ref } from "firebase/database";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function TenantView() {
  const rentalsRef = ref(database);
  const [tenantsList, setTenantsList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    onValue(rentalsRef, (snapshot) => {
      const assetsData = snapshot.val();
      setTenantsList(assetsData);
    });
  }, []);

  const getFilteredList = async(dataArray) => {
    const emailPromise = await AsyncStorage.getItem('@email').then(email => {
      return email
    })
    setFilteredList(
      dataArray.filter((data) => {
        return data.type === "Tenant" && data?.userEmail === emailPromise})
    );
  }

  useEffect(() => {
    if (tenantsList) {
      const dataArray = Object.keys(tenantsList).map((key) => ({
        id: key,
        ...tenantsList[key],
      }));
      getFilteredList(dataArray)
    }
  }, [tenantsList]);

  return (
    <>
      <PageHeader pageTitle="Tenants" />
      <ScrollView>
        {filteredList.map((asset) => (
          <Card isAsset={false} data={asset} />
        ))}
        <AddButton label="Add Tenant" isAsset={false} />
      </ScrollView>
    </>
  );
}
