# 个人网站项目

这是一个现代化的个人网站项目，使用HTML、CSS和JavaScript构建。

## 功能特点

- 响应式设计，适配各种设备
- 现代化的UI设计
- 平滑的动画效果
- 博客文章展示
- 作品集展示
- 个人简介页面

## 项目结构

```
personal-website/
├── assets/
│   ├── css/
│   │   ├── style.css
│   │   └── components/
│   │       ├── navbar.css
│   │       ├── hero.css
│   │       └── ...
│   ├── js/
│   │   └── main.js
│   └── images/
│       ├── avatar.png
│       └── ...
├── index.html       # 首页
├── about.html       # 个人简介
├── portfolio.html   # 作品集
├── blog.html        # 博客
└── README.md
```

## 技术栈

- HTML5
- CSS3 (使用现代特性如Flexbox、Grid、变量等)
- JavaScript (ES6+)
- Phosphor Icons
- Google Fonts (Poppins, Inter)

## 开始使用

1. 克隆项目
```bash
git clone [项目地址]
```

2. 安装依赖
```bash
# 如果需要使用本地服务器
npm install -g live-server
```

3. 运行项目
```bash
# 使用live-server运行
live-server
```

## 自定义

1. 修改颜色方案
在 `assets/css/style.css` 中修改 `:root` 变量：
```css
:root {
    --primary: #FF6B6B;
    --secondary: #4ECDC4;
    --accent: #FFE66D;
    --dark: #2D3436;
    --light: #F7F7F7;
}
```

2. 更换头像
将你的头像图片放在 `assets/images/` 目录下，并在HTML中更新路径。

3. 添加新的博客文章
在 `blog.html` 中添加新的文章卡片，或通过API获取文章数据。

## 贡献

欢迎提交问题和改进建议！

## 许可证

MIT License 