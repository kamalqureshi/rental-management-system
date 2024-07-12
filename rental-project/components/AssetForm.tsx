import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Switch,
} from "react-native";
import { PageHeader } from "../components/PageHeader";
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation, useRoute } from "@react-navigation/native";
import { v4 as uuidv4 } from "uuid";
import { database } from "../firebaseConfig";
import { getDatabase, ref, set, onValue, update } from "firebase/database";

const AssetForm = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params || {};

  const [assetName, setAssetName] = useState("");
  const [assetAddress, setAssetAddress] = useState("");
  const [assetDesc, setAssetDesc] = useState("");
  const [rentalAmount, setRentalAmount] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);

  // Asset Dropdown
  const [assetTypeItems, setAssetTypeItems] = useState([
    { label: "House", value: "House" },
    { label: "Condo", value: "Condo" },
    { label: "Apartment", value: "Apartment" },
  ]);
  const [assetTypeOpen, setAssetTypeOpen] = useState(false);
  const [assetTypeValue, setAssetTypeValue] = useState(null);

  //Status Dropdown
  const [statusItems, setStatusItems] = useState([
    { label: "Rented", value: "Rented" },
    { label: "Available", value: "Available" },
  ]);
  const [statusOpen, setStatusOpen] = useState(false);
  const [statusValue, setStatusValue] = useState(null);

  //Rental Period Dropdown
  const [rentalPeriodItems, setRentalPeriodItems] = useState([
    { label: "Weekly", value: "Weekly" },
    { label: "Bi-Weekly", value: "Bi-Weekly" },
    { label: "Monthly", value: "Monthly" },
    { label: "Annually", value: "Annually" },
  ]);
  const [rentalPeriodOpen, setRentalPeriodOpen] = useState(false);
  const [rentalPeriodValue, setRentalPeriodValue] = useState(null);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const handleSubmit = async () => {
    const assetId = uuidv4();
    try {
      id
        ? await update(ref(database, `asset-${id}`), {
            assetType: assetTypeValue,
            assetName: assetName,
            assetAddress: assetAddress,
            assetDesc: assetDesc,
            assetStatus: statusValue,
            rentalAmount: rentalAmount,
            rentalPeriod: rentalPeriodValue,
            isActive: isEnabled,
          })
        : await set(ref(database, `asset-${assetId}`), {
            id: assetId,
            assetType: assetTypeValue,
            assetName: assetName,
            assetAddress: assetAddress,
            assetDesc: assetDesc,
            assetStatus: statusValue,
            rentalAmount: rentalAmount,
            rentalPeriod: rentalPeriodValue,
            isActive: isEnabled,
            type: "Asset",
          });
      console.log("Asset Data written to Firebase");
    } catch (error) {
      console.error("Error writing to Firebase:", error);
    }

    setAssetName("");
    setAssetAddress("");
    setAssetDesc("");
    setRentalAmount("");
    setIsEnabled(false);
    setAssetTypeValue(null);
    setStatusValue(null);
    setRentalPeriodValue(null);

    navigation.navigate("Assets");
  };

  useEffect(() => {
    if (id) {
      const updateRef = ref(database, `asset-${id}`);
      onValue(updateRef, (snapshot) => {
        const data = snapshot.val();
        data &&
          (setAssetName(data?.assetName),
          setAssetAddress(data?.assetAddress),
          setAssetDesc(data?.assetDesc),
          setRentalAmount(data?.rentalAmount),
          setIsEnabled(data?.isActive),
          setAssetTypeValue(data?.assetType),
          setStatusValue(data?.assetStatus),
          setRentalPeriodValue(data?.rentalPeriod));
      });
    } else {
      setAssetName("");
      setAssetAddress("");
      setAssetDesc("");
      setRentalAmount("");
      setIsEnabled(false);
      setAssetTypeValue(null);
      setStatusValue(null);
      setRentalPeriodValue(null);
    }
  }, [id]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <PageHeader pageTitle="Add/Update Assets" />

        <View style={styles.container}>
          <Text style={styles.label}>Type</Text>
          <DropDownPicker
            open={assetTypeOpen}
            value={assetTypeValue}
            items={assetTypeItems}
            setOpen={setAssetTypeOpen}
            setValue={setAssetTypeValue}
            setItems={setAssetTypeItems}
            placeholder="Select a type"
            style={styles.dropdown}
            containerStyle={styles.dropdownContainer}
            dropDownStyle={styles.dropdownStyle}
            labelStyle={styles.labelStyle}
            arrowStyle={styles.arrowStyle}
          />

          <Text style={styles.label}>Asset Name*</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your asset's name"
            value={assetName}
            onChangeText={setAssetName}
          />

          <Text style={styles.label}>Address*</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter the address"
            value={assetAddress}
            onChangeText={setAssetAddress}
          />

          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, { height: 100 }]}
            placeholder="Please add description"
            value={assetDesc}
            onChangeText={setAssetDesc}
            multiline
            numberOfLines={50}
          />

          <Text style={styles.label}>Status*</Text>
          <DropDownPicker
            open={statusOpen}
            value={statusValue}
            items={statusItems}
            setOpen={setStatusOpen}
            setValue={setStatusValue}
            setItems={setStatusItems}
            placeholder="Select Status"
            style={styles.dropdown}
            containerStyle={styles.dropdownContainer}
            dropDownStyle={styles.dropdownStyle}
            labelStyle={styles.labelStyle}
            arrowStyle={styles.arrowStyle}
          />

          <Text style={styles.label}>Rental Amount*</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter the rental amount"
            value={rentalAmount}
            onChangeText={setRentalAmount}
          />

          <Text style={styles.label}>Rental Period</Text>
          <DropDownPicker
            open={rentalPeriodOpen}
            value={rentalPeriodValue}
            items={rentalPeriodItems}
            setOpen={setRentalPeriodOpen}
            setValue={setRentalPeriodValue}
            setItems={setRentalPeriodItems}
            placeholder="Select Rental Period"
            style={styles.dropdown}
            containerStyle={styles.dropdownContainer}
            dropDownStyle={styles.dropdownStyle}
            labelStyle={styles.labelStyle}
            arrowStyle={styles.arrowStyle}
          />

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.label}>Active</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>

          <Button
            title="Submit"
            onPress={handleSubmit}
            disabled={
              !(assetName && assetAddress && statusValue && rentalAmount)
            }
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    paddingBottom: 10,
  },
  dropdown: {
    borderColor: "gray",
    borderWidth: 1,
  },
  dropdownStyle: {
    backgroundColor: "#fafafa",
  },
  labelStyle: {
    fontSize: 16,
  },
  arrowStyle: {
    width: 20,
    height: 20,
  },

  container: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});

export default AssetForm;
