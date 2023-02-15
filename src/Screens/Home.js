import React, { Component } from "react";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import axios from "axios";
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  Image,
  ImageBackground,
} from "react-native";

function Home() {
const [data, setData] = useState({});

const getWeather = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    console.log("Permission to access location was denied");
    return;
  }
  let location = await Location.getCurrentPositionAsync({});
  const lat = location.coords.latitude;
  const lon = location.coords.longitude;
  axios({
    method: "get",
    url: `https://api.openweathermap.org/data/2.5/forecast?appid=48653b61db12f636a538f23392d73ce7&units=metric&lat=${lat}&lon=${lon}`,
  }).then((res) => {
    setData(res.data);
    // console.log(res.data.city.name);
    console.log(res);
    console.log(res.data.list[0].dt_txt);
    console.log(res.data);
    // console.log(new Date(res.data.list[0].dt* 1000))
    console.log(new Date(res.data.list[0].dt * 1000).toLocaleDateString());
  });
};
const image = {
  uri: "https://img.freepik.com/free-photo/blue-sky-white-clouds_1417-1633.jpg?t=st=1675775621~exp=1675776221~hmac=09ad3ab44a82d65c11c713970c6e8bff67c0b984c072d77fd5b19afba6f7ee85",
  // uri: "https://img.freepik.com/premium-photo/cloud-background-summer-cloud-pringsky-blurred-image-background_385523-18.jpg",
  // uri: "https://img.freepik.com/premium-photo/blue-backdrop-air-abstract-style-cloud-background-summer-cloud-springsky-blurred-image_385523-19.jpg",
  // uri: "https://img.freepik.com/premium-photo/white-clouds-blue-sky-background-texture-graphic-resources_259348-6968.jpg?w=740",
  // uri: "https://img.freepik.com/premium-vector/white-clouds-blue-sky-background_105555-345.jpg?w=740",
  // uri: "https://img.freepik.com/premium-vector/blue-sky-with-grass-beam-blur_113524-270.jpg",
};
useEffect(() => {
  getWeather();
}, []);

    return (
      <View style={styles.container}>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: 30,
              gap: 130,
            }}
          >
            <View style={{ textAlign: "center" }}>
              {data.city && (
                <Text
                  style={{ fontWeight: "bold", fontSize: 30, color: "white" }}
                >
                  {data.city.name}
                </Text>
              )}
              {data.list && (
                <Text style={{ color: "white", fontSize: 15 }}>
                  {new Date(data.list[0].dt * 1000).toLocaleDateString(
                    "fr-FR",
                    {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </Text>
              )}
              {/* {data.list && <Text style={{ color:'white' ,fontSize:15}} >{new Date(data.list[0].dt * 1000).toLocaleTimeString('en-us')}</Text>} */}
            </View>
            <View
              style={{
                flexDirection: "col",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {data.list && (
                  <Text style={{ fontSize: 120, color: "white" }}>
                    {Math.floor(data.list[0].main.temp)}
                  </Text>
                )}
                <span
                  style={{
                    fontSize: 30,
                    color: "white",
                    fontWeight: "bold",
                    marginBottom: 40,
                  }}
                >
                  °c
                </span>
              </View>
              {data.list && (
                <Text style={{ color: "white", fontSize: 30 }}>
                  {data.list[0].weather[0].main}
                </Text>
              )}
              {data.city && (
                <Image
                  style={styles.img}
                  source={{
                    uri: `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@4x.png`,
                  }}
                />
              )}
            </View>

            {data.list && (
              <FlatList
                style={{ borderRadius: 10, height: 1 }}
                horizontal
                data={data.list.slice(0, 8)}
                renderItem={({ item }) => (
                  <View
                    style={{
                      borderRadius: 10,
                      margin: 10,
                      alignItems: "center",
                      height: 130,
                      padding: 10,
                    }}
                  >
                    <Text style={{ color: "white", opacity: 1 }}>
                      {" "}
                      {new Date(item.dt * 1000).toLocaleTimeString(
                        "en-us"
                      )}{" "}
                    </Text>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        color: "white",
                        opacity: 1,
                      }}
                    >
                      {Math.floor(data.list[0].main.temp)}°
                    </Text>
                    <Image
                      style={styles.img}
                      source={{
                        uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}@4x.png`,
                      }}
                    />
                    <Text style={{ color: "white", opacity: 1 }}>
                      {" "}
                      {item.weather[0].main}{" "}
                    </Text>
                  </View>
                )}
                keyExtractor={(item) => item.dt}
              />
            )}
          </View>
        </ImageBackground>
      </View>
    );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    position: "relative",
    width: 50,
    height: 50,
  },
  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
});

export default Home
