import React, { Component } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";

import DeckItem from "./DeckItem";
import { retrieveDecks  } from "../../utils/api";
import { receiveAllDecks } from "../../actions";
import { white, red } from "../../utils/color";
import CustomButton from "../CustomButton";

class Decks extends Component {

  renderSeparator = () => {  
    return (  
        <View  
            style={{  
                height: 1,  
                width: "100%",  
                backgroundColor: red,  
            }}  
        />  
    );  
};  

  state = {
    ready: false
  };

  componentDidMount() {
    retrieveDecks()
      .then(data => {
        this.props.receiveAllDecks(data);
      })
      .then(() =>
        this.setState(() => ({
          ready: true
        }))
      );
  }

  render() {
    const { decks, navigation } = this.props;

    if (!this.state.ready) {
      return (
        <View style={styles.blank}>
          <Text>Loading...</Text>
        </View>
      );
    } else {
      return Object.values(decks).length >0? (
        <View style={styles.container}>
          <FlatList
            data={Object.values(decks)}
            renderItem={({ item }) => (
              <DeckItem
                id={item.id}
                name={item.name}
                cardCount={item.cards.length}
                navigation = {this.props.navigation}
              />
              
            )}
            ItemSeparatorComponent={this.renderSeparator}  

            keyExtractor={(item, index) => item.name} 
          />
        </View>
      ) : (
        <View style={styles.blank}>
          <Text style={{ fontSize: 18 }}>No cards yet. </Text>
          <CustomButton
            onPress={() => {
              navigation.navigate("AddDeck")
            }}
          > Create Deck </CustomButton>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "flex-start"
  },
  blank: {
    flex: 1,
    backgroundColor: white,
    justifyContent: "center",
    alignItems: "center"
  }
});

const mapDispatchToProps = dispatch => ({
  receiveAllDecks: decks => dispatch(receiveAllDecks(decks))
});

const mapStateToProps = decks => ({ decks });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Decks);
