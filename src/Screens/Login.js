import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, TextInput,Text, StyleSheet, Pressable ,ImageBackground} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Login() {
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const navigation = useNavigation();
  const image = {
    uri: "https://img.freepik.com/vecteurs-premium/ensemble-douze-nuages-differents-fond_71393-851.jpg",
    // uri: "https://img.freepik.com/vecteurs-premium/ciel-nuages-soleil-illustration-vectorielle_230920-895.jpg",
  } 
  const handleSubmit = async (event) => {
    event.preventDefault();
    // const formDAta = new FormData();

    try {
      await axios
        .post("http://localhost:8000/Client/login", {
          email,
          password,
        })
        .then((res) => {
          localStorage.setItem("user", JSON.stringify(res.data));
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user_id", res.data._id);
          console.log(res.data);
          navigation.navigate("Home");
        });
    } catch (error) {
      console.log(error);
    }
      
  };
          
  return (
    <View style={styles.container}>

        <ImageBackground source={image} resizeMode="cover" style={styles.image}>

      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={setemail}
        value={email}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={setpassword}
        value={password}
        secureTextEntry
      />

      {/* <Button style={styles.button} title="Login" onPress={handleSubmit} /> */}
      <Pressable style={styles.button} onPress={handleSubmit}>
      <Text style={styles.text}>Login</Text>
    </Pressable>
    <Text style={{ color:'white',fontSize: 50,marginTop:50,marginBottom:50,  }}>WELCOME</Text>
    <Text style={styles.signUp}>Don't you have account ?</Text>
    <Pressable style={styles.SignUpButton} onPress={() => navigation.navigate("Sign up")}>
      <Text style={{  color:'#8ACBE9',fontSize: 18, fontFamily:'cursive'}}>Sign Up</Text>
    </Pressable>
    </ImageBackground>
    </View>
  );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    height: 800,
    gap:800,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 48,
    color:"white"
  },
  input: {
    width: "80%",
    height: 56,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#F5F6FC",
    backgroundColor:"#F5F6FC",
    marginBottom: 24,
    fontSize: 18,
    color:"#CBD2EB"
  },
  button: {
    width: "80%",
    height: 56,
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#8ACBE9",
    fontSize: 900,
    justifyContent: "center",
    alignItems: "center",
  },
  text:{
    color:'white',
    fontSize: 18,
    fontWeight: "bold",  
    
  },
  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  signUp:{
    color:'#D5D5D5',
    fontSize: 18,
    fontFamily:'cursive',
    fontWeight:"bold"
  },
  SignUpButton:{
    width: "30%",
    height: 56,
    padding: 12,
    borderRadius: 20,
    backgroundColor: "white",
    fontSize: 200,
    justifyContent: "center",
    alignItems: "center",
    color:'#8ACBE9',
    marginTop:15,
  }
});
