
<h1 align="center">
Personal Website
</h1>

<div align="center">

[![](https://img.shields.io/github/stars/tyang816/tyang816.github.io)](https://github.com/tyang816/tyang816.github.io)
[![](https://img.shields.io/github/forks/tyang816/tyang816.github.io)](https://github.com/tyang816/tyang816.github.io)
[![](https://img.shields.io/github/issues/tyang816/tyang816.github.io)](https://github.com/tyang816/tyang816.github.io)
[![](https://img.shields.io/github/license/tyang816/tyang816.github.io)](https://github.com/tyang816/tyang816.github.io/blob/main/LICENSE)  | [中文文档](./docs/README-zh.md) 
</div>

<p align="center">A Modern and Responsive Academic Personal Homepage with Paper Notes and Life Timeline</p>

<p align="center">
    <br>
    <img src="docs/screenshot.png" width="100%"/>
    <br>
</p>

## Key Features
- **Paper Notes Section**: Comprehensive collection of academic paper notes with advanced filtering and search capabilities
- **Life Timeline**: Interactive timeline showcasing travel experiences and personal moments with photo galleries
- **Automatically update google scholar citations**: Using the google scholar crawler and github action, this repository can update the author citations and publication citations automatically
- **Support Google analytics**: You can trace the traffics of your homepage by easy configuration
- **Responsive**: This homepage automatically adjust for different screen sizes and viewports
- **Beautiful and Simple Design**: This homepage is beautiful and simple, which is very suitable for academic personal homepage
- **SEO**: Search Engine Optimization (SEO) helps search engines find the information you publish on your homepage easily, then rank it against similar websites

## Website Sections

### 📚 Paper Notes
- Advanced search and filtering by categories, proceedings, tags, and dates
- Organized by year with easy navigation
- Comprehensive academic paper summaries and insights

### 🌍 Life Timeline  
- Interactive timeline of life experiences
- Photo galleries for each timeline entry
- Filter by travel experiences and personal moments
- Beautiful visual presentation of memories

### 👨‍🎓 Academic Profile
- Google Scholar integration with automatic citation updates
- Professional information and research interests
- Contact information and social media links

## Quick Start

1. Fork this repository and rename to `USERNAME.github.io`, where `USERNAME` is your github username
1. Configure the google scholar citation crawler:
    1. Find your google scholar ID in the url of your google scholar page (e.g., https://scholar.google.com/citations?user=SCHOLAR_ID), where `SCHOLAR_ID` is your google scholar ID
    1. Set GOOGLE_SCHOLAR_ID variable to your google scholar ID in `Settings -> Secrets -> Actions -> New repository secret` of the repository website with `name=GOOGLE_SCHOLAR_ID` and `value=SCHOLAR_ID`
    1. Click the `Action` of the repository website and enable the workflows by clicking *"I understand my workflows, go ahead and enable them"*. This github action will generate google scholar citation stats data `gs_data.json` in `google-scholar-stats` branch of your repository. When you update your main branch, this action will be triggered. This action will also be trigger 08:00 UTC everyday
1. Generate favicon using [favicon-generator](https://redketchup.io/favicon-generator) and download all generated files to `REPO/images`
1. Modify the configuration of your homepage `_config.yml`:
    1. `title`: The title of your homepage
    1. `description`: The description of your homepage
    1. `repository`: USER_NAME/REPO_NAME  
    1. `google_analytics_id` (optional): Google analytics ID
    1. SEO Related keys (optional): Get these keys from search engine consoles (e.g. Google, Bing and Baidu) and paste here
    1. `author`: The author information of this homepage, including some other websites, emails, city and university
    1. More configuration details are described in the comments
1. Add your homepage content in `_pages/about.md`
1. Customize the paper notes section in `_pages/notes.md`
1. Set up your life timeline in `_data/timeline.yml` and customize `_pages/timeline.md`
1. Your page will be published at `https://USERNAME.github.io`

## Debug Locally

1. Clone your repository to local using `git clone`
1. Install Jekyll building environment, including `Ruby`, `RubyGems`, `GCC` and `Make` following [the installation guide](https://jekyllrb.com/docs/installation/#requirements)
1. Run `bash run_server.sh` to start Jekyll livereload server
1. Open http://127.0.0.1:4000 in your browser
1. If you change the source code of the website, the livereload server will automatically refresh
1. When you finish the modification of your homepage, `commit` your changings and `push` to your remote repository using `git` command

# Acknowledges

- This website is based on AcadHomepage, which incorporates Font Awesome, distributed under the terms of the SIL OFL 1.1 and MIT License
- AcadHomepage is influenced by the github repository [mmistakes/minimal-mistakes](https://github.com/mmistakes/minimal-mistakes), which is distributed under the MIT License
- AcadHomepage is influenced by the github repository [academicpages/academicpages.github.io](https://github.com/academicpages/academicpages.github.io), which is distributed under the MIT License
