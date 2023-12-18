# IDCardValidUtils 使用文档

## 介绍

`IDCardValidUtils` 是一个用于验证身份证号码合法性的工具类。它支持验证15位和18位身份证号码的基本数字和位数，以及提供了身份证号码的合法性校验。

## 使用方法

### 1. 引入 IDCardValidUtils 工具类

确保你的项目中已经引入了 `IDCardValidUtils` 类。你可以将其添加到你的项目中，并在需要验证身份证号码的地方调用相应的方法。

```java
import cn.katool.util.verify.IDCardValidUtils;
```

### 2. 验证身份证号码合法性

#### 2.1 验证18位身份证号码

调用 `isValidate18Idcard` 方法，传入待验证的身份证号码，以判断其合法性。

```java
String idcard = "身份证号码";
boolean isValid = IDCardValidUtils.isValidate18Idcard(idcard);
```

#### 2.2 验证15位身份证号码

调用 `isValidate15Idcard` 方法，传入待验证的身份证号码，以判断其合法性。

```java
String idcard = "身份证号码";
boolean isValid = IDCardValidUtils.isValidate15Idcard(idcard);
```

#### 2.3 验证所有位数的身份证号码

调用 `isValidatedAllIdcard` 方法，传入待验证的身份证号码，以判断其合法性。该方法内部会自动转换15位身份证号码为18位后再进行验证。

```java
String idcard = "身份证号码";
boolean isValid = IDCardValidUtils.isValidatedAllIdcard(idcard);
```

### 3. 身份证号码格式转换

#### 3.1 将15位身份证号码转为18位

调用 `convertIdcarBy15bit` 方法，传入15位的身份证号码，以将其转换为18位身份证号码。

```java
String idcard15 = "15位身份证号码";
String idcard18 = IDCardValidUtils.convertIdcarBy15bit(idcard15);
```

## 注意事项

- 请确保调用方法时传入的身份证号码符合规范，否则验证结果可能不准确。
- 此工具类提供了身份证号码的基本数字和位数验证，但并不保证身份证号码的实际存在性。
- 如果需要在项目中使用身份证号码验证功能，请合理处理身份证号码的来源和使用场景，以确保信息的准确性和安全性。

## 示例

```java
import cn.katool.util.verify.IDCardValidUtils;

public class Example {
    public static void main(String[] args) {
        // 验证18位身份证号码
        String idcard18 = "身份证号码";
        boolean isValid18 = IDCardValidUtils.isValidate18Idcard(idcard18);
        System.out.println("18位身份证号码合法性: " + isValid18);

        // 验证15位身份证号码
        String idcard15 = "身份证号码";
        boolean isValid15 = IDCardValidUtils.isValidate15Idcard(idcard15);
        System.out.println("15位身份证号码合法性: " + isValid15);

        // 验证所有位数的身份证号码
        String idcardAll = "身份证号码";
        boolean isValidAll = IDCardValidUtils.isValidatedAllIdcard(idcardAll);
        System.out.println("所有位数的身份证号码合法性: " + isValidAll);

        // 将15位身份证号码转为18位
        String idcard15to18 = "15位身份证号码";
        String idcard18Converted = IDCardValidUtils.convertIdcarBy15bit(idcard15to18);
        System.out.println("15位身份证号码转为18位: " + idcard18Converted);
    }
}
```

以上示例演示了如何在 Java 项目中使用 `IDCardValidUtils` 工具类进行身份证号码的合法性验证和格式转换。

希望这个文档对你有帮助。如果有任何问题，请随时提问。