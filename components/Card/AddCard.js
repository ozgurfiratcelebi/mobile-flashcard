import React, { Component } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  KeyboardAvoidingView
} from "react-native";
import { connect } from "react-redux";

import { white, gray } from "../../utils/color";
import CustomButton from "../CustomButton";
import { createCard } from "../../actions";
import { saveCard } from "../../utils/api";

class AddCard extends Component {
  static navigationOptions = () => ({
    title: "Add Card"
  });

  state = {
    question: "",
    answer: ""
  };

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

  render() {
    const { question, answer } = this.state;

    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.element}>
          <TextInput
            placeholder="Question"
            style={styles.input}
            value={question}
            onChangeText={question => this.setState({ question })}
          />
          <TextInput
            placeholder="Answer"
            style={styles.input}
            value={answer}
            onChangeText={answer => this.setState({ answer })}
          />
        </View>
        <View style={styles.element}>
          <CustomButton onPress={this.handleSubmit}>Submit</CustomButton>
        </View>
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
  element: {
    margin: 20
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  },
  input: {
    backgroundColor: white,
    width: 250,
    fontSize: 20,
    height: 50,
    padding: 10,
    borderRadius: 1,
    borderColor: gray,
    margin: 20
  }
});

const mapDispatchToProps = dispatch => ({
  createCard: (deckId, question, answer) =>
    dispatch(createCard(deckId, question, answer))
});

export default connect(
  null,
  mapDispatchToProps
)(AddCard);
