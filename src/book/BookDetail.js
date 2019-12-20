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
  Dimensions,
  TouchableNativeFeedback,
  FlatList,
} from 'react-native';

const {width} = Dimensions.get('window');

export default class BookDetail extends React.Component {
  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <View style={styles.headStyle}>
            <View style={styles.titleContainer}>
              <TouchableNativeFeedback
                onPress={() => this.props.navigation.goBack()}>
                <View style={styles.backImageContainer}>
                  <Image
                    style={styles.backImgeStyle}
                    source={require('../../img/icon_left_white.png')}
                  />
                </View>
              </TouchableNativeFeedback>
              <Text style={styles.headBookShelfStyle}>书架</Text>
            </View>
            <View style={styles.headInfoContainer}>
              <Image
                style={styles.bookImageStyle}
                source={{
                  uri:
                    'http://pic4.zhimg.com/v2-06273e88b28b75cc0cbe4cee51312cf7_b.jpg',
                }}
              />
              <View>
                <Text style={styles.headBookName}>求道武侠世界</Text>
                <Text style={styles.headBookOther}>作者：大荒散人</Text>
                <Text style={styles.headBookOther}>类型：武侠仙侠</Text>
                <Text style={styles.headBookOther}>状态：连载</Text>
                <Text style={styles.headBookGrade}>6.0分</Text>
              </View>
            </View>
          </View>
          <View style={styles.headThreeStyle}>
            <TouchableNativeFeedback>
              <View style={styles.headThreeTextImageStyle}>
                <Image
                  style={styles.headThreeImageStyle}
                  source={require('../../img/ic_recommend.png')}
                />
                <Text style={styles.headThreeTextStyle}>推荐</Text>
              </View>
            </TouchableNativeFeedback>
            <View style={styles.viewShortLine} />
            <TouchableNativeFeedback>
              <View style={styles.headThreeTextImageStyle}>
                <Image
                  style={styles.headThreeImageStyle}
                  source={require('../../img/ic_recommend.png')}
                />
                <Text style={styles.headThreeTextStyle}>分享</Text>
              </View>
            </TouchableNativeFeedback>
            <View style={styles.viewShortLine} />
            <TouchableNativeFeedback>
              <View style={styles.headThreeTextImageStyle}>
                <Image
                  style={styles.headThreeImageStyle}
                  source={require('../../img/ic_recommend.png')}
                />
                <Text style={styles.headThreeTextStyle}>报错</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
          <View style={styles.viewLine} />
          <View style={styles.introductionContainer}>
            <Text style={styles.introductionTitle}>简介</Text>
            <Text style={styles.introductionText}>
              反反复复烦烦烦烦烦烦烦烦烦烦烦烦烦烦烦反反复复烦烦烦烦烦烦烦烦烦烦烦烦烦烦烦
            </Text>
          </View>
          <View style={styles.viewLine} />
          <TouchableNativeFeedback>
            <View style={styles.introductionContainer}>
              <Text style={styles.introductionTitle}>目录</Text>
              <View style={styles.catalogInfoContainerStyle}>
                <View style={styles.catalogInfoStyle}>
                  <Image
                    style={styles.catalogImg}
                    source={require('../../img/ic_catalog.png')}
                  />
                  <View style={styles.catalogTimeText}>
                    <Text style={styles.catalogTime}>
                      最新更新：11/1/2019 8:32:50 PM
                    </Text>
                    <Text style={styles.catalogText}>第五十八章 天帝之位</Text>
                  </View>
                </View>
                <Image
                  style={styles.gotoImg}
                  source={require('../../img/goRedirect.png')}
                />
              </View>
            </View>
          </TouchableNativeFeedback>
          <View style={styles.viewLine} />
          <View style={styles.bookReviewContainer}>
            <Text style={styles.commentText}>书友评论</Text>
            <Image
              style={styles.commentImage}
              source={require('../../img/ic_modify.png')}
            />
          </View>
          <FlatList
            data={[
              {key: 'a', goods: 'banner'},
              {key: 'b', goods: 'apple'},
              {key: 'c', goods: 'android'},
              {key: 'd', goods: 'java'},
            ]}
            renderItem={this._renderItem}
          />
        </SafeAreaView>
      </>
    );
  }

  _renderItem = ({item}) => (
    <>
      <View style={styles.container}>
        <View style={styles.itemUserContainerStyle}>
          <View style={styles.flexDirectionRow}>
            <Image
              style={styles.userHeadIcon}
              source={require('../../img/img_default_head.png')}
            />
            <View>
              <Text style={styles.userName}>漫不经心</Text>
              <Text style={styles.itemTime}>2019-11-23</Text>
            </View>
          </View>
          <View style={styles.flexDirectionRow}>
            <Image
              style={styles.itemPraise}
              source={require('../../img/ic_praise.png')}
            />
            <Text style={styles.catalogTime}>赞</Text>
          </View>
        </View>
        <Text style={styles.catalogTime}>从前有个太监，下面没了......</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  headStyle: {
    paddingBottom: 25,
    backgroundColor: 'green',
  },
  headBookShelfStyle: {
    color: 'white',
    fontSize: 12,
    borderColor: 'white',
    borderWidth: 0.5,
    borderRadius: 3,
    paddingStart: 6,
    paddingEnd: 6,
    paddingBottom: 3,
    paddingTop: 3,
    margin: 15,
  },
  backImageContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  backImgeStyle: {
    margin: 15,
    width: 11,
    height: 19,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bookImageStyle: {
    width: 90,
    height: 110,
    backgroundColor: '#f5f5f5',
    marginStart: 10,
    marginEnd: 15,
    marginTop: 25,
  },
  headInfoContainer: {
    flexDirection: 'row',
  },
  headBookName: {
    color: 'white',
    fontSize: 16,
    marginTop: 28,
    marginBottom: 5,
  },
  headBookOther: {
    color: 'white',
    fontSize: 12,
  },
  headBookGrade: {
    marginTop: 10,
    color: 'white',
    fontSize: 12,
  },
  headThreeStyle: {
    backgroundColor: 'white',
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  headThreeTextImageStyle: {
    width: (width - 2) / 3,
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headThreeImageStyle: {
    width: 25,
    height: 25,
  },
  headThreeTextStyle: {
    fontSize: 13,
    marginStart: 5,
  },
  viewLine: {
    height: 10,
    backgroundColor: '#f5f5f5',
  },
  viewShortLine: {
    width: 1,
    height: 35,
    backgroundColor: '#f5f5f5',
  },
  introductionContainer: {
    padding: 10,
  },
  introductionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  introductionText: {
    marginTop: 5,
    fontSize: 12,
    color: '#8a8a8a',
  },
  catalogInfoContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  catalogInfoStyle: {
    marginStart: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  catalogImg: {
    width: 15,
    height: 15,
  },
  catalogTimeText: {
    marginStart: 15,
  },
  catalogTime: {
    fontSize: 12,
    color: '#8a8a8a',
  },
  catalogText: {
    fontSize: 12,
  },
  gotoImg: {
    width: 8,
    height: 12,
  },
  bookReviewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  commentText: {
    padding: 10,
    fontSize: 14,
    fontWeight: 'bold',
  },
  commentImage: {
    marginTop: 10,
    marginEnd: 10,
    width: 18,
    height: 18,
  },
  container: {
    paddingStart: 10,
    paddingEnd: 10,
    paddingBottom: 6,
    paddingTop: 10,
    borderBottomColor: '#f5f5f5',
    borderBottomWidth: 1,
  },
  itemUserContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  flexDirectionRow: {
    flexDirection: 'row',
  },
  userHeadIcon: {
    width: 30,
    height: 30,
    marginEnd: 8,
  },
  userName: {
    fontSize: 13,
    color: '#1450b5',
  },
  itemTime: {
    fontSize: 11,
  },
  itemPraise: {
    width: 15,
    height: 15,
    marginEnd: 3,
  },
});
