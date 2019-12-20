/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React from 'react';
import {StyleSheet, Image} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import ShouyeScreen from './shouye/Shouye';
import StockScreen from './stock/Stock';
import BookScreen from './book/Book';
import MyScreen from './my/My';
import BookClassificationScreen from './book/BookClassification';

const TabNavigator = createBottomTabNavigator(
  {
    首页: {
      screen: ShouyeScreen,
      navigationOptions: ({navigation}) => ({
        tabBarIcon: ({focused, horizontal, tintColor}) => {
          let image = focused
            ? require('../img/home_selected.png')
            : require('../img/home_unselected.png');
          return <Image style={styles.imageStyle} source={image} />;
        },
      }),
    },
    行情: {
      screen: StockScreen,
      navigationOptions: ({navigation}) => ({
        tabBarIcon: ({focused, horizontal, tintColor}) => {
          let image = focused
            ? require('../img/quotation_selected.png')
            : require('../img/quotation_unselected.png');
          return <Image style={styles.imageStyle} source={image} />;
        },
      }),
    },
    书籍: {
      screen: BookClassificationScreen,
      navigationOptions: ({navigation}) => ({
        tabBarIcon: ({focused, horizontal, tintColor}) => {
          let image = focused
            ? require('../img/book_selected.png')
            : require('../img/book_unselected.png');
          return <Image style={styles.imageStyle} source={image} />;
        },
      }),
    },
    我的: {
      screen: MyScreen,
      navigationOptions: ({navigation}) => ({
        tabBarIcon: ({focused, horizontal, tintColor}) => {
          let image = focused
            ? require('../img/my_selected.png')
            : require('../img/my_unselected.png');
          return <Image style={styles.imageStyle} source={image} />;
        },
      }),
    },
  },
  {
    tabBarOptions: {
      showIcon: true,
    },
  },
);

export default createAppContainer(TabNavigator);

const styles = StyleSheet.create({
  imageStyle: {
    height: 20,
    width: 20,
  },
});
