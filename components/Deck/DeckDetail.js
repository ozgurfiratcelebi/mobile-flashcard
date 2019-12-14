import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button, Card } from "react-native-elements";
import { connect } from "react-redux";
import { white, gray, green, black, red } from "../../utils/color";
import CustomButton from "../CustomButton";
import { HeaderTitle } from "react-navigation-stack";




handleSubmit = () => {
  deckId = this.props.navigation.getParam("deckId");
  const { question, answer } = this.state;

  this.props.createCard(deckId, question, answer);
  saveCard(deckId, { question, answer });

  this.props.navigation.goBack();

  this.setState({
    question: "",
    answer: ""
  });
};


class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Deck Detail'
  });

   
  render() {
    const { navigation, deck } = this.props;
    return (
      <View style={styles.container}>
        <View >
          <Text style={styles.deckName}> {deck.name}  ({`${deck.cards.length} `} Card)</Text>
        </View>
        <View style={styles.body}>
          <CustomButton
            onPress={() => navigation.navigate("AddCard", { deckId: deck.id })}
          >
            <Text> Add Card </Text>
          </CustomButton>
          {deck.cards.length !== 0 && (
            <CustomButton onPress={() => navigation.navigate("Quiz", { deck })}>
              Start Quiz
            </CustomButton>
             )}            
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:white,
    justifyContent: "center",
    alignItems: "center" 
  },
  deckName: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
    marginBottom: 5
  
  },
  body: {
    marginTop:10
  }
});

const mapStateToProps = (state, { navigation }) => ({
  deck: state[navigation.getParam("deckId")]
});

 

export default connect(
  mapStateToProps,
  null
)(DeckDetail);
