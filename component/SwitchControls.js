import React from 'react'
import {
  Text,
  View,
  StyleSheet,

  StatusBar,
  Image,

} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
export default class SwitchControle extends React.Component {
  componentDidMount = async () => {
    const SwitchNavigation = await AsyncStorage.getItem('switch')

    setTimeout(() => {
      if (SwitchNavigation != null || SwitchNavigation != undefined) {
        if (SwitchNavigation == 'Auth') {
          this.props.navigation.navigate('Auth')
        } else if (SwitchNavigation == 'Home') {
          this.props.navigation.navigate('HomePages')
        }

      } else {
        this.props.navigation.navigate('Auth')
      }
    }, 400)
  }
  render() {
    return (
      <View>

      </View>
    )
  }
}
