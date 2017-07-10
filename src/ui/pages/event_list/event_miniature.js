import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import {
  Text,
  Card
} from 'react-native-elements';

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------


// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------

class EventMiniatureComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  // ----------------------------------------------------------------------

  componentWillMount() {

  }

  componentWillReceiveProps(nextProps) {

  }

  componentDidMount() {
  }

  // ----------------------------------------------------------------------



  render() {
    const event = this.props.event;

    return (
        <Card
          title={event.name}
          image={{uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/272px-Google_2015_logo.svg.png"}}
        >
          <Text>
            {event.description}
          </Text>
        </Card>
    );
  } // <= render

  // ----------------------------------------------------------------------
  // ----------------------------------------------------------------------
  // ----------------------------------------------------------------------


}

export default EventMiniatureComponent;
