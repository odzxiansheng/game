const UI = {
  tip(title) {
    uni.showToast({
      title: title,
      icon: 'none',
      duration: 1500,
      mask: true
    })
  },
  success(title) {
    uni.showToast({
      title: title || '操作成功',
      icon: 'success',
      duration: 1500,
      mask: true
    })
  },
  fail(title) {
    uni.showToast({
      title: title || '操作失败',
      icon: 'fail',
      duration: 1500,
      mask: true
    })
  },
  loading() {
    uni.showToast({
      title: title || '加载中',
      icon: 'loading',
      duration: 1500,
      mask: true
    })
  },
  hideLoading() {
    uni.hideLoading();
  }
}
export default UI