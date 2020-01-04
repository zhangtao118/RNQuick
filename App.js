import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import {Platform, Alert} from 'react-native';
import {
  isFirstTime,
  checkUpdate,
  downloadUpdate,
  switchVersion,
  markSuccess,
} from 'react-native-update';

import _updateConfig from './update.json';
const {appKey} = _updateConfig[Platform.OS];

import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import React from 'react';
import allReducers from './src/redux/Store';

import {persistStore, persistReducer} from 'redux-persist';
import {PersistGate} from 'redux-persist/es/integration/react';
import AsyncStorage from '@react-native-community/async-storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import WelcomeScreen from './src/welcome/Welcome';
import MainScreen from './src/Main';
import WebScreen from './src/Web';
import BookScreen from './src/book/Book';
import BookDetailScreen from './src/book/BookDetail';
import JokeScreen from './src/my/Joke';
import JokeDetailScreen from './src/my/JokeDetail';
import WechatNewsScreen from './src/my/WechatNews';

const navigator = createStackNavigator(
  {
    Welcome: {screen: WelcomeScreen},
    Main: {screen: MainScreen},
    MessageDetail: {screen: WebScreen},
    Book: {screen: BookScreen},
    BookDetail: {screen: BookDetailScreen},
    Joke: {screen: JokeScreen},
    JokeDetail: {screen: JokeDetailScreen},
    WechatNews: {screen: WechatNewsScreen},
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
  },
);

const config = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2, // 查看 'Merge Process' 部分的具体情况
};

const reducers = persistReducer(config, allReducers);
const store = createStore(reducers, applyMiddleware(logger, thunk)); // 创建 Store
const persistor = persistStore(store);

const AppContainer = createAppContainer(navigator);

export default class App extends React.Component {
  componentDidMount() {
    this.check();
  }

  render() {
    return (
      <>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <AppContainer />
          </PersistGate>
        </Provider>
      </>
    );
  }

  check() {
    if (isFirstTime) {
      markSuccess();
    }

    checkUpdate(appKey)
      .then(info => {
        if (info.expired) {
        } else if (info.upToDate) {
        } else {
          downloadUpdate(info)
            .then(hash => {
              Alert.alert('提示', '检测到新版本,请点击安装', [
                {
                  text: '安装',
                  onPress: () => {
                    switchVersion(hash);
                  },
                },
              ]);
            })
            .catch(err => {
              console.log(err);
            });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
}
