import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { ScrollView, View, Dimensions, RefreshControl } from 'react-native';

import ContainerComponent from '../../../container_component';
import MapView, { MAP_TYPES, PROVIDER_DEFAULT } from 'react-native-maps';

import { EventsActions, WaitActions, UserActions } from '../../../actions';

import {
  Tile,
  Card,
  Slider,
  Button,
  FormInput,
  Text
} from 'react-native-elements';

import StarRating from 'react-native-star-rating';


import EventShowStyle from './event_show_style';

class EventShowScreen extends ContainerComponent {
  constructor() {
    super();
    this.code = ""
    this.state = {
      event: {},
      refreshing: false,
      wait: {},
      numberToBook: 1,
      isBusy: 0,
      rated: false,
      starCount: 3
    }
  }

  componentWillMount() {
    const { dispatch } = this.props.navigation;
    const { params } = this.props.navigation.state;
    this.eventId = _(params).get('id');
    this.dispatch([
      EventsActions.getOneEvent(this.eventId),
      WaitActions.getCurrentWait(this.props.auth.userId)
    ]);
  }

  _onRefresh() {
    this.setState({ refreshing: true });
    this.dispatch([
      EventsActions.getOneEvent(this.eventId),
      WaitActions.getCurrentWait(this.props.auth.userId)
    ])
      .then(() => {
        this.setState({ refreshing: false });
      })
      .catch(() => {
        this.setState({ refreshing: false });
      })
  }

  componentWillReceiveProps(nextProps) {
    this.state.event = nextProps.event.toJS().current;
    this.state.wait = nextProps.wait.toJS().wait;
    this.state.isBusy = nextProps.user.toJS().user.waiterCurrentEvent ? 1 : 0;
  }

  _register(event, userId) {
    this.dispatch(EventsActions.registerToEvent(event._id, userId))
      .then(() => this.dispatch(UserActions.getUser(userId)));
  }

  _unregister(event, userId) {
    this.dispatch(EventsActions.unregisterToEvent(event._id, userId))
      .then(() => this.dispatch(UserActions.getUser(userId)));
  }

  _queueStart(waitId, waiterId) {
    this.dispatch(WaitActions.changeWaitState(waitId, waiterId, "queue-start"));
  }

  _queueDone(waitId, waiterId) {
    this.dispatch(WaitActions.changeWaitState(waitId, waiterId, "queue-done"));
  }

  _validateCode(code, waitId, waiterId) {
    this.dispatch(WaitActions.validateCode(this.code, waitId, waiterId))
      .then(() => {
        this.setState({ isBusy: 0 });
      });
  }

  _renderWaiter(event, wait, userId) {
    if (!this.state.isBusy) {
      return (
        <Card
          title="You can register to this event"
        >
          <Text style={EventShowStyle.textContainer}>Press this button to register</Text>
          <Button
            title="Register"
            backgroundColor='blue'
            onPress={this._register.bind(this, event, userId)}
          />
        </Card>
      )
    } else if (_.isEmpty(wait)) {
      return (
        <Card
          title="You are now subscribed to this event"
        >
          <Text style={EventShowStyle.textContainer}>You'll soon be requested for waiting :)</Text>
          <Button
            title="Unsubscribe"
            backgroundColor='blue'
            onPress={this._unregister.bind(this, event, userId)}
          />
        </Card>)
    }
    switch (wait.state) {
      case 'created':
        return (
          <Card
            title="You have been requested !"
          >
            <Text style={EventShowStyle.textContainer}>Press this button to let your client know that you begun waiting :)</Text>
            <Button
              title="Start Waiting"
              backgroundColor='blue'
              onPress={this._queueStart.bind(this, wait._id, userId)}
            />
          </Card>)
      case 'queue-start':
        return (
          <Card
            title="Wait in line !"
          >
            <Text style={EventShowStyle.textContainer}>When you're done with you're wait, press this button to let your client know you've done your job</Text>
            <Button
              title="My wait is over"
              backgroundColor='blue'
              onPress={this._queueDone.bind(this, wait._id, userId)}
            />
          </Card>)
      case 'queue-done':
        return (
          <Card
            title="Wait finished !"
          >
            <Text style={EventShowStyle.textContainer}>Alright, great job, now don't forget to enter the code your client gave you in order to get paid \o/</Text>
            <FormInput
              onChangeText={(value) => { this.code = value }}
              placeholder="Enter code here"
              autoCapitalize="characters"
              autoCorrect={false}
            />
            <Button
              title="Confirm"
              backgroundColor='blue'
              onPress={this._validateCode.bind(this, this.code, wait._id, userId)}
            />
          </Card>)
      default:
        return (
          <Text>Waiter</Text>
        )
    }
  }

  _requestWait(event) {
    this.dispatch(WaitActions.requestWait(
      this.props.auth.userId,
      event._id,
      this.state.numberToBook
    ))
      .then(() => this._onRefresh);
  }

  _onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }

  _onSubmitRating() {
    this.setState({
      rated: true
    })
  }

  _renderNotWaiter(event, wait, userId) {

    if (wait._id && wait.eventId !== event._id) {
      return (
        <Card
          title="You can't request more than one wait"
        >
          <Text style={EventShowStyle.textContainer}>
            Sadly, you can't request more that on wait at a time, at least fort now, come back later once your other wait is finished!
          </Text>
        </Card>
      )
    }
    if (!event.listOfWaiters.length && _.isEmpty(wait)) {
      return (
        <Card
          title="No Waiter found"
        >
          <Text style={EventShowStyle.textContainer}>
            Sadly, no waiter was found for this event :/
          </Text>
          <Text style={EventShowStyle.textContainer}>
            Swipe down no reload or come back later !
          </Text>
        </Card>
      )
    } else if (_.isEmpty(wait)) {
      return (
        <Card
          title="Request a Wait"
        >
          <Text style={EventShowStyle.textContainer}>Waiter to Request : {this.state.numberToBook}</Text>
          <Slider
            minimumValue={1}
            maximumValue={event.listOfWaiters.length}
            value={1}
            onValueChange={(value) => this.setState({ numberToBook: value })}
            step={1}
          />
          <Button
            title="Request Wait"
            backgroundColor='blue'
            onPress={this._requestWait.bind(this, event)}
          />
        </Card>)
    }
    switch (wait.state) {
      case 'created':
        return (
          <Card
            title="Wait Requested"
          >
            <Button
              title="Your wait will begin soon"
              backgroundColor='blue'
              disabled
            />
          </Card>)
      case 'queue-start':
        return (
          <Card
            title="Wait in progress"
          >
            <Button
              title="Your wait is being taken care of"
              backgroundColor='blue'
              disabled
            />
          </Card>)
      case 'queue-done':
        if (wait.confirmationCode && wait.confirmationCode !== "" && this.state.rated !== false) {
          return (
            <Card
              title="The Wait is over !"
            >
              <Text style={EventShowStyle.textContainer}>Congratulation, be sure to give your waiter this code to finalise the transaction :</Text>
              <Text h4 style={EventShowStyle.textContainer}>{wait.confirmationCode}</Text>
            </Card>
          )
        } else {
          this.dispatch(WaitActions.generateCode(wait._id, userId));
          return (
            <Card
              title="The Wait is over !"
            >
              <Text style={EventShowStyle.textContainer}>Rate your waiter to see your code :</Text>
              <StarRating
                disabled={false}
                maxStars={5}
                rating={this.state.starCount}
                selectedStar={(rating) => this._onStarRatingPress(rating)}
                style={{ paddingVertical: 10 }}
              />
              <Button
                title="Submit"
                backgroundColor='blue'
                onPress={this._onSubmitRating.bind(this)}
              />
            </Card>
          )
        }
      default:
        return (
          <Text>Not Waiter</Text>
        )
    }
  }

  render() {
    let event = this.state.event;
    let wait = this.state.wait;

    if (event.location) {
      return (

        <ScrollView style={EventShowStyle.container}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />}>
          <Tile
            title={event.name}
            imageSrc={{ uri: "https://www.theclementimall.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png" }}
            featured
          >
          </Tile>
          <Text
            style={EventShowStyle.textHeading}
            h6
          >
            {event.description}
          </Text>
          <Text style={EventShowStyle.textContainer}>
            {event.address}
          </Text>
          {
            global.isWaiter ? this._renderWaiter(event, wait, this.props.auth.userId) : this._renderNotWaiter(event, wait, this.props.auth.userId)
          }
          {/*<MapView
            style={EventShowStyle.map}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />*/}
        </ScrollView>
      );
    } else {
      return (<View />)
    }
  }
}

export default connect((state) => {
  return {
    event: state.event,
    wait: state.wait,
    auth: state.authentication.toJS(),
    user: state.user
  };
})(EventShowScreen);
