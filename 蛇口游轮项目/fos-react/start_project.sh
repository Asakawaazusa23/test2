#!/bin/bash

# FOS 航班运行指挥系统 - 开发服务器启动脚本
# 支持 macOS 和 Linux 系统

echo "=============================================="
echo "          FOS 航班运行指挥系统"
echo "              开发服务器启动"
echo "=============================================="
echo ""

# 获取脚本所在目录
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
NODE_FOLDER="$SCRIPT_DIR/NODE/node-v25.9.0-win-x64"

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 检查操作系统
OS="$(uname -s)"
case "${OS}" in
    Linux*)     PLATFORM=Linux;;
    Darwin*)    PLATFORM=Mac;;
    CYGWIN*)    PLATFORM=Cygwin;;
    MINGW*)     PLATFORM=MinGw;;
    *)          PLATFORM="UNKNOWN:${OS}"
esac

echo -e "${BLUE}检测到操作系统: $PLATFORM${NC}"
echo ""

# 检查本地Node.js是否存在（Windows 内置版本）
if [ -f "$NODE_FOLDER/node.exe" ]; then
    # Windows 环境（使用内置 Node）
    export PATH="$NODE_FOLDER:$PATH"
    echo -e "${GREEN}[✓] 已加载内置 Node.js${NC}"
    echo ""
else
    # 检查系统是否已安装 Node.js
    if command -v node &> /dev/null; then
        echo -e "${GREEN}[✓] 使用系统 Node.js${NC}"
        echo ""
    else
        echo -e "${RED}[错误] 未找到 Node.js${NC}"
        echo ""
        echo "请安装 Node.js:"
        echo "  - macOS: brew install node"
        echo "  - Linux: sudo apt-get install nodejs npm"
        echo ""
        read -p "按回车键退出..."
        exit 1
    fi
fi

# 显示版本信息
echo "Node.js 版本:"
node -v
echo "npm 版本:"
npm -v
echo ""

# 切换到项目目录
cd "$SCRIPT_DIR"

# 检查是否存在package.json文件
if [ ! -f "package.json" ]; then
    echo -e "${RED}[错误] 当前目录没有 package.json${NC}"
    echo "请确保在项目根目录运行此脚本"
    read -p "按回车键退出..."
    exit 1
fi

# 检查 node_modules 是否存在
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}[信息] 首次运行，正在安装依赖...${NC}"
    echo "使用淘宝镜像加速下载..."
    echo ""
    npm install --registry=https://registry.npmmirror.com --force
    
    if [ $? -ne 0 ]; then
        echo ""
        echo -e "${RED}[错误] 依赖安装失败${NC}"
        read -p "按回车键退出..."
        exit 1
    fi
    echo ""
    echo -e "${GREEN}[✓] 依赖安装完成${NC}"
else
    echo -e "${GREEN}[✓] 依赖已安装，跳过安装步骤${NC}"
fi

echo ""
echo "=============================================="
echo "          正在启动开发服务器..."
echo "=============================================="
echo ""
echo "启动命令: npm run dev"
echo ""
echo "提示: 服务器启动后，请在浏览器中访问显示的地址"
echo "      通常是 http://localhost:5173/"
echo ""
echo "按 Ctrl+C 可以停止服务器"
echo ""

# 启动项目
npm run dev

# 如果服务器停止
echo ""
echo "=============================================="
echo "              服务器已停止"
echo "=============================================="
read -p "按回车键退出..."
