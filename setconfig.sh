#!/bin/bash
#使用方法: bash setconfig.sh $param  
#$param 值可以为 develop(开发环境)｜uat(UAT环境)｜product(生产环境) 
#如：bash setconfig.sh uat
#
echo "setting config start"
_dest="."
_src="./settings/$1"
cp $_src/config.js $_dest/src/
echo "setting config end"
