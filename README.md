# Apple-Scale 5E

> **Note**: This project is a web-based implementation of a digital scale using the macOS Force Touch trackpad.
> **注意**：这是一个利用 macOS Force Touch 触控板实现的网页版电子秤。

![Apple-Scale 5E]
<img width="743" height="857" alt="Snipaste_2025-11-21_19-53-27" src="https://github.com/user-attachments/assets/b9d088bf-4d9a-4832-b427-900d38582866" />


## 🌟 Features (功能特点)

*   **Minimalist Design**: Inspired by Dieter Rams (Braun) aesthetics. (极简设计，致敬迪特·拉姆斯)
*   **High Sensitivity**: Optimized algorithm to detect small weights (single digits). (高灵敏度算法，可测个位数重量)
*   **Web-Based**: No installation required, runs in Safari. (无需安装，Safari 即开即用)
*   **Privacy First**: All data processed locally. (隐私安全，数据本地处理)

## 🚀 Quick Start (快速开始)

1.  Download the code or clone this repository.
    ```bash
    git clone https://github.com/asun51/5E-Apple-scale.git
    ```
2.  Double-click **`run.sh`** to launch. (双击 `run.sh` 启动)
3.  Or open `index.html` with **Safari**. (或用 Safari 打开 `index.html`)

## ⚖️ How to Use (使用指南)

**Important: The "Press and Hold" Technique (重要：按压归零法)**

Due to web browser limitations, we use a "manual tare" method for best accuracy:
由于网页浏览器的限制，为了获得最佳精度，请使用以下方法：

1.  **Press & Hold (按住)**: Press the trackpad with your finger until you hear the click and the number shows **0g**.
    (手指按住触控板直到听到咔哒声，此时屏幕显示 0g)
2.  **Add Weight (放物)**: While keeping your finger steady, place the object on the trackpad (or gently increase pressure).
    (保持手指力度不变，放上物品)
3.  **Read (读数)**: The number displayed is the weight of the object.
    (显示的数字即为物品重量)

## ⚠️ Requirements & Safety (安全须知)

*   **Browser**: **Safari** is required (Chrome blocks Force Touch data). (必须使用 Safari 浏览器)
*   **Hardware**: MacBook with Force Touch trackpad or Magic Trackpad 2+.
*   **Limit**: Do not exceed **400g**. (最大承重 400g)
*   **Caution**: Treat your trackpad gently. (请轻拿轻放)

## 📄 License

MIT License.
