# 通用OSS对象存储SDK使用

# yaml配置

基本使用方法和1.9.5.BETA及之前相同，所有的OSS都是使用的相同的接口

但是yaml配置有所改变

```yaml
katool:
	store:
		qiniu:
			# 和之前一样的七牛云配置
		aliyun:
			# 阿里云配置待更新
		tencent:
			# 腾讯云配置待更新
```

你要实现其他的策略，继承实现StoreService就可以了，当然规范点你还要多实现一层扩展层。

# Spring注入

统一使用StoreService对象即可，@Resource进行注入

注入名称分别为：

`Store-ALiYun`、`Store-QiNiuYun`、`Store-Tencent`

