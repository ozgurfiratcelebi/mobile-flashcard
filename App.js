import React, { Component } from "react";
import { View, StatusBar } from "react-native";
import { Provider } from "react-redux";
import { createStore } from "redux";
import Constants from "expo-constants";
import {  createAppContainer} from "react-navigation";
import {  createBottomTabNavigator} from "react-navigation-tabs";
import { createStackNavigator} from "react-navigation-stack";
import { Feather } from "@expo/vector-icons";

import reducer from "./reducers";
import { lightPurp, white, red } from "./utils/color";
import AddDeck from "./components/Deck/AddDeck";
import Decks from "./components/Deck/Decks";
import DeckItem from "./components/Deck/DeckItem";
import DeckDetail from "./components/Deck/DeckDetail";
import AddCard from "./components/Card/AddCard";
import Quiz from "./components/Quiz/Quiz";
import { setLocalNotification } from "./utils/helper";

const MainStatusBar = ({ backgroundColor, ...props }) => (
  <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

const Tabs = createBottomTabNavigator(
  {
    Decks: {
      screen: Decks,
      navigationOptions: {
        tabBatLabel: "Decks",
        tabBarIcon: ({ tintColor }) => (
          <Feather name="list" size={30} color={tintColor} />
        )
      }
    },
    AddDeck: {
      screen: AddDeck,
      navigationOptions: {
        tabBarLabel: "Add Deck",
        tabBarIcon: ({ tintColor }) => (
          <Feather name="plus" size={30} color={tintColor} />
        )
      }
    }
  },
  {
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      activeTintColor: lightPurp,
      style: {
        height: 60,
        backgroundColor: white,
        shadowColor: "rgba(0, 0, 0, 0.24)",
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      },
      labelStyle: {
        paddingTop: 3,
        fontSize: 14,
        fontWeight: "bold"
      }
    }
  }
);

const MainNavigator = createStackNavigator(
  {
    Home: Tabs,
    DeckItem: DeckItem,
    DeckDetail: DeckDetail,
    AddCard: AddCard,
    Quiz: Quiz
  },
  {
    initialRouteName: "Home",
      navigationOptions: {
      headerTintColor: white,
      headerStyle: { backgroundColor: lightPurp },
      headerTitleStyle: { fontWeight: "bold" }
    }
  }
);

const AppContainer = createAppContainer(MainNavigator);

class App extends Component {
  componentDidMount() {
 //   console.log('Before');
//debugger
 //   console.log('After');

    setLocalNotification();
  }
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>
          <MainStatusBar backgroundColor={red} barStyle="light-content" />
          <AppContainer />
        </View>
      </Provider>
    );
  }
}

export default App;
