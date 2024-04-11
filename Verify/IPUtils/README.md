# IPUtils API 使用文档

## 介绍

`IpUtils` 
- V1.9.5 GAMA之前 是一个用于获取客户端真实 IP 地址的工具类。它适用于在反向代理服务器（如 Nginx）后部署的应用程序中，以确保获取到客户端的真实 IP 地址而不是代理服务器的地址。
- V1.9.5 GAMA之后 新增IP校验功能

### 使用方法

#### 1. 引入 IpUtils 工具类

确保你的项目中已经引入了 `IpUtils` 类。你可以将其添加到你的项目中，并在需要获取客户端 IP 地址的地方调用相应的方法。

```java
import cn.katool.iputils.IpUtils;
```

#### 2. 获取客户端真实 IP 地址

调用 `getIpAddr` 方法，传入 `HttpServletRequest` 对象，以获取客户端的真实 IP 地址。

```java
String clientIp = IpUtils.getIpAddr(request);
```

#### 3. Nginx 配置

确保你的 Nginx 配置中设置了以下头信息，以便正确获取客户端真实 IP 地址。

在你的 Nginx 配置文件`config-server`中添加以下配置：

```nginx
proxy_set_header   X-Real-IP        $remote_addr;
proxy_set_header   X-Real-Port      $remote_port;
proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
```

这样配置可以确保在请求经过反向代理时，相关的头信息能够正确传递，使得后端应用能够获取到客户端真实 IP 地址。

### 注意事项

- 在使用此工具类之前，请确保已经正确配置了 Nginx，以便将客户端的真实 IP 地址传递给后端应用。
- 在某些情况下，`x-forwarded-for` 头信息可能包含多个 IP 地址，通过逗号分隔。在这种情况下，可以根据实际需求进行处理，例如取第一个 IP 地址。

### 示例

```java
import cn.katool.iputils.IpUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
public class ExampleController {

    @GetMapping("/get-client-ip")
    public String getClientIp(HttpServletRequest request) {
        String clientIp = IpUtils.getIpAddr(request);
        return "Client IP Address: " + clientIp;
    }
}
```

以上示例是一个简单的 Spring Boot 控制器，演示了如何使用 `IpUtils` 类获取客户端真实 IP 地址。

希望这个文档对你有帮助。如果有任何问题，请随时提问。

## After V1.9.5 GAMA
### 介绍

`IPUtils` 是一个用于获取客户端真实 IP 地址并进行合法性校验的工具类。此工具类适用于在反向代理服务器（如 Nginx）后部署的应用程序中，以确保获取到客户端的真实 IP 地址。同时，它提供了一个用于检查 IP 地址合法性的方法 `isIp`。

### 使用方法

#### 1. 引入 IPUtils 工具类

确保你的项目中已经引入了 `IPUtils` 类。你可以将其添加到你的项目中，并在需要获取客户端 IP 地址的地方调用相应的方法。

```java
import cn.katool.util.verify.IPUtils;
```

#### 2. 获取客户端真实 IP 地址

调用 `getIpAddr` 方法，传入 `HttpServletRequest` 对象，以获取客户端的真实 IP 地址。

```java
String clientIp = IPUtils.getIpAddr(request);
```

#### 3. IP 地址合法性校验

调用 `isIp` 方法，传入待校验的 IP 地址字符串，以检查其是否合法。

```java
String ipAddress = "192.168.0.1";
boolean isValidIp = IPUtils.isIp(ipAddress);
```

### 注意事项

- 在使用此工具类之前，请确保已经正确配置了 Nginx，以便将客户端的真实 IP 地址传递给后端应用。
- 对于 IP 地址合法性校验，工具类使用了正则表达式，确保传入的 IP 地址符合标准格式。

### 示例

```java
import cn.katool.util.verify.IPUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
public class ExampleController {

    @GetMapping("/get-client-ip")
    public String getClientIp(HttpServletRequest request) {
        String clientIp = IPUtils.getIpAddr(request);
        return "Client IP Address: " + clientIp;
    }

    @GetMapping("/check-ip-validity")
    public String checkIpValidity(@RequestParam String ipAddress) {
        boolean isValidIp = IPUtils.isIp(ipAddress);
        return "Is IP Address Valid: " + isValidIp;
    }
}
```

以上示例是一个简单的 Spring Boot 控制器，演示了如何使用 `IPUtils` 类获取客户端真实 IP 地址并进行 IP 地址合法性校验。

希望这个文档对你有帮助。如果有任何问题，请随时提问。