/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  StatusBar,
  Image,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const {width, height} = Dimensions.get('window');

export default class Welcome extends React.Component {
  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView style={styles.scrollView}>
            <Image source={require('../../img/launcher.jpeg')} />
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
  componentDidMount() {
    this.time = setTimeout(() => {
      this.props.navigation.replace('Main');
    }, 3000);
  }
}

// componentWillUnmount() {
//   this.timer && clearTimeout(this.timer);
// }

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  image: {
    width: width,
    height: height,
  },
});
