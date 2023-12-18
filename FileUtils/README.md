# FileUtils API 文档

## 简介

`FileUtils` 是一个文件处理工具类，提供了创建临时文件的功能。

## 使用方法

### 1. 创建临时文件

#### 1.1 创建默认的临时文件

```java
File tempFile = FileUtils.createTempFile();
```

此方法创建一个默认的临时文件，并返回 `File` 对象。

#### 1.2 创建可重复创建的临时文件

```java
File tempFile = FileUtils.createTempFile(true);
```

此方法创建一个可重复创建的临时文件，并返回 `File` 对象。如果文件已存在，将会删除并重新创建。

### 注意事项

- 默认情况下，创建的临时文件是不可重复创建的，即如果文件已存在，则不会再次创建。如果需要可重复创建的临时文件，可以使用 `createTempFile(true)` 方法。
- 在创建临时文件时，如果多次重试失败（50 次），将抛出 `KaToolException` 异常，错误码为 `FILE_ERROR`。

```java
try {
    File tempFile = FileUtils.createTempFile();
    // 执行相关逻辑
} catch (KaToolException e) {
    e.printStackTrace();
    // 处理异常
}
```

请根据实际需求使用上述方法，灵活处理临时文件的创建。