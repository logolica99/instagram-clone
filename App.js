import { StatusBar } from "expo-status-bar";

import { View, Text, Button } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LandingScreen from "./components/auth/Landing";
import RegisterScreen from "./components/auth/Register";
import LoginScreen from "./components/auth/Login";
import MainScreen from "./components/Main";

//firebase Config
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { Component } from "react";
import { getFirestore, collection, getDoc, doc } from "firebase/firestore";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { applyMiddleware } from "@reduxjs/toolkit";
import rootReducer from "./redux/reducers";
import thunk from "redux-thunk";
const store = configureStore({ reducer: rootReducer }, applyMiddleware(thunk));

const firebaseConfig = {
  apiKey: "AIzaSyDXsHmk43fQuEHn2ybGn3X41PwdBYOr7es",
  authDomain: "instagram-clone-90161.firebaseapp.com",
  projectId: "instagram-clone-90161",
  storageBucket: "instagram-clone-90161.appspot.com",
  messagingSenderId: "213289286121",
  appId: "1:213289286121:web:9e9564e902f8c999047378",
  measurementId: "G-XF9BJFCJ7M",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

const Stack = createStackNavigator();

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      loggedIn: false,
    };
  }
  componentDidMount() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        });
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        });
      }
    });
  }
  render() {
    const { loggedIn, loaded } = this.state;

    if (!loaded) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text>Loading</Text>
        </View>
      );
    }
    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen
              name="Landing"
              component={LandingScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
    if (loggedIn) {
      return (
        <Provider store={store}>
          <MainScreen />
        </Provider>
      );
    }
  }
}

export default App;
