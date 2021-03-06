import React from 'react';
import { Platform } from 'react-native';
import { TabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

//import EventListScreen from '../ui/pages/playground/playground_screen';
import EventListScreen from '../ui/pages/event_list/event_list_screen';
import MapScreen from '../ui/pages/map/map_screen';
import SettingScreen from '../ui/pages/setting/settings_screen';
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------

const iconSize = 35;

const tabBarOptions = {
  showIcon: true
};

const MainStack = TabNavigator({
  Waiter: {
    screen: EventListScreen,
    navigationOptions: {
      title: "Waiter",
      tabBarLabel: "Waiter",
      tabBarIcon: ({ tintColor }) => <Icon name="event" size={iconSize} color={tintColor} />,
    }
  },
  MapScreen: {
    screen: MapScreen,
    navigationOptions: {
      title: "MapScreen",
      tabBarLabel: "MapScreen",
      tabBarIcon: ({ tintColor }) => <Icon name="map" size={iconSize} color={tintColor} />,
    }
  },
  SettingScreen: {
    screen: SettingScreen,
    navigationOptions: {
      title: "Setting",
      tabBarLabel: "Settings",
      tabBarIcon: ({ tintColor }) => <Icon name="build" size={iconSize} color={tintColor} />,
    }
  }
}, {
  tabBarOptions: tabBarOptions,
  initialRouteName: "MapScreen"
});

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------


export default MainStack;
