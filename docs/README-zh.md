
<h1 align="center">
个人网站
</h1>

<div align="center">

[![](https://img.shields.io/github/stars/tyang816/tyang816.github.io)](https://github.com/tyang816/tyang816.github.io)
[![](https://img.shields.io/github/forks/tyang816/tyang816.github.io)](https://github.com/tyang816/tyang816.github.io)
[![](https://img.shields.io/github/issues/tyang816/tyang816.github.io)](https://github.com/tyang816/tyang816.github.io)
[![](https://img.shields.io/github/license/tyang816/tyang816.github.io)](https://github.com/tyang816/tyang816.github.io/blob/main/LICENSE)  | [English README](../README.md) 

</div>

<p align="center">一个现代、响应式的个人学术主页，包含论文笔记和人生时间线</p>


<p align="center">
    <br>
    <img src="./screenshot.png" width="100%"/>
    <br>
</p>

## 主要特点
- **论文笔记板块**: 全面的学术论文笔记集合，具有高级筛选和搜索功能
- **人生时间线**: 展示旅行经历和个人时刻的交互式时间线，配有照片画廊
- **支持谷歌Analytics**: 你可以通过简单的配置来实现使用谷歌Analytics跟踪网页的流量
- **响应式的**: 此主页会针对不同的屏幕尺寸自动调整布局
- **美观而简约**: 此主页美观而简约，适合个人学术主页的搭建
- **搜索引擎优化**: 搜索引擎优化 (SEO) 帮助搜索引擎轻松找到您在主页上发布的信息，然后将其与类似网站进行排名，并获得排名优势

## 网站板块

### 📚 论文笔记
- 按类别、会议、标签和日期进行高级搜索和筛选
- 按年份组织，便于导航
- 全面的学术论文摘要和见解

### 🌍 人生时间线
- 生活经历的交互式时间线
- 每个时间线条目的照片画廊
- 按旅行经历和个人时刻筛选
- 记忆的美丽视觉呈现

### 👨‍🎓 学术档案
- 专业信息、研究兴趣，以及谷歌学术主页链接
- 联系信息和社交媒体链接

## 快速开始

1. Fork本仓库到`USERNAME/USERNAME.github.io`，其中`USERNAME`是你的github用户名
1. 使用 [favicon-generator](https://redketchup.io/favicon-generator)生成favicon（网页icon文件），并下载所有文件到`REPO/images`
1. 修改主页配置文件[_config.yml](../_config.yml):
    1. `title`: 主页标题
    1. `description`: 主页的描述
    1. `repository`: USER_NAME/REPO_NAME  
    1. `google_analytics_id` (可选的): 谷歌Analytics ID
    1. SEO相关的键值 (可选的): 从搜索引擎的控制台里获得对应的ID (例如：Google, Bing and Baidu)，然后粘贴到这里
    1. `author`: 主页作者信息，包括其他网页、Email、所在城市、大学等
    1. 更多的配置信息在注释中有详细描述
1. 将你的主页内容添加到 [_pages/about.md](../_pages/about.md)
1. 自定义论文笔记板块 [_pages/notes.md](../_pages/notes.md)
1. 在 [_data/timeline.yml](../_data/timeline.yml) 中设置你的人生时间线，并自定义 [_pages/timeline.md](../_pages/timeline.md)
1. 你的主页将会被部署到`https://USERNAME.github.io`

## 本地调试

1. 使用`git clone`将本项目克隆到本地
1. 安装Jekyll的构建环境，包括`Ruby`、`RubyGems`、`GCC`和`Make`。可参考[该教程](https://jekyllrb.com/docs/installation/#requirements)
1. 运行 `bash run_server.sh` 来启动Jekyll实时重载服务器
1. 在浏览器里打开 [http://127.0.0.1:4000](http://127.0.0.1:4000)。如果你修改了网页的源码，服务器会自动重新编译并刷新页面
1. 当你修改完毕你的页面以后, 使用`git`命令，`commit`你的改动并`push`到你的github仓库中

# 致谢

- 本网站基于AcadHomepage构建，AcadHomepage集成了Font Awesome，根据SIL OFL 1.1和MIT许可证的条款分发
- AcadHomepage受到github仓库 [mmistakes/minimal-mistakes](https://github.com/mmistakes/minimal-mistakes) 的影响，该仓库根据MIT许可证分发
- AcadHomepage受到github仓库 [academicpages/academicpages.github.io](https://github.com/academicpages/academicpages.github.io) 的影响，该仓库根据MIT许可证分发