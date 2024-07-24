import React, { useEffect, useState } from "react";
import { DetailsBar } from "../components/DetailsBar";
import { FilterAssets } from "../components/FilterAssets";
import { PageHeader } from "../components/PageHeader";
import { RentalDetailsCard } from "../components/RentalDetailsCard";
import { SearchBar } from "../components/SearchBar";
import { ScrollView } from "react-native-gesture-handler";
import { database, goOnline} from "../firebaseConfig";
import { onValue, ref } from "firebase/database";

const RentalView = () => {
  const rentalsRef = ref(database);
  const [rentalsList, setRentalsList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    // goOnline(database);
    onValue(rentalsRef, (snapshot) => {
      const rentalsData = snapshot.val();
      setRentalsList(rentalsData);
    });
  }, []);

  useEffect(() => {
    if (rentalsList) {
      const dataArray = Object.keys(rentalsList).map((key) => ({
        id: key,
        ...rentalsList[key],
      }));
      setFilteredList(
        dataArray.filter((data) => data?.assetStatus === "Rented")
      );
    }
  }, [rentalsList]);

  return (
    <ScrollView>
      <PageHeader pageTitle="Home" />
      {/* <DetailsBar /> */}
      {/* <FilterAssets /> */}
      {/* <SearchBar /> */}
      {filteredList.map((data) => (
        <RentalDetailsCard data={data} />
      ))}
    </ScrollView>
  );
};

export default RentalView;
