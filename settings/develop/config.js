/**
	* EPS前端代码配置信息
 */
var EPSConfigs = {};

// 开发环境配置信息
EPSConfigs.EpsEnvConfig = {
	// webpack.config.js中德勤api接口请求地址
	HostMcdEpsApi: 'http://112.64.154.126:7654',
	// webpack.config.js中jmis用户验证服务器地址
	Hostjmis: 'http://jmistest.mcd.com.cn',
	// jssdk初始化时的appid
	appid: '68'
}

module.exports = EPSConfigs;

