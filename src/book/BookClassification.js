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
  FlatList,
  Text,
  StatusBar,
  Dimensions,
  TouchableNativeFeedback,
} from 'react-native';

import APIService from '../net/APIService';

const {width} = Dimensions.get('window');

export default class BookClassification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: [],
    };
  }
  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.flexStyle}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>分类</Text>
          </View>
          <FlatList
            showsVerticalScrollIndicator={false}
            numColumns={2}
            keyExtractor={this._extraUniqueKey}
            data={this.state.result}
            renderItem={this._renderItem}
          />
        </SafeAreaView>
      </>
    );
  }

  _renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <TouchableNativeFeedback
        onPress={() => this._onPress(item.id, item.catalog)}>
        <View style={styles.imageTextContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.nameStyle}>{item.catalog}</Text>
            <Text style={styles.numStyle}>
              {Math.round(Math.random() * 10000)}
            </Text>
          </View>
          <Image
            style={styles.imageStyle}
            source={require('../../img/img_book_default.png')}
          />
        </View>
      </TouchableNativeFeedback>
    </View>
  );

  componentDidMount() {
    this._catalog();
  }

  _extraUniqueKey(item, index) {
    return 'index' + index + item;
  }

  _onPress(id, catalog) {
    this.props.navigation.navigate('Book', {
      id: id,
      catalog: catalog,
    });
  }

  _catalog() {
    // fetch('http://localhost:8081/bookList.json')
    //   .then(response => response.json())
    //   .then(responseJson => {
    //     this.setState({
    //       result: responseJson,
    //     });
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });
    var params = {
      key: 'b674581a72f519a4855aa5b72437a6fc',
    };
    APIService.getRequest('http://apis.juhe.cn/goodbook/catalog', params)
      .then(res => {
        console.log(res);
        this.setState({
          result: res.result,
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
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    borderBottomColor: '#f5f5f5',
    borderBottomWidth: 0.5,
  },
  title: {
    fontWeight: 'bold',
  },

  itemContainer: {
    marginStart: 15,
    marginTop: 10,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  imageTextContainer: {
    height: 80,
    flexDirection: 'row',
    width: (width - 45) / 2,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 3,
    shadowColor: '#000000',
    shadowRadius: 3,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.2,
    elevation: 6,
    overflow: 'hidden',
  },
  textContainer: {
    width: 70,
    marginStart: 15,
    justifyContent: 'center',
    alignItems: 'center',
    // flexDirection: 'row',
  },
  nameStyle: {
    fontSize: 14,
  },
  numStyle: {
    fontSize: 12,
    color: 'green',
  },
  imageStyle: {
    backgroundColor: 'green',
    width: 60,
    height: 80,
    borderBottomRightRadius: 4,
    borderTopRightRadius: 4,
    overflow: 'hidden',
  },
});
