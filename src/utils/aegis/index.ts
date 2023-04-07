/**
 * 腾讯前端监控平台
 */
import Aegis from 'aegis-web-sdk'

class AegisUtil {
  private _aegis?: Aegis
  init() {
    this._aegis = new Aegis({
      id: 'W75VRiad6eZgbVXeGl', // 上报 id
      reportApiSpeed: true, // 接口测速
      reportAssetSpeed: true, // 静态资源测速
      spa: true, // spa 应用页面跳转的时候开启 pv 计算
    })
  }

  reportInfo(reportInfo: {
    ext1: string
  }) {
    this._aegis?.report({
      msg: '这是一个ajax错误日志',
      level: Aegis.logType.EVENT,
      ...reportInfo,
    })
  }
}

const AegisHelper = new AegisUtil()
export default AegisHelper
