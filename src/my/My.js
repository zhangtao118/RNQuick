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
  ImageBackground,
  View,
  Text,
  Alert,
  FlatList,
  TouchableNativeFeedback,
  StatusBar,
} from 'react-native';

import APIService from '../net/APIService';
import moment from 'moment/moment';
import Swiper from 'react-native-swiper';

import {connect} from 'react-redux';

class My extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login_name: undefined,
      headImage: null,
      packages: this._createListData(''),
      suit: undefined,
      avoid: undefined,
      historyToday: [],
    };
  }
  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <FlatList
            keyExtractor={this._extraUniqueKey}
            data={this.state.packages}
            renderItem={this._renderItem}
            //添加头尾布局
            ListHeaderComponent={this._createListHeader}
          />
        </SafeAreaView>
      </>
    );
  }

  componentDidMount() {
    this._accountInfo();
    this._calendarDay();
    Promise.all([
      APIService.getRequest('http://apis.juhe.cn/simpleWeather/query', {
        key: '7ea58f0186626a7c36ec86ef53cbda72',
        city: '杭州',
      }),
      APIService.getRequest('http://api.avatardata.cn/HistoryToday/LookUp', {
        key: '1ddc2f984aca47c1a4e01213e7011baa',
        yue: new Date().getMonth(),
        ri: new Date().getDay(),
        type: 2,
      }),
    ])
      .then(arr => {
        console.log(arr);
        var futures = arr[0].result.future;
        this.setState({
          historyToday: arr[1].result,
          packages: this._createListData(
            futures[0].weather + futures[0].temperature,
          ),
        });
      })
      .catch(console.log.bind(console));
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }

  _renderItem = ({item}) => (
    <TouchableNativeFeedback onPress={() => this._onPress(item)}>
      <View style={styles.item}>
        <Text style={styles.itemText}>{item.name}</Text>
        <View style={styles.itemContainerTimesImage}>
          <Text style={styles.itemTimes}>{item.left_times}</Text>
          {item.isRightImage ? (
            <Image
              style={styles.itemImage}
              source={require('../../img/goRedirect.png')}
            />
          ) : (
            <View />
          )}
          <Text style={styles.itemWeather}>
            {item.id === 1 ? item.weather : ''}
          </Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );

  _onPress(item) {
    if (item.id === 2) {
      //笑话
      this.props.navigation.navigate('Joke');
    } else if (item.id === 3) {
      //微信精选
      this.props.navigation.navigate('WechatNews');
    }
  }

  _extraUniqueKey(item, index) {
    return 'index' + index + item;
  }

  _createListHeader = () => (
    <View style={styles.container}>
      <View style={styles.headContainer}>
        <View style={styles.head}>
          <Image style={styles.headLogo} source={{uri: this.state.headImage}} />
          <View>
            <Text style={styles.name}>{this.state.login_name}</Text>
            <Text numberOfLines={1} style={styles.yi}>
              宜： {this.state.suit}
            </Text>
            <Text numberOfLines={1} style={styles.ji}>
              忌： {this.state.avoid}
            </Text>
          </View>
        </View>
        <View>
          <ImageBackground
            style={styles.calendarImgStyle}
            source={require('../../img/ic_calendar_bg.png')}>
            <Text style={styles.calendarText}>{this._day()}</Text>
          </ImageBackground>
        </View>
      </View>
      <View style={styles.gonggaoContainer}>
        <View>
          <Text style={styles.gonggaoTitle}>历史上的今天: </Text>
        </View>
        <Swiper
          key={this.state.historyToday.length}
          style={styles.wrapper}
          showsPagination={false}
          horizontal={false}
          loop={true}
          autoplayTimeout={3}
          autoplay={true}
          autoplayDirection={true}
          height={40}>
          {this._renderSwiper()}
        </Swiper>
      </View>
      <View style={styles.viewLine} />
    </View>
  );

  _renderSwiper() {
    var allList = [];
    for (let i = 0; i < this.state.historyToday.length; i++) {
      let history = this.state.historyToday[i];
      // console.log(history);
      allList.push(
        <View key={i} style={styles.slide1}>
          <Text style={styles.text}>
            {history.year}-{history.month}-{history.day} {history.title}
          </Text>
        </View>,
      );
    }
    return allList;
  }

  _calendarDay() {
    var date = moment(new Date()).format('YYYY-M-D');
    var params = {
      key: '4a85a01cd8074fd82ae357419516e8c8',
      date: date,
    };
    APIService.getRequest('http://v.juhe.cn/calendar/day', params)
      .then(res => {
        // console.log(res.data);
        this.setState({
          suit: res.result.data.suit,
          avoid: res.result.data.avoid,
        });
      })
      .catch(error => {
        console.log('error:' + error);
        Alert.alert(error);
      });
  }

  _createListData(weather) {
    var array = [];
    array.push({
      id: 1,
      name: '今日天气',
      isRightImage: false,
      weather: weather,
    });
    array.push({
      id: 2,
      name: '笑话大全',
      isRightImage: true,
      weather: weather,
    });
    array.push({
      id: 3,
      name: '微信精选',
      isRightImage: true,
      weather: weather,
    });
    return array;
  }

  _day() {
    return moment(new Date()).format('DD');
  }

  _accountInfo() {
    var params = {
      access_token: 'a52dc75e449f6db50c4e6b7e0fe319bd8a23cbbb',
    };
    APIService.getRequest('https://api.github.com/user', params)
      .then(res => {
        // console.log(res);
        this.setState({
          login_name: res.login,
          headImage: res.avatar_url,
        });
      })
      .catch(error => {
        console.log('error:' + error);
        Alert.alert(error);
      });
  }
}

// function mapStateToProps(state) {
//   return {
//     count: state.count, // 这里等效于 prop.state 不过redux1帮你封装好的
//   };
// }

// function matchDispatchToProps(dispatch) {
//   return bindActionCreators(
//     {increment: increment, decrement: decrement},
//     dispatch,
//   ); // 绑定动作事件
// }
// export default connect(
//   mapStateToProps,
//   matchDispatchToProps,
// )(My); // 连接Redux

const select = store => {
  return {
    //store.LoginReducer就是此页面使用到的Reducer 就是rootReducer中的模块名，前面的LoginReducer代表的是页面使用时this.props中的参数名。
    count: store.count,
  };
};
export default connect(select)(My);
// export default connect(
//   state => ({
//     count: state.count,
//   }),
//   dispatch => ({
//     increment: () => dispatch(increment()),
//   }),
// )(My);

const styles = StyleSheet.create({
  headContainer: {
    backgroundColor: '#47B09A',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  head: {
    paddingTop: 30,
    paddingBottom: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  calendarImgStyle: {
    marginEnd: 15,
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendarText: {
    fontSize: 16,
    marginTop: 10,
    color: '#FFBB12',
    letterSpacing: 3,
    fontWeight: 'bold',
  },
  headLogo: {
    marginEnd: 12,
    marginStart: 15,
    width: 60,
    height: 60,
    borderRadius: 30,
    borderColor: 'white',
    borderWidth: 1,
  },
  name: {
    marginTop: -4,
    fontSize: 20,
    color: 'white',
  },
  yi: {
    width: 205,
    marginTop: 3,
    fontSize: 13,
    color: 'white',
  },
  ji: {
    width: 205,
    marginTop: 1,
    fontSize: 13,
    color: 'white',
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlignVertical: 'center',
    borderBottomColor: '#f5f5f5',
    borderBottomWidth: 1,
  },
  itemText: {
    height: 45,
    paddingStart: 15,
    textAlignVertical: 'center',
  },
  itemContainerTimesImage: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemTimes: {
    marginEnd: 5,
    color: '#8a8a8a',
  },
  itemImage: {
    marginEnd: 15,
    width: 10,
    height: 10,
  },

  wrapper: {},

  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  text: {
    marginStart: 10,
    fontSize: 12,
    fontWeight: 'bold',
  },

  gonggaoContainer: {
    marginStart: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },

  gonggaoTitle: {
    fontSize: 12,
    fontWeight: 'bold',
  },

  viewLine: {
    backgroundColor: '#f5f5f5',
    height: 0.5,
  },
  itemWeather: {
    marginEnd: 5,
  },
});
