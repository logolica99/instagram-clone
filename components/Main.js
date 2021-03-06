import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUser } from "../redux/actions";

export class Main extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    const { currentUser } = this.props;
    console.log(currentUser)
    if(currentUser==undefined){
        return(
            <View style={{ flex: 1, justifyContent: "center" }}>
            <Text> </Text>
          </View>
        )
    }
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text> {currentUser.name} is Logged in </Text>
      </View>
    );
  }
}

//connecting all the states
const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});

//connecting all the actions
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchUser,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Main);
