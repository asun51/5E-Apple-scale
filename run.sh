#!/bin/bash

# 获取脚本所在目录的绝对路径
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# 定义 HTML 文件的路径
FILE_PATH="$DIR/index.html"

# 检查文件是否存在
if [ -f "$FILE_PATH" ]; then
    echo "正在启动 M1 电子秤..."
    echo "Opening M1 Scale..."
    # 使用 Safari 打开文件 (Safari 是唯一支持 Force Touch API 的浏览器)
    open -a Safari "$FILE_PATH"
else
    echo "错误：找不到 index.html 文件！"
    echo "Error: index.html not found!"
    exit 1
fi
