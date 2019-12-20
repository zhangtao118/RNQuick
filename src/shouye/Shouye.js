/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import {createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';

import NewsScreen from './News';

const TopTabNavigator = createMaterialTopTabNavigator(
  {
    头条: NewsScreen,
    社会: NewsScreen,
    // 国内: NewsScreen,
    // 国际: NewsScreen,
    // 娱乐: NewsScreen,
    // 体育: NewsScreen,
    // 军事: NewsScreen,
    // 科技: NewsScreen,
    // 财经: NewsScreen,
    // 时尚: NewsScreen,
  },
  {
    tabBarOptions: {
      tabStyle: {
        width: 80,
        mindWidth: 30,
      },
      upperCaseLabel: false, //是否使标签大写，默认true
      scrollEnabled: true, //是否支持选项卡滑动，默认false
      style: {
        backgroundColor: '#678', //tabBar 背景色
      },
      indicatorStyle: {
        height: 2,
        backgroundColor: 'white',
      }, //标签指示器的样式
      labelStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 6,
        marginBottom: 6,
      }, //文字的样式
    },
  },
);

export default createAppContainer(TopTabNavigator);
