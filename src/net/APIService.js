import {Alert} from 'react-native';

class APIService {
  getRequest(url, params) {
    var opts = {
      method: 'GET',
      headers: {
        Accept: 'application/json', // 提交参数的数据方式,这里以json的形式
        'Content-Type': 'application/json',
        Authorization: 'APPCODE a9b502b563bb4faea34a51073a6b60ce',
        Connection: 'close',
      },
    };
    let paramsArray = [];
    //拼接参数
    Object.keys(params).forEach(key =>
      paramsArray.push(key + '=' + params[key]),
    );
    url += '?' + paramsArray.join('&');
    console.log(url);
    return new Promise((resolve, reject) => {
      fetch(url, opts)
        .then(response => {
          // console.log(response);
          return response.json(); //返回一个带有文本的对象
        })
        .then(responseJson => {
          // console.log(responseJson);
          if (responseJson.error_code === 0) {
            resolve(responseJson);
            // console.log(responseJson);
          } else if (responseJson.error_code === undefined) {
            // console.log(responseJson);
            resolve(responseJson);
          } else {
            reject(responseJson.reason);
          }
        })
        .catch(error => {
          reject(error);
          Alert(error);
        });
    });
  }
}
module.exports = new APIService();
