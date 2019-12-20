/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  Text,
  StatusBar,
  TouchableNativeFeedback,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

export default class Joke extends React.Component {
  constructor(props) {
    super(props);
    this.content = this.props.navigation.state.params.content;
    console.log(this.content);
  }
  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.safeAreaViewStyle}>
          <View style={styles.titleContainer}>
            <TouchableNativeFeedback
              onPress={() => this.props.navigation.goBack()}>
              <View style={styles.backImageContainer}>
                <Image
                  style={styles.backImgeStyle}
                  source={require('../../img/icon_left_black.png')}
                />
              </View>
            </TouchableNativeFeedback>
            <Text style={styles.title}>详情</Text>
            <Text style={styles.backImgeStyle} />
          </View>
          <ScrollView style={styles.scrollViewStyle}>
            <View style={styles.contentContainerStyle}>
              <Text style={styles.contentStyle}>{this.content.content}</Text>
              <Text>{this.content.updatetime}</Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  safeAreaViewStyle: {
    flex: 1,
  },
  backImageContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  backImgeStyle: {
    marginEnd: 15,
    marginStart: 15,
    width: 11,
    height: 19,
  },
  titleContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  title: {
    fontWeight: 'bold',
  },
  scrollViewStyle: {
    flex: 1,
    paddingStart: 10,
    paddingEnd: 10,
    height: '100%',
  },
  contentContainerStyle: {
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'flex-end',
  },
  contentStyle: {
    paddingBottom: 5,
    paddingTop: 2,
  },
});
