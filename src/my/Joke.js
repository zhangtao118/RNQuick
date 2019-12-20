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
  Clipboard,
  ToastAndroid,
  Share,
  TouchableNativeFeedback,
  FlatList,
} from 'react-native';
import {connect} from 'react-redux';
import {increment} from '../redux/actions/CounterAction';

import moment from 'moment/moment';
import APIService from '../net/APIService';

var page = 1;

class Joke extends React.Component {
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
        <SafeAreaView>
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
            <Text style={styles.title}>笑话大全</Text>
            <Text style={styles.backImgeStyle} />
          </View>
          <FlatList
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
    <View style={styles.container}>
      <View style={styles.itemTitleContainer}>
        <View style={styles.flexDirectionRow}>
          <Image
            style={styles.headImgeStyle}
            source={{
              uri:
                'http://cdn.duitang.com/uploads/item/201410/26/20141026191422_yEKyd.thumb.700_0.jpeg',
            }}
          />
          <Text numberOfLines={1} style={styles.name}>
            {/* {item.title} */}
            内涵段子
          </Text>
        </View>
        <Text style={styles.name}>{item.updatetime}</Text>
      </View>
      <TouchableNativeFeedback>
        <Text style={styles.content}>
          {item.content.replace('&nbsp; &nbsp; ', '       ')}
        </Text>
      </TouchableNativeFeedback>
      <View style={styles.viewShortLine} />
      <View style={styles.bottomStyle}>
        <TouchableNativeFeedback
          onPress={() => {
            Clipboard.setString(item.content);
            ToastAndroid.show('复制成功', ToastAndroid.SHORT);
          }}>
          <Image
            style={styles.bottomImgeStyle}
            source={require('../../img/ic_copy.png')}
          />
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          onPress={() => {
            ToastAndroid.show('收藏成功', ToastAndroid.SHORT);
          }}>
          <Image
            style={styles.bottomImgeStyle}
            source={require('../../img/ic_collection.png')}
          />
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          onPress={() => {
            this._shareText(item.content);
            console.log(this.props.count);
            this.props.dispatch(increment());
            // ToastAndroid.show('分享', ToastAndroid.SHORT);
          }}>
          <Image
            style={styles.bottomImgeStyle}
            source={require('../../img/ic_share.png')}
          />
        </TouchableNativeFeedback>
      </View>
    </View>
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

  _onRefresh(num) {
    // 不处于 下拉刷新
    if (this.state.isRefresh) {
      return;
    }
    page = num;
    var str = moment()
      .subtract(8, 'months')
      .format('YYYY-MM-DD');
    var params = {
      key: '8dc28be7712c416d9efb9bf6f18b6efe',
      format: true,
      rows: 20,
      page: num,
      sort: 'asc',
      time: moment(str).unix(),
    };
    APIService.getRequest(
      'http://api.avatardata.cn/Joke/QueryJokeByTime',
      params,
    ).then(res => {
      console.log(res);
      this.setState({
        result: page === 1 ? res.result : this.state.result.concat(res.result),
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

  _shareText(text) {
    Share.share({
      message: text,
    })
      .then(this._showResult)
      .catch(error => console.log(error.message));
  }
  _showResult(result) {
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        console.log(result.activityType);
      } else {
        console.log('shared');
      }
    } else if (result.action === Share.dismissedAction) {
      console.log('dismissed');
    }
  }

  timetrans() {
    var date = new Date();
    var Y = date.getFullYear() + '-';
    var M =
      (date.getMonth() + 1 < 10
        ? '0' + (date.getMonth() + 1)
        : date.getMonth() + 1) + '-';
    var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
    var h =
      (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var m =
      (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) +
      ':';
    var s =
      date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return Y + M + D + h + m + s;
  }
}

const select = store => {
  return {
    count: store.count,
  };
};
export default connect(
  select,
  null,
)(Joke);

const styles = StyleSheet.create({
  container: {
    marginStart: 15,
    marginEnd: 15,
    paddingBottom: 10,
    paddingTop: 10,
    borderBottomColor: '#f5f5f5',
    borderBottomWidth: 8,
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
  itemTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flexDirectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headImgeStyle: {
    width: 25,
    height: 25,
    borderRadius: 15,
  },
  name: {
    width: 170,
    marginStart: 8,
    color: '#8a8a8a',
    fontSize: 13,
  },
  content: {
    marginTop: 7,
    marginBottom: 10,
  },
  viewShortLine: {
    height: 1,
    backgroundColor: '#f5f5f5',
  },
  bottomStyle: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  bottomImgeStyle: {
    width: 20,
    height: 20,
    marginStart: 20,
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
});
