import React from "react";
import { createAppContainer, createStackNavigator } from "react-navigation";

//screen import
import Home from "./Component/Home";
import Chat from "./Component/Chat";

const MainNavigator = createStackNavigator({
  Home: Home,
  Chat: Chat
});

class Navigator extends React.Component {
  render() {
    return <MainNavigator />;
  }
}

const AppContainer = createAppContainer(MainNavigator);
export default AppContainer;
