@echo off
chcp 65001 >nul
title FOS 航班运行指挥系统 - 开发服务器

echo ==============================================
echo          FOS 航班运行指挥系统
echo              开发服务器启动
echo ==============================================
echo.

REM 获取脚本所在目录
set "SCRIPT_DIR=%~dp0"
set "NODE_FOLDER=%SCRIPT_DIR%NODE\node-v25.9.0-win-x64"

REM 检查本地Node.js是否存在
if not exist "%NODE_FOLDER%\node.exe" (
    echo [错误] 未找到内置 Node.js
    echo 路径: %NODE_FOLDER%\node.exe
    echo.
    echo 请确保 NODE 文件夹存在于项目目录中
    pause
    exit /b 1
)

REM 将本地Node.js添加到PATH
set "PATH=%NODE_FOLDER%;%PATH%"
echo [✓] 已加载本地 Node.js
echo.

REM 显示版本信息
echo Node.js 版本:
node -v
echo npm 版本:
npm -v
echo.

REM 切换到项目目录
cd /d "%SCRIPT_DIR%"

REM 检查是否存在package.json文件
if not exist "package.json" (
    echo [错误] 当前目录没有 package.json
    echo 请确保在项目根目录运行此脚本
    pause
    exit /b 1
)

REM 检查 node_modules 是否存在
if not exist "node_modules" (
    echo [信息] 首次运行，正在安装依赖...
    echo 使用淘宝镜像加速下载...
    echo.
    call npm install --registry=https://registry.npmmirror.com --force
    
    if errorlevel 1 (
        echo.
        echo [错误] 依赖安装失败
        pause
        exit /b 1
    )
    echo.
    echo [✓] 依赖安装完成
) else (
    echo [✓] 依赖已安装，跳过安装步骤
)

echo.
echo ==============================================
echo          正在启动开发服务器...
echo ==============================================
echo.
echo 启动命令: npm run dev
echo.
echo 提示: 服务器启动后，请在浏览器中访问显示的地址
echo       通常是 http://localhost:5173/
echo.
echo 按 Ctrl+C 可以停止服务器
echo.

REM 启动项目
call npm run dev

REM 如果服务器停止
echo.
echo ==============================================
echo              服务器已停止
echo ==============================================
pause
