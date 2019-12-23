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
  View,
  Text,
  StatusBar,
  Alert,
  TouchableNativeFeedback,
  FlatList,
} from 'react-native';

import APIService from '../net/APIService';

export default class Stock extends React.Component {
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
          <View style={styles.container}>
            <View>
              <Text style={styles.headText}>股票类型</Text>
            </View>
            {/* 现价 */}
            <Text style={styles.headText}>现 &nbsp;&nbsp;&nbsp;&nbsp;价</Text>
            {/* 涨跌 */}
            <Text style={styles.headText}>涨 &nbsp;&nbsp;&nbsp;&nbsp;跌</Text>
            {/* 涨幅 */}
            <Text style={styles.headText}>涨 &nbsp;&nbsp;&nbsp;&nbsp;幅</Text>
            {/* 最高 */}
            <Text style={styles.headText}>最 &nbsp;&nbsp;&nbsp;&nbsp;高</Text>
            {/* 最低 */}
            <Text style={styles.headText}>最 &nbsp;&nbsp;&nbsp;&nbsp;低</Text>
          </View>
          <FlatList
            keyExtractor={this._extraUniqueKey}
            data={this.state.data}
            renderItem={this._renderItem}
          />
        </SafeAreaView>
      </>
    );
  }
  _extraUniqueKey(item, index) {
    return 'index' + index + item;
  }
  _renderItem = ({item}) => (
    <TouchableNativeFeedback onPress={() => console.log('qqqqqqqqqqqq')}>
      <View style={styles.container}>
        <View>
          <Text>{item.name}</Text>
          <Text>{item.code}</Text>
        </View>
        {/* 现价 */}
        <Text>{item.trade}</Text>
        {/* 涨跌 */}
        <Text>{item.pricechange}</Text>
        {/* 涨幅 */}
        <Text>{item.changepercent}%</Text>
        {/* 最高 */}
        <Text>{item.high}</Text>
        {/* 最低 */}
        <Text>{item.low}</Text>
      </View>
    </TouchableNativeFeedback>
  );

  componentDidMount() {
    this._stockShall();
  }

  _stockShall() {
    var params = {
      key: 'ce7ece35235339a4dbf0fe1e82f46d8e',
      stock: '', //	a表示A股，b表示B股,默认所有
      page: 1,
      type: 30,
    };
    APIService.getRequest('http://web.juhe.cn:8080/finance/stock/shall', params)
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
  container: {
    paddingBottom: 5,
    paddingTop: 5,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },

  headText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
});
