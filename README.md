dva框架搭建的用户管理demo

在本地run起来前提条件：
1. 确保 node 版本是 6.5 +
2. 用 cnpm 或 yarn 能节约你安装依赖的时间

再执行以下操作
1. git clone http://54.223.153.229/mengying/dva-users.git
2. cd dva-users
3. npm install 
4. npm run build
5. npm start 即可看到效果

如果想自动生成dva的其他路由，model或component等基础文件，还需要安装0.7及以上版本的dva-cli:
	$ npm i dva-cli -g
	$ npm -v


此demo 由“12 步 30 分钟，完成用户管理的 CURD 应用 (react+dva+antd) #18”而来
文章地址：https://github.com/sorrycc/blog/issues/18?hmsr=toutiao.io&utm_medium=toutiao.io&utm_source=toutiao.io

由于设备，配件，IT设备，IT设备配件没有返回唯一的id，所以eps系统根据唯一规则，拼装了epsid
唯一规则如下：
1.设备的话，唯一标识就是 "deviceNumber": "设备编号"   
   epsid = deviceNumber id = deviceNumber
2.设备配件的话，唯一标识就是 "deviceNumber": "设备编号" +"partNumber": "配件编号"  
   epsid=deviceNumber+'.'+’partNumber’    id=deviceNumber+'.'+’partNumber’
3.IT设备的话，唯一标识就是 "deviceCode": "it设备id" + "typeCode": "型号代码" 
   epsid=deviceCode+'.'+typeCode    id=deviceCode+'.'+typeCode
4.IT设备配件的话，唯一标识就是"deviceNumber": "it配件编号"
    epsid=deviceNumber id=deviceNumber
    
没返回id的原因： 因为这些是主键是由麦当劳主数据方决定的，所以业务主键里并没有叫id的标识。虽说实际表里有id这个物理主键，但这个不适用于去做匹配


环境设置及代码发布说明如下：

1. eps启用了master分支和eps_uat分支
develop分支对应开发环境，开发时在这个分支开发
eps_uat分支对应UAT环境，会合并develop分支的代码
master分支对应生产环境，会合并eps_uat分支的代码

2. eps根目录增加了3个脚本
	2.1 setconfig.sh 
			作用： 设置代码环境，
			使用方法： bash setconfig.sh $param  
			参数设置： $param 值可以为 develop(开发环境)｜uat(UAT环境)｜product(生产环境) 
			例：如果需访问uat,可执行命令：bash setconfig.sh uat
	2.2 publishuat.sh
			作用： 给UAT环境打包代码
			使用方法： bash publishuat.sh $branch  
			参数设置： $branch可不传，不传默认合并develop分支的代码
			注： 为避免提交了不必要的代码，此脚本不提供提交代码的操作，只负责代码的更新，编译，打包
	2.3 publishproduct.sh
			作用： 给生产环境打包代码
			使用方法： bash publishproduct.sh $branch  
			参数设置： $branch可不传，不传默认合并eps_uat分支的代码
			注： 为避免提交了不必要的代码，此脚本不提供提交代码的操作，只负责代码的更新，编译，打包
	提交操作都需打包完成后 自行操作，包括master分支的tag



