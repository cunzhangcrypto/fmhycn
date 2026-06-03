# 贡献指南

> [!INFO] 注意
> 部分步骤如果加入我们的 [Discord](https://github.com/fmhy/FMHY/wiki/FMHY-Discord) 会更容易完成。该频道每周五开放。

以下是为希望开始贡献的人准备的一些通用指南。贡献方式有多种：

- [提交链接](#提交链接)
- [报告现有网站](#添加网站)
- [如何编辑和预览更改](#进行更改)
- [寻找新网站](https://www.reddit.com/r/FREEMEDIAHECKYEAH/wiki/find-new-sites/)

## 提交链接

> [!INFO] 注意
> 对于维基的较大改动，例如精简内容或重构页面/章节，您必须事先通过 [Discord](https://github.com/fmhy/FMHY/wiki/FMHY-Discord) 与我们讨论，然后再开启 [Pull Request](https://github.com/fmhy/edit/pulls)。

**请不要提交以下任何内容：**

- **💰️ 付费 / 试用网站** - 我们不接受任何仅限付费或免费试用的条目，少数已列出的付费 [VPN](/privacy#vpn) 和 [Debrid](/downloading#debrid-leeches) 除外。
- **🕹️ 模拟器** - 已列在 [索引网站](/gaming#emulators) 中。
- **🌐 网页浏览器** - 优秀的开源浏览器已列出，我们只接受索引类、注重隐私类以及优秀的移动端浏览器。
- **🔻 吸血站（Leeches）** - 除非未列在现有的 [Leech 列表](/downloading#debrid-leeches) 中，否则请不要提交。
- **🐧 Linux 发行版** - 已列在 [索引网站](/linux-macos#linux-distros) 中。
- **🌍 非英文软件** - 我们不添加非英文的软件网站（APK、游戏、BT资源等），除非它们有非常好的口碑。
- **🗂️ 代码库** - 这类网站太多了，有更合适的地方可以找到它们。
- **🎲 挖矿 / 博彩网站** - 不要提交任何与博彩、挖矿、BIN、CC 等相关的内容。
- **🎮 多人游戏作弊** - 不要提交任何在多人在线游戏中提供不公平优势的外挂或利用漏洞的工具。
- **🖥️ 定制操作系统** - 我们不推荐大家使用这些。

### 添加网站

提交新链接时，请遵循以下步骤：

- 确保该网站尚未收录在维基中。最简单的方法是查看我们的 [单页版](https://fmhy.net/single-page.md) / [2](https://api.fmhy.net/single-page) 并使用 `ctrl+f` 搜索。
- 不要一次性批量提交一堆未经测试的链接。尽量只发送您真心觉得值得添加的内容。
- 通过反馈系统、[GitHub](https://github.com/fmhy/edit) 或加入我们的 [Discord](https://github.com/fmhy/FMHY/wiki/FMHY-Discord) 联系我们。请注意，我们需要自己检查网站，因此使用 issue 比 pull request 更便捷。
- 您可以选择性地附上社交媒体、工具或任何其他附加信息。

### 报告网站

> [!INFO] 注意
> 如果是紧急情况，您可以通过我们的反馈系统请求邀请。

对于现有条目的修改，请遵循以下步骤：

- 通过反馈系统、[GitHub](https://github.com/fmhy/edit) 或加入我们的 [Discord](https://github.com/fmhy/FMHY/wiki/FMHY-Discord) 联系我们。
- 如有需要，使用反馈系统时请随意留下联系方式。只有受信任的工作人员可以查看这些信息。
- 如果您要报告网站删除或星级更改，必须详细说明您的更改应被接受的理由。

### 链接测试

所有新增内容都必须先在我们的 [Discord](https://github.com/fmhy/FMHY/wiki/FMHY-Discord) 上经过测试流程。

您可以帮忙测试新网站，以确定它们的用途、安全性以及是否适合加入维基。

请注意，某些网站（如盗版网站）需要更多测试/审查才能被添加。

### 格式规则

维基始终会存在一些差异，这可能是由于存在例外、布局/结构本身，或者 Markdown 本身的灵活性所致。

由于这些原因，要满足所有条件和细微差别以制作出一份简易指南是非常困难的。不过，您通常可以通过查看现有链接的结构来大致了解格式。

请注意，我们会尽量按从最佳到较差的顺序排列章节，如果多个链接在同一行，只有 **加粗** 的链接被视为星级推荐。

如果不确定，请在 [Discord](https://github.com/fmhy/FMHY/wiki/FMHY-Discord) 上的维基频道中提问，并等待工作人员回复。

## 进行更改

以下是编辑维基和预览更改的各种方法说明。

### GitHub 编辑器

您可以通过两种方式使用内置的网页编辑器：

1. 找到要编辑的文件，寻找编辑图标（一支铅笔）并点击它，然后进行更改。

    ![编辑按钮](https://files.catbox.moe/7w3hnm.png)

2. 完成后，点击 "Commit Changes..."（提交更改...），然后点击 "Propose changes"（提议更改）。可选添加提交描述。

3. 您会看到一个显示所有编辑内容的比较页面。点击 "Create pull request"（创建拉取请求），在框中填写更改说明，然后点击提交。

**或者**

1. 点击右上角的 "Fork"（复刻）按钮来复刻仓库。

2. 导航到您复刻的仓库主页，按键盘上的 `.`（句点）键。这将在 `github.dev` 上打开一个类似 VSCode 的仓库环境。

3. 进行更改，然后通过源代码管理选项卡提交。
    
    ![源代码管理](https://files.catbox.moe/pa571v.png)

4. 回到您复刻的仓库主页，点击 "Contribute"（贡献），然后点击 "Open pull request"（开启拉取请求）。

5. 您会看到一个显示所有编辑内容的比较页面。点击 "Create pull request"（创建拉取请求），在框中填写更改说明，然后点击提交。

### 开发环境

如果您要处理网站本身的工作，或者只是想预览网站及任何更改，可以通过搭建开发环境来实现。

#### GitHub Codespaces

这将在浏览器中创建一个环境（[每月 60 小时免费额度](https://docs.github.com/en/billing/concepts/product-billing/github-codespaces#free-and-billed-use-by-personal-accounts)）。使用 Codespaces 的步骤如下：

1. 点击右上角的 "Fork"（复刻）按钮来复刻仓库。

2. 导航到您复刻的仓库主页，点击仓库上方的绿色 "Code"（代码）按钮，打开 "Codespaces" 选项卡，然后点击 "Create codespace"（创建 codespace）。

3. 您可能需要等待约 5-10 分钟让 codespace 加载完成。

    ![Codespace 状态](https://files.catbox.moe/5bp38f.png)

4. 加载完成后，运行 `pnpm i && pnpm docs:dev` 启动预览。预览出现后，点击右下角的 "Open in Browser"（在浏览器中打开）。

5. 进行更改并提交。

6. 要关闭它，再次点击 "Code"（代码）按钮，在您的 codespace 旁边找到 `...` 下拉菜单，然后点击 "Stop codespace"（停止 codespace）。

#### 本地环境

在本地仓库上进行更改可能需要您对 Git 有基本的了解。您可以在[这里](/educational#developer-learning)找到学习资源。

有关手动设置的更多信息，请参见[这里](/other/selfhosting)。