---
layout: post
title: 配置两个git账号
category: experience
---

因为公司使用的是stash，而自己的博客使用的却是github，刚开始的时候配置好了gitub账号，发现公司的stash出错了，无法使用。发现两边共用的同一个config配置信息，里面的账号和邮箱只能有一个，也就是在C盘里存储的全局config配置。

但是如果在工作之余也想用公司的电脑来维护个人的博客，这个时候该怎么办？

在网上搜索了很多git多账号配置的文章，如下：

- [git多账号登录问题](https://segmentfault.com/a/1190000006105679)
- [git多账号配置问题](https://segmentfault.com/a/1190000006105759)

看了之后，觉得很有道理，这样配置应该没有问题，但是现实是。。。依然在提交的时候被deny了。。。

    不过研究了那么久，我发现我还是懒一点，只在博客的目录下设置局部账户配置信息，就可以搞定了，so .....

    cd "进入博客根目录"
    git config --local user.name "wilsonIs"
    git config --local user.email "zhangtao522009@163.com"

    当然ssh的配置在这之前已经设置好了。

能满足需求就好了，其它的多账号的配置以后有需要的时候再来分析吧。

对，现在是在用公司的电脑编辑，嗯，下班了。
