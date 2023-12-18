# AuthUtil 使用文档

## 介绍

`AuthUtil` 是一个用于生成和验证 JWT（JSON Web Token）的工具类，旨在提供简单而安全的身份验证和授权机制。该工具类使用了常见的 `logback` 日志库和 `lombok` 注解库，以简化代码的编写。

## 使用方法

### 1. 引入 AuthUtil 工具类

确保你的项目中已经引入了 `AuthUtil` 类。你可以将其添加到你的项目中，并在需要进行身份验证和生成 Token 的地方调用相应的方法。

```java
import cn.katool.config.auth.AuthUtil;
```

### 2. 配置AuthConfig

在你的项目中，确保 `AuthConfig` 类被正确配置，并且 `AuthUtil` 的初始化方法被调用。一般情况下，我们采用yaml进行配置

```java
katool:
    auth:
        salt-key: "katooltest"   # JWT加密盐值
        exp-time: { 7*24*60*60*1000 }   # JWT过期时间
        token-header: "Authorization"   # 请求头中存放token的Header
```

### 3. 获取 Token

调用 `createToken` 方法生成 Token。该方法需要传入用户信息对象和用户信息对象的类，然后会返回生成的 JWT Token。

```java
import cn.katool.config.auth.AuthUtil;

// Your user object
YourUserObject user = new YourUserObject();

// Generate Token
String token = AuthUtil.createToken(user, YourUserObject.class);
```

### 4. 验证 Token

调用 `verifyToken` 方法验证 Token 是否有效。该方法会返回一个布尔值，表示 Token 是否有效。

```java
import cn.katool.config.auth.AuthUtil;

// Your Token
String token = "your_jwt_token_here";

// Verify Token
boolean isValid = AuthUtil.verifyToken(token);

if (isValid) {
    // Token is valid, proceed with your logic
} else {
    // Token is invalid, handle accordingly
}
```

### 5. 获取用户信息

调用 `getUserFromToken` 方法解析 Token 并返回用户信息对象。该方法需要传入 Token 和用户信息对象的类。

```java
import cn.katool.config.auth.AuthUtil;

// Your Token
String token = "your_jwt_token_here";

// Get User from Token
YourUserObject user = (YourUserObject) AuthUtil.getUserFromToken(token, YourUserObject.class);

if (user != null) {
    // User object retrieved successfully, proceed with your logic
} else {
    // Unable to retrieve user object, handle accordingly
}
```

## 配置

确保 `AuthConfig` 类中的配置项已经正确设置，包括 `expTime`（Token 过期时间）、`saltKey`（盐值）、`tokenHeader`（Token 在 HTTP 头中的字段名）。

## 注意事项

- 在使用该工具类之前，确保已经正确初始化 `AuthConfig`，以便设置过期时间、盐值等参数。
- 请妥善保存生成的 Token，并在每次请求中附带 Token 进行身份验证。

## 示例

```java
import cn.katool.config.auth.AuthUtil;
import lombok.Data;

@Data
public class YourUserObject {
    private String username;
    private String email;
    // Other user-related fields
}

// Your application logic
YourUserObject user = new YourUserObject();
user.setUsername("john_doe");
user.setEmail("john.doe@example.com");

// Generate Token
String token = AuthUtil.createToken(user, YourUserObject.class);

// Verify Token
boolean isValid = AuthUtil.verifyToken(token);

// Get User from Token
YourUserObject retrievedUser = (YourUserObject) AuthUtil.getUserFromToken(token, YourUserObject.class);
```

以上示例是一个简单的使用场景，演示了如何生成 Token、验证 Token 和获取用户信息。希望这个文档对你有帮助。如果有任何问题，请随时提问。