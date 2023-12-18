# QiniuServiceImpl API 文档

这个是在V1.9.5.GAMA之前的版本，在GAMA之后我们命名为`QiNiuYunServiceImpl`，并且其他策略的OSS存储也是使用同样的接口

## 简介

`QiniuServiceImpl` 是七牛云服务的实现类，提供了文件上传、删除和相关操作的功能。该类通过注入 `UploadManager`、`BucketManager` 和 `Auth` 实例来完成七牛云相关的操作。

## 使用方法

### 1. 文件上传

#### 1.1 上传文件

```java
File file = new File("path/to/your/file");
String dir = "your/directory";
String fileNameFast = "yourFileNameFast";
String fileNameSecond = "yourFileNameSecond";
boolean isCompulsion = true; // 是否强制上传（存在同名文件时是否删除）
String fileUrl = qiniuService.uploadFile(file, dir, fileNameFast, fileNameSecond, isCompulsion);
```

此方法上传指定文件到七牛云，并返回文件访问 URL。

#### 1.2 上传 InputStream

```java
InputStream inputStream = new FileInputStream(new File("path/to/your/file"));
String dir = "your/directory";
String fileNameFast = "yourFileNameFast";
String fileNameSecond = "yourFileNameSecond";
boolean isCompulsion = true; // 是否强制上传（存在同名文件时是否删除）
String fileUrl = qiniuService.uploadFile(inputStream, dir, fileNameFast, fileNameSecond, isCompulsion);
```

此方法上传输入流到七牛云，并返回文件访问 URL。

### 2. 文件删除

#### 2.1 删除文件

```java
String dir = "your/directory";
String fileName = "yourFileName";
String result = qiniuService.delete(dir, fileName);
```

此方法删除七牛云上指定目录和文件名的文件。

### 3. 文件是否存在

#### 3.1 检查文件存在性

```java
String dir = "your/directory";
String fileNameFast = "yourFileNameFast";
String fileNameSecond = "yourFileNameSecond";
boolean isExist = qiniuService.isExist(dir, fileNameFast, fileNameSecond);
```

此方法检查七牛云上指定目录和文件名的文件是否存在。

### 4. 获取文件原始名称

```java
String fileUrl = "http://your.domain/your/file/url";
String originName = qiniuService.getOriginName(fileUrl);
```

此方法从文件 URL 中提取原始文件名。

### 5. 获取文件访问 URL

```java
String fileName = "yourFileName";
String fileUrl = qiniuService.getUrlByName(fileName);
```

此方法根据文件名获取完整的文件访问 URL。

## 属性配置

```yaml
katool:
  # 七牛云配置 所有值都必须存在,没有的话留空,不能缺
      qiniu:
        accessKey: #你的七牛云accessKey
        secretKey: #你的七牛云secretKey
        # 对象储存
        bucket: # 空间名称
        zone: # 存储区域
        domain: # 访问域名
        basedir: # 文件存储根目录
```

确保在配置文件中正确配置了七牛云相关参数。

## 注意事项

- 请确保配置文件中的七牛云参数正确配置。
- 文件上传时，建议使用不同的文件名，以避免同名文件的冲突。
- 删除文件时，如果文件不存在，会返回 "删除失败"。

```java
String result = qiniuService.delete(dir, fileName);
if (result.equals("删除成功!")) {
    // 执行删除成功的逻辑
} else {
    // 执行删除失败的逻辑
}
```

请根据实际需求使用上述方法，灵活配置文件上传、删除和其他相关操作。