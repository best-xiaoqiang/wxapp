function promisify(fn) {
  return function(obj = {}) {
    return new Promise((resolve, reject) => {
      if (!obj.success) {
        obj.success = res => {
          resolve(res);
        };
      }
      if (!obj.fail) {
        obj.fail = err => {
          reject(err);
        };
      }
      fn(obj);
    });
  };
}

const showToast = promisify(wx.showToast);

function previewImage(imageList = [], current = '') {
  if (typeof imageList === 'string') {
    imageList = [imageList];
  }
  if (!Array.isArray(imageList)) {
    throw new Error('传入数组或者字符串');
  }
  return promisify(wx.previewImage)({urls: imageList, current});
}

const saveImage = promisify(wx.saveImageToPhotosAlbum);

function getImageInfo(src) {
  if (wx.getImageInfo) {
    return promisify(wx.getImageInfo)({src});
  } else {
    showToast({title: '提示', content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'});
  }
}

function getFileInfo(filePath) {
  if (wx.getFileInfo) {
    return promisify(wx.getFileInfo)({filePath});
  } else {
    showToast({title: '提示', content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'});
  }
}

const getSetting = promisify(wx.getSetting);
function authorize(scope) {
  return promisify(wx.authorize)({scope});
}

const showModal = promisify(wx.showModal);
const fetch = promisify(wx.request);
const getNetworkType = promisify(wx.getNetworkType);

// login.js
const login = promisify(wx.login);
const getUserInfo = promisify(wx.getUserInfo);

const hideLoading = promisify(wx.hideLoading);
const uploadFile = promisify(wx.uploadFile);
const canvasToTempFilePath = promisify(wx.canvasToTempFilePath);
const chooseImage = promisify(wx.chooseImage);

export default {
  getSetting,
  showToast,
  saveImage,
  getImageInfo,
  getFileInfo,
  authorize,
  showModal,
  previewImage,
  fetch,
  getNetworkType,
  login,
  getUserInfo,
  hideLoading,
  canvasToTempFilePath,
  uploadFile,
  chooseImage
};
