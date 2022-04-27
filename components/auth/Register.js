import React, { Component } from "react";
import { View, Button, TextInput } from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
    };
    this.onSignUp = this.onSignUp.bind(this);
  }
  onSignUp() {
    const { email, name, password } = this.state;
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
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
          placeholder="Name"
          onChangeText={(name) => this.setState({ name })}
        />
        <TextInput
          placeholder="Email"
          onChangeText={(email) => this.setState({ email })}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(password) => this.setState({ password })}
        />
        <Button title="Sign Up" onPress={() => this.onSignUp()} />
      </View>
    );
  }
}

export default Register;
