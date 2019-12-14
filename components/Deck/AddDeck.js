import React, { Component } from "react";
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  StyleSheet,
  Button
} from "react-native";
import { connect } from "react-redux";

import { white, gray } from "../../utils/color";
import CustomButton from "../CustomButton";
import { generateId } from "../../utils/helper";
import { addDeck } from "../../actions/index";
import { saveDeck } from "../../utils/api";

class AddDeck extends Component {
 

  state = {
    input: ""
  };

  handleInputChange = input => {
    this.setState(() => ({
      input
    }));
  };

  createDeck = () => ({
    id: generateId(),
    name: this.state.input,
    cards: []
  });

  handleSubmit = () => {
    deck = this.createDeck();
if (deck.name)
{
    //Add to Redux
    this.props.addDeck(deck.id, deck.name);

    //Save to AsyncStorage
    saveDeck(deck);

    //Route to deck view
    this.props.navigation.navigate("DeckDetail", {
      deckId: deck.id,
      name: deck.name
    });

    //Reset input
    this.setState(() => ({
      input: ""
    }));

}
else{
  this.setState({ showErrorMessage: true });

}
  };

  render() {
    const { input } = this.state;
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Text style={styles.label}>What is the title of your new deck?</Text>
        <TextInput
          style={styles.input}
          value={input}
          placeholder="Deck Title"
          onChangeText={this.handleInputChange}
        />
        <CustomButton onPress={this.handleSubmit}>
          <Text>Create Deck</Text>
        </CustomButton>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  },
  input: {
    backgroundColor: white,
    width: 350,
    fontSize: 20,
    height: 50,
    padding: 10,
    borderRadius: 1,
    borderColor: gray,
    margin: 20
  }
});

const mapDispatchToProps = dispatch => ({
  addDeck: (id, name) => dispatch(addDeck(id, name))
});

export default connect(
  null,
  mapDispatchToProps
)(AddDeck);
