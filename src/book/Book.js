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
  Alert,
  Text,
  StatusBar,
  TouchableNativeFeedback,
  FlatList,
} from 'react-native';

import APIService from '../net/APIService';

export default class Book extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      result: [],
    };
  }
  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.flexStyle}>
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
            <Text style={styles.title}>
              {this.props.navigation.state.params.catalog}
            </Text>
            <Text style={styles.backImgeStyle} />
          </View>
          <FlatList
            style={styles.flexStyle}
            keyExtractor={this._extraUniqueKey}
            data={this.state.data}
            renderItem={this._renderItem}
          />
        </SafeAreaView>
      </>
    );
  }

  _renderItem = ({item}) => (
    <TouchableNativeFeedback onPress={() => this._onPress(item)}>
      <View style={styles.itemContainer}>
        <View>
          <Image
            style={styles.image}
            source={{
              uri: item.img,
              title: item.title,
            }}
          />
        </View>
        <View style={styles.info}>
          <Text style={styles.title}>{item.title}</Text>
          <Text numberOfLines={2} style={styles.summary}>
            {'    '}
            {item.sub2}
          </Text>
          {/* <WebView
            style={styles.summary}
            // numberOfLines={2}
            source={{
              html: `<html>
              <head>
                <meta name="viewport" content="width=device-width, initial-scale=0.8">
              </head>
              <body>${item.sub2}</body>
              </html>`,
            }}
          /> */}
          <View style={styles.otherInfo}>
            <Text>{item.reading}</Text>
            <View style={styles.otherInfo}>
              {/* <Text>{item.reading}</Text> */}
              <Text style={styles.classify}>{item.catalog}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableNativeFeedback>
  );

  componentDidMount() {
    this._goodbook();
  }

  _extraUniqueKey(item, index) {
    return 'index' + index + item;
  }

  _onPress(item) {
    this.props.navigation.navigate('MessageDetail', {
      uri: this._getUrl(item.online),
      isShowTitle: false,
    });
  }

  _getUrl(text) {
    console.log(text);
    var arrAll;
    arrAll = text.split(' ');
    console.log(arrAll);
    var position = arrAll[0].indexOf(':');
    console.log(arrAll[0].substr(position + 1));
    return arrAll[0].substr(position + 1);
  }

  _catalog() {
    var params = {
      key: 'b674581a72f519a4855aa5b72437a6fc',
      catalog_id: '',
      pn: 1,
      rn: 20,
    };
    APIService.getRequest('http://apis.juhe.cn/goodbook/query', params)
      .then(res => {
        console.log(res);
        this.setState({
          data: res.result,
        });
      })
      .catch(error => {
        console.log('error:' + error);
        Alert.alert(error);
      });
  }

  _goodbook() {
    var params = {
      key: 'b674581a72f519a4855aa5b72437a6fc',
      catalog_id: this.props.navigation.state.params.id,
      pn: 1,
      rn: 20,
    };
    APIService.getRequest('http://apis.juhe.cn/goodbook/query', params)
      .then(res => {
        console.log(res);
        this.setState({
          data: res.result.data,
        });
      })
      .catch(error => {
        console.log('error:' + error);
        Alert.alert(error);
      });
  }
}

const styles = StyleSheet.create({
  flexStyle: {
    flex: 1,
  },
  itemContainer: {
    paddingBottom: 10,
    paddingTop: 10,
    flexDirection: 'row',
    borderBottomColor: '#f5f5f5',
    borderBottomWidth: 1,
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
  image: {
    marginStart: 10,
    marginEnd: 10,
    backgroundColor: '#f5f5f5',
    width: 80,
    height: 100,
  },
  info: {
    flex: 1,
    paddingEnd: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  summary: {
    marginTop: 5,
    marginBottom: 17,
  },
  otherInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  classify: {
    marginStart: 5,
  },
});
