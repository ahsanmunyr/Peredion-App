import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  responsiveWidth,
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveHeight,
  responsiveScreenWidth,
} from "react-native-responsive-dimensions";
import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Loader from "../../components/Loader";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HistoryScreen = () => {
  const [data, onChangeData] = useState([]);
  const [loader, onChangeLoader] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const apiHit = async () => {
    try {
      const userData = await AsyncStorage.getItem("data");
      if (userData) {
        const parseData = JSON.parse(userData);

        const res = await axios.get(
          `https://11kuda.com/api.php?deposit_history=${parseData.id}`
        );

        if (res.status) {
          // let array = [];
          // array.push(res.data.data);
          console.log(res.data, "DATA");
          onChangeData(res.data.data);
          onChangeLoader(false);
        }
      }
    } catch (err) {
      console.log(err, "ERROR");
      onChangeLoader(false);
    }
  };

  useEffect(() => {
    onChangeLoader(true);
    apiHit();
  }, []);

  if (loader) {
    return <Loader />;
  }

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          width: responsiveWidth(90),
          height: responsiveHeight(10),
          marginTop: 10,
          alignSelf: "center",
          justifyContent: "space-around",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <View
          style={{
            width: 5,
            height: 5,
            backgroundColor: "#D81254",
            borderRadius: 100,
          }}
        />
        <Text
          style={{
            fontSize: responsiveFontSize(2.5),
            color: "black",
            fontWeight: "700",
            right: 6,
          }}
        >
          Deposit History
        </Text>
        <View style={{ width: 50, height: 3, backgroundColor: "#D81254" }} />
        <TouchableOpacity
        onPress={() => { setModalVisible(true); }}
          style={{
            width: responsiveWidth(30),
            height: responsiveHeight(8),
            backgroundColor: "#87CEEB",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 8,
          }}>
          <Text style={{ fontSize: responsiveFontSize(1.4) }}>
            Make a Deposit
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        key={"#"}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{
          flex: 1,
          justifyContent: "space-around",
        }}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <LinearGradient
            key={item.id}
            colors={["#e8e8e8", "#D81254"]}
            style={[styles.largeBox, { marginVertical: 10 }]}
          >
            <View style={styles.content}>
              <Text
                style={{
                  color: "black",
                  fontSize: responsiveFontSize(2),
                  fontWeight: "600",
                  left: 10,
                }}
              >
                Transaction Type:
              </Text>
              <Text
                style={{
                  color: "black",
                  fontSize: responsiveFontSize(1.4),
                  fontWeight: "400",
                  left: 10,
                }}
              >
                {"Funds Transfers"}
              </Text>
              <View style={styles.content}>
                <Text
                  style={{
                    color: "black",
                    fontSize: responsiveFontSize(2),
                    fontWeight: "600",
                  }}
                >
                  Transaction Method:
                </Text>
                <Text
                  style={{
                    color: "black",
                    fontSize: responsiveFontSize(1.4),
                    fontWeight: "400",
                  }}
                >
                  {item.method}
                </Text>
              </View>
              <View
                style={{ alignItems: "center", flexDirection: "row", left: 10 }}
              >
                <Text
                  style={{
                    color: "black",
                    fontSize: responsiveFontSize(2),
                    fontWeight: "600",
                  }}
                >
                  Amount:
                </Text>
                <Text
                  style={{
                    color: "black",
                    fontSize: responsiveFontSize(1.4),
                    fontWeight: "400",
                  }}
                >
                  {"  "} {item.amount}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  alignSelf: "center",
                  width: responsiveWidth(48),
                  left: 10,
                }}
              >
                <View
                  style={{
                    alignItems: "flex-start",
                    justifyContent: "space-around",
                    flexDirection: "column",
                  }}
                >
                  <Text style={{ fontSize: 14, fontWeight: "700", color: "white"}}>
                    Date
                  </Text>
                  <Text
                    style={{fontSize: 12, fontWeight: "400", color: "white"}}>
                    {item.created_at}
                  </Text>
                </View>
              </View>
              {item.status == "1" ? (
                <TouchableOpacity
                  style={{
                    width: responsiveHeight(12),
                    height: responsiveWidth(8),
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "white",
                    top: 4,
                    borderRadius: 5,
                    left: 10,
                  }}
                >
                  <Text
                    style={{
                      color: "black",
                      fontSize: responsiveFontSize(1.4),
                      fontWeight: "700",
                    }}>
                    Pending...
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </LinearGradient>

        )}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
           
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  content: {
    alignItems: "flex-start",
    flexDirection: "column",
    justifyContent: "space-around",
    padding: 10,
  },
  largeBoxImage: {
    width: responsiveWidth(48),
    height: responsiveHeight(20),
    borderRadius: 8,
  },
  smallBoxImage: {
    width: responsiveWidth(41),
    height: responsiveHeight(20),
    borderRadius: 8,
  },
  main: {
    width: responsiveWidth(100),
    height: responsiveHeight(46),

    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
  mainImage: {
    width: responsiveWidth(38),
    height: responsiveHeight(45),
    borderRadius: 8,
  },
  largeBox: {
    width: responsiveWidth(48),
    height: responsiveHeight(30),
    backgroundColor: "blue",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
    borderRadius: 8,
    padding: 5,
  },
  smallBox: {
    width: responsiveWidth(41),
    height: responsiveHeight(45),
    backgroundColor: "blue",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
    borderRadius: 8,
  },
  middleBox: {
    width: responsiveWidth(98),
    height: responsiveHeight(45),
    backgroundColor: "blue",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 8,
  },
});
