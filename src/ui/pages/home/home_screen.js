import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux'
import SplashScreen from 'react-native-splash-screen';
import OneSignal from 'react-native-onesignal'; // Import package from node modules

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------

const config = require('../../../config');
import { AuthenticationActions, EventsActions } from '../../../actions';

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------

class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      event: {}
    }
  }
  /**
   * attach event
   */
  componentDidMount() {
    const { navigate } = this.props.navigation;
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('registered', this.onRegistered);
    this.initializeApp();
  }

  onReceived(notification) {
    console.log("Notification received: ", notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
    /* if (this.state.event) {
        navigate('EventShowScreen', { id: this.state.event._id });
    } */
  }

  onRegistered(notifData) {
    console.log("Device had been registered for push notifications!", notifData);
  }

  onIds(device) {
    console.log('Device info: ', device);
  }

  componentWillReceiveProps(nextProps) {
    this.state.event = nextProps.event.toJS().current;
  }

  /**
   * Initialize application
   */
  initializeApp() {
    const { dispatch } = this.props.navigation;
    dispatch(AuthenticationActions.init())
      .catch(() => void 0)
      .then(() => {
        setTimeout(function () {
          //SplashScreen.hide();
        }, 300);
      });
  }

  render() {
    return null;
  }
}

export default connect((state) => {
  return {
    event: state.event
  };
})(HomeScreen);

//export default HomeScreen;