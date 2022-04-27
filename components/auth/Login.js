import React, { Component } from "react";
import { View, Button, TextInput } from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",

    };
    this.onSignUp = this.onSignUp.bind(this);
  }
  onSignUp() {
    const { email,  password } = this.state;
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
      });
  }

  render() {
    return (
      <View>
        <TextInput
          placeholder="Email"
          onChangeText={(email) => this.setState({ email })}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(password) => this.setState({ password })}
        />
        <Button title="Sign In" onPress={() => this.onSignUp()} />
      </View>
    );
  }
}

export default Login;
