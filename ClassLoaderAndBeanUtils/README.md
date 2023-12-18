# ClassUtil

## 方法

1. `urlLoader(String url, String className)`

   从指定的 URL 和类名加载并返回类。

   - **参数:**
     - `url`: 类所在的 URL。
     - `className`: 类的完全限定名。

   - **返回:**
     - `Class`: 加载的类。

2. `complieClass(String souceCodeFilePath, String className)`

   将 Java 源代码文件编译为类文件并返回编译结果。

   - **参数:**
     - `souceCodeFilePath`: Java 源代码文件所在的路径。
     - `className`: 要编译的类的名称。

   - **返回:**
     - `Pair<Boolean, String>`: 包含一个布尔值，表示编译是否成功，以及描述编译结果的消息的键值对。

3. `initer(String className)`

   根据提供的类名初始化并返回类。

   - **参数:**
     - `className`: 类的完全限定名。

   - **返回:**
     - `Class`: 初始化的类。

4. `loader(String className)`

   使用系统类加载器加载并返回类。

   - **参数:**
     - `className`: 类的完全限定名。

   - **返回:**
     - `Class`: 加载的类。

# KaToolClassLoader

## 构造方法

1. `KaToolClassLoader(String classPath)`

   使用指定的类路径创建 KaToolClassLoader。

   - **参数:**
     - `classPath`: 用于加载类的基本路径。

2. `KaToolClassLoader(String classPath, ClassLoader privateLoader)`

   使用指定的类路径和私有类加载器创建 KaToolClassLoader。

   - **参数:**
     - `classPath`: 用于加载类的基本路径。
     - `privateLoader`: 作为父加载器使用的私有类加载器。

## 方法

1. `findClass(String name)`

   查找并加载指定名称的类。

   - **参数:**
     - `name`: 类的完全限定名。

   - **返回:**
     - `Class`: 加载的类。

# SpringContextUtils

## 方法

1. `contain(String beanName)`

   检查 Spring 应用程序上下文是否包含具有给定名称的 Bean。

   - **参数:**
     - `beanName`: 要检查的 Bean 的名称。

   - **返回:**
     - `Boolean`: 如果 Bean 存在，则为 `true`，否则为 `false`。

2. `getBean(String beanName)`

   通过名称从 Spring 应用程序上下文获取 Bean。

   - **参数:**
     - `beanName`: Bean 的名称。

   - **返回:**
     - `Object`: Bean 实例。

3. `getBean(Class<T> beanClass)`

   通过类从 Spring 应用程序上下文获取 Bean。

   - **参数:**
     - `beanClass`: Bean 的类。

   - **返回:**
     - `T`: Bean 实例。

4. `getBean(String beanName, Class<T> beanClass)`

   通过名称和类从 Spring 应用程序上下文获取 Bean。

   - **参数:**
     - `beanName`: Bean 的名称。
     - `beanClass`: Bean 的类。

   - **返回:**
     - `T`: Bean 实例。

5. `regBean(String beanName, Object bean)`

   使用给定的名称和对象注册新的 Bean。

   - **参数:**
     - `beanName`: 要注册 Bean 的名称。
     - `bean`: Bean 对象。

6. `unregBean(String beanName)`

   从 Spring 应用程序上下文中取消注册具有给定名称的 Bean。

   - **参数:**
     - `beanName`: 要取消注册的 Bean 的名称。