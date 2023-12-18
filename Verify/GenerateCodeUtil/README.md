# GenerateCodeUtil API 文档

## 简介

`GenerateCodeUtil` 是一个实用工具类，位于 `cn.katool.CheckCode` 包中。它提供了生成验证码和验证码图片的功能，并专为新手开发人员设计。

## 使用方法

### 1. 生成验证码

#### 1.1 使用默认字符集

```java
String verificationCode = GenerateCodeUtil.generateVerifyCode(6);
```

此方法使用默认字符集生成长度为 6 的验证码。

#### 1.2 使用自定义字符集

```java
String customCharacterSet = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
String verificationCode = GenerateCodeUtil.generateVerifyCode(6, customCharacterSet);
```

此方法允许您指定自定义字符集生成验证码。

### 2. 生成验证码图片

#### 2.1 生成到文件

```java
int width = 200;
int height = 80;
File outputFile = new File("path/to/output/image.png");
String verificationCode = GenerateCodeUtil.outputVerifyImage(width, height, outputFile, 6);
```

此方法生成指定尺寸的验证码图片并保存到文件。

#### 2.2 生成到输出流（可以直接修改Response响应）

```java
int width = 200;
int height = 80;
OutputStream outputStream = new FileOutputStream("path/to/output/image.png");
String verificationCode = GenerateCodeUtil.outputVerifyImage(width, height, outputStream, 6);
```

此方法生成指定尺寸的验证码图片并写入输出流。

## 附加功能

### 1. 根据关键字生成文本验证码

```java
String keyword = "example";
int codeLength = 8;
String textCode = GenerateCodeUtil.touchTextCode(keyword, codeLength);
```

此方法基于关键字和指定长度生成文本验证码。

## 加密与安全

`GenerateCodeUtil` 提供了字符串加密和 MD5 哈希的方法，以增强安全性。

- `StrHex`：使用指定的密钥和其他参数加密字符串。
- `getMD5Hex`：计算给定字符串的 MD5 哈希。
- `getTIMEstr`：生成基于时间的加密密钥。

注意：`salt` 属性在 `touchTextCode` 方法中用于增加安全性。
