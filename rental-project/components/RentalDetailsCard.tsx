import {
  primaryBlue,
  primaryWhite,
  primaryYellow,
  shadowGray,
} from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";

export function RentalDetailsCard({ data }) {
  return (
    <View style={styles.Container}>
      <View style={styles.ContainerColumn}>
        <View>
          <Text style={{ fontSize: 21, fontWeight: 600, marginBottom: 3 }}>
            {data?.assetName}
          </Text>
          <Text
            style={{ color: primaryBlue, fontWeight: 600 }}
          >{`Rs ${data?.rentalAmount}`}</Text>
          <Text style={{ fontWeight: 600 }}>{data?.rentalPeriod}</Text>
          <Text style={{ fontWeight: 600 }}>01/01/23 - 01/01/24</Text>
        </View>

        <View style={{ marginBottom: 60 }}>
          <View style={styles.PhoneContainer}>
            <Ionicons name="call" size={10} />
            <Text>{` +9231654987`}</Text>
          </View>
          {/* <TouchableOpacity>
            <View
              style={[
                styles.ButtonContainer,
                { backgroundColor: primaryYellow },
              ]}
            >
              <Text style={styles.ButtonText}>Add Expense</Text>
            </View>
          </TouchableOpacity> */}
        </View>
      </View>

      <View style={styles.ContainerColumn}>
        <View>
          <Text
            style={[styles.TenantHeading, { marginBottom: 5, fontWeight: 500 }]}
          >
            * 20% increment/6 months
          </Text>

          <View style={styles.AmountContainer}>
            <Text style={styles.TenantHeading}>Tenant Name: </Text>
            <Text style={styles.TenantText}>{`${data?.tenantFirstName} ${data?.tenantLastName}`}</Text>
          </View>

          <View style={styles.AmountContainer}>
            <Text style={styles.TenantHeading}>Tenant Email: </Text>
            <Text style={styles.TenantText}>{data?.tenantEmailAddress}</Text>
          </View>

          <View style={styles.AmountContainer}>
            <Text style={styles.TenantHeading}>Tenant Address: </Text>
            <Text style={styles.TenantText}>{data?.tenantAddress}</Text>
          </View>
        </View>

        {/* <View>
          <TouchableOpacity>
            <View
              style={[styles.ButtonContainer, { backgroundColor: primaryBlue }]}
            >
              <Text style={styles.ButtonText}>Add Payment</Text>
            </View>
          </TouchableOpacity>
        </View> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: primaryWhite,
    height: 160,
    marginHorizontal: 15,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 5,
    shadowColor: shadowGray,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 3,
  },
  ContainerColumn: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  PhoneContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 6,
    marginTop: 15,
  },
  ButtonContainer: {
    padding: 8,
    borderRadius: 8,
    marginBottom: 10,
  },
  ButtonText: {
    display: "flex",
    justifyContent: "center",
    fontWeight: 600,
  },
  AmountContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 3,
  },
  TenantHeading: {
    fontSize: 13,
    fontWeight: 400,
  },
  TenantText: {
    fontSize: 13,
    fontWeight: 500,
  }
});
