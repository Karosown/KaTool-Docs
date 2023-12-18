# ImageUtils API 文档

## 简介

`ImageUtils` 是一个图像处理工具类，提供了 Base64 转图片、图片转 Base64、将图片放到输出流对象等功能。

## 使用方法

### 1. Base64 转图片

#### 1.1 转换为图片文件

```java
String base64 = "your-base64-string";
File imageFile = ImageUtils.base642img(base64);
```

此方法将 Base64 字符串转换为图片文件，并返回 `File` 对象。

### 2. 图片转 Base64

#### 2.1 转换为 Base64 字符串

```java
File imageFile = new File("path/to/your/image");
String base64 = ImageUtils.img2base64(imageFile);
```

此方法将图片文件转换为 Base64 字符串，并返回 Base64 编码。

### 3. 将图片放到输出流对象

#### 3.1 将图片输出到输出流

```java
String imageUrl = "http://your.image/url.jpg";
OutputStream os = new ByteArrayOutputStream();
ImageUtils.img2fileToOutputStream(imageUrl, os);
```

此方法将图片通过 URL 放到输出流对象中。

## 注意事项

- 在使用 `base642img` 方法时，传入的 Base64 字符串需要包含文件类型的前缀，例如 `data:image/png;base64,`。
- 如果图片来源于网络，使用 `img2fileToOutputStream` 方法时需要传入图片的 URL。
- 在使用图片文件转 Base64 时，确保文件路径正确，文件存在，否则可能会抛出 `FileNotFoundException` 异常。

```java
File imageFile = new File("path/to/your/image");
try {
    String base64 = ImageUtils.img2base64(imageFile);
    // 执行相关逻辑
} catch (IOException e) {
    e.printStackTrace();
    // 处理异常
}
```

请根据实际需求使用上述方法，灵活处理图像转换和输出流操作。