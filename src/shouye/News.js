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
  TouchableNativeFeedback,
  StatusBar,
  FlatList,
} from 'react-native';

import APIService from '../net/APIService';

export default class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <FlatList
            keyExtractor={this._extraUniqueKey}
            data={this.state.data}
            renderItem={this._renderItem}
          />
        </SafeAreaView>
      </>
    );
  }

  _renderItem = ({item}) => (
    <TouchableNativeFeedback
      onPress={() => this._onPress(item.url, item.title)}>
      <View style={styles.subContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.infoContain}>
          <Text>{item.date}</Text>
          <Text style={styles.source}>来源:{item.author_name}</Text>
        </View>
        <FlatList
          keyExtractor={this._extraUniqueKey}
          style={styles.subFlatList}
          data={[
            {
              url: item.thumbnail_pic_s,
            },
            {
              url: item.thumbnail_pic_s02,
            },
            {
              url: item.thumbnail_pic_s03,
            },
          ]}
          renderItem={this._renderSubItem}
        />
      </View>
    </TouchableNativeFeedback>
  );

  _renderSubItem = ({item}) => (
    <Image
      style={styles.subImage}
      source={{
        uri: item === undefined ? '' : item.url,
      }}
    />
  );

  componentDidMount() {
    this._toutiao();
  }

  _extraUniqueKey(item, index) {
    return 'index' + index + item;
  }

  _onPress(url, title) {
    this.props.navigation.navigate('MessageDetail', {
      uri: url,
    });
  }

  _toutiao() {
    // 类型,,top(头条，默认),shehui(社会),guonei(国内),
    // guoji(国际),yule(娱乐),tiyu(体育)junshi(军事),keji(科技),caijing(财经),shishang(时尚)
    var params = {
      key: '9884023ca8046263892ad525923d45d1',
      type: getType(this.props.navigation.state.routeName),
    };
    APIService.getRequest('http://v.juhe.cn/toutiao/index', params)
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

function getType(routeName) {
  var type;
  switch (routeName) {
    case '头条':
      type = 'top';
      break;
    case '社会':
      type = 'shehui';
      break;
    case '国内':
      type = 'guonei';
      break;
    case '国际':
      type = 'guoji';
      break;
    case '娱乐':
      type = 'yule';
      break;
    case '体育':
      type = 'tiyu';
      break;
    case '军事':
      type = 'junshi';
      break;
    case '科技':
      type = 'keji';
      break;
    case '财经':
      type = 'caijing';
      break;
    case '时尚':
      type = 'shishang';
      break;
    default:
      type = 'top';
      break;
  }
  return type;
}

const styles = StyleSheet.create({
  subContainer: {
    paddingBottom: 10,
    paddingTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  title: {
    marginStart: 8,
    marginEnd: 8,
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoContain: {
    marginStart: 8,
    marginEnd: 8,
    marginTop: 8,
    flexDirection: 'row',
  },
  source: {
    marginStart: 20,
  },
  subFlatList: {
    marginEnd: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  subImage: {
    marginStart: 8,
    marginTop: 5,
    width: 109,
    height: 80,
  },
});
