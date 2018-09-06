#!/bin/bash
# 打包UAT脚本，可以指定合并哪个分支的代码发布
#使用方法: bash publishuat.sh  或 bash publishuat.sh $1
#如：bash publishuat.sh 或 bash publishuat.sh branch_test
#

echo "开始切换为eps_uat分支"

git checkout eps_uat

echo "切换为eps_uat分支结束"

echo "开始更新eps_uat分支代码"

git pull origin eps_uat

echo "更新eps_uat分支代码结束"

if [ $1 ] ; then 

echo "开始切换$1分支"

git checkout $1

echo "切换$1分支结束"

echo "更新$1分支代码"

git pull origin $1

echo "$1分支代码更新结束"

echo "开始切回eps_uat分支"

git checkout eps_uat

echo "切回eps_uat分支结束"

echo "合并$1分支代码"

git merge $1

echo "合并$1分支代码结束"    

else 

echo "开始切换develop分支"

git checkout develop

echo "切换develop分支结束"

echo "更新develop分支代码"

git pull origin develop

echo "develop分支代码更新结束"

echo "开始切回eps_uat分支"

git checkout eps_uat

echo "切回eps_uat分支结束"

echo "合并develop分支代码"

git merge develop

echo "合并develop分支代码结束"

fi 

echo "开始合并雪碧图"

gulp spriter

echo "合并雪碧图结束"

echo "编译css"

gulp styles

echo "编译css结束"

echo "压缩资源图"

gulp mini

echo "压缩资源图结束"

echo "开始设置打包环境"

bash setconfig.sh uat

echo "环境设置结束"

echo "打包eps代码"

webpack -p

echo "打包eps代码结束"

echo "拷贝打包后的文件到public目录"

gulp public

echo "拷贝打包后的文件到public目录结束"
echo "请自行提交代码到eps_uat分支"






