import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {
  Text
} from 'react-native-elements';

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------

import playgroundStyle from './playground_style';

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------

class PlaygroundScreen extends Component {

  constructor (props) {
    super(props);
    this.state = {
      newMessage: {}
    };
  }

  // ----------------------------------------------------------------------

  componentDidMount () {
    //SplashScreen.hide();
  }

  // ----------------------------------------------------------------------

  render() {
    return (
      <ScrollView style={{ backgroundColor: 'white' }}>
        <View style={playgroundStyle.containers}>
          <Text>coucou ca marche</Text>
        </View>
      </ScrollView>
    );
  } // <= render

  // ----------------------------------------------------------------------
  // ----------------------------------------------------------------------
  // ----------------------------------------------------------------------


}

export default PlaygroundScreen;