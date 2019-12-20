/* eslint-disable react/no-string-refs */
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
  StatusBar,
  BackHandler,
  Image,
  Text,
  TouchableNativeFeedback,
  View,
  Platform,
} from 'react-native';

import WebView from 'react-native-webview';

export default class Web extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      isShowTitle: this.props.navigation.state.params.isShowTitle,
    };
  }
  onNavigationStateChange = navState => {
    console.log(navState.title);
    this.setState({
      backButtonEnabled: navState.canGoBack,
      title: navState.title,
    });
  };
  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.flexStyle}>
          {this._title()}
          <WebView
            ref="webView"
            style={styles.flexStyle}
            startInLoadingState={true}
            onNavigationStateChange={this.onNavigationStateChange}
            source={{
              uri: this.props.navigation.state.params.uri,
            }}
          />
        </SafeAreaView>
      </>
    );
  }

  _title() {
    if (this.state.isShowTitle === false) {
      return;
    }
    return (
      <View style={styles.titleContainer}>
        <TouchableNativeFeedback onPress={() => this.props.navigation.goBack()}>
          <View style={styles.backImageContainer}>
            <Image
              style={styles.backImgeStyle}
              source={require('../img/icon_left_black.png')}
            />
          </View>
        </TouchableNativeFeedback>
        <Text numberOfLines={1} style={styles.title}>
          {this.state.title}
        </Text>
        <Text style={styles.backImgeStyle} />
      </View>
    );
  }

  componentDidMount() {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }

  onBackAndroid = () => {
    if (this.state === null) {
      return false;
    }
    //  官网中描述:backButtonEnabled: false,表示webView中没有返回事件，为true则表示该webView有回退事件
    if (this.state.backButtonEnabled) {
      this.refs.webView.goBack();
      return true;
    } else {
      return false;
    }
  };
}

const styles = StyleSheet.create({
  flexStyle: {
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
    width: 280,
    fontWeight: 'bold',
  },
});
