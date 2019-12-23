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
  FlatList,
} from 'react-native';
import APIService from '../net/APIService';

var page = 1;

export default class WechatNews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: undefined,
      isRefresh: false,
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
            <Text style={styles.title}>微信精选</Text>
            <Text style={styles.backImgeStyle} />
          </View>
          <FlatList
            style={styles.flexStyle}
            keyExtractor={this._extraUniqueKey}
            data={this.state.result}
            //item显示的布局
            renderItem={this._renderItem}
            // 空布局
            ListEmptyComponent={this._createEmptyView}
            //添加头尾布局
            // ListHeaderComponent={this._createListHeader}
            // ListFooterComponent={this._createListFooter}
            //下拉刷新相关
            onRefresh={() => this._onRefresh(1)}
            refreshing={this.state.isRefresh}
            //加载更多
            onEndReached={() => this._onLoadMore()}
            onEndReachedThreshold={0.5}
          />
        </SafeAreaView>
      </>
    );
  }
  //item显示的布局
  _renderItem = ({item}) => (
    <TouchableNativeFeedback
      onPress={() => this._onPress(item)}
      style={styles.flexStyle}>
      <View style={styles.itemContainer}>
        <Image
          style={styles.itemImages}
          source={{
            uri:
              'http://cdn.duitang.com/uploads/item/201410/26/20141026191422_yEKyd.thumb.700_0.jpeg',
          }}
        />
        <View style={styles.itemTextContainer}>
          <Text>{item.title}</Text>
          <View style={styles.sourceStyle}>
            <Text>{item.source}</Text>
          </View>
        </View>
      </View>
    </TouchableNativeFeedback>
  );

  _extraUniqueKey(item, index) {
    return 'index' + index + item;
  }

  _createEmptyView() {
    return (
      <View style={styles.emptyViewContainer}>
        <Image
          style={styles.emptyImgeStyle}
          source={require('../../img/img_empty.png')}
        />
        <Text>暂无任何数据</Text>
      </View>
    );
  }
  _onPress(item) {
    this.props.navigation.navigate('MessageDetail', {
      uri: item.url,
    });
  }

  _onRefresh(num) {
    // 不处于 下拉刷新
    if (this.state.isRefresh) {
      return;
    }
    page = num;
    var params = {
      key: '33ad01b8740979f17eae80fb40ec8186',
      ps: 20,
      pno: num,
    };
    APIService.getRequest('http://v.juhe.cn/weixin/query', params).then(res => {
      console.log(res);
      this.setState({
        result:
          page === 1
            ? res.result.list
            : this.state.result.concat(res.result.list),
      });
    });
  }

  _onLoadMore() {
    page++;
    this._onRefresh(page);
  }

  componentDidMount() {
    this._onRefresh(1);
  }
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
    fontWeight: 'bold',
  },

  emptyViewContainer: {
    marginTop: 180,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyImgeStyle: {
    width: 100,
    height: 100,
  },
  itemContainer: {
    paddingBottom: 10,
    paddingTop: 10,
    borderBottomColor: '#f5f5f5',
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  itemImages: {
    marginStart: 10,
    marginEnd: 8,
    width: 120,
    height: 80,
    borderRadius: 5,
  },
  itemTextContainer: {
    flex: 1,
    marginTop: 5,
    marginEnd: 10,
    justifyContent: 'space-between',
  },
  sourceStyle: {
    alignItems: 'flex-end',
  },
});
