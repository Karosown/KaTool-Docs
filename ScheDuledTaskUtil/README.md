# ScheduledTaskUtil API 文档

## 简介

`ScheduledTaskUtil` 是一个工具类，位于 `cn.katool.util` 包中，提供了调度任务的功能。它使用了 `ScheduledThreadPoolExecutor` 来执行任务。

## 使用方法

### 1. 提交任务

#### 1.1 提交 Runnable 任务

```java
ScheduledFuture<?> schedule = ScheduledTaskUtil.submitTask(() -> {
    // 运行的代码逻辑
}, 5, TimeUnit.SECONDS);
```

此方法提交一个 `Runnable` 任务，延迟 5 秒后开始执行，然后以固定的间隔重复执行。

#### 1.2 提交 Callable 任务

```java
ScheduledFuture<?> schedule = ScheduledTaskUtil.submitTask((Callable<?>) () -> {
    // 运行的代码逻辑
    return null;
}, 5, TimeUnit.SECONDS);
```

此方法提交一个 `Callable` 任务，延迟 5 秒后开始执行，然后以固定的间隔重复执行。

#### 1.3 提交带初始延迟的 Runnable 任务

```java
ScheduledFuture<?> schedule = ScheduledTaskUtil.submitTask(() -> {
    // 运行的代码逻辑
}, 2, 5, TimeUnit.SECONDS);
```

此方法提交一个 `Runnable` 任务，初始延迟 2 秒后开始执行，然后以固定的间隔 5 秒重复执行。

#### 1.4 提交带初始延迟的 Callable 任务

```java
ScheduledFuture<?> schedule = ScheduledTaskUtil.submitTask((Callable<?>) () -> {
    // 运行的代码逻辑
    return null;
}, 2, 5, TimeUnit.SECONDS);
```

此方法提交一个 `Callable` 任务，初始延迟 2 秒后开始执行，然后以固定的间隔 5 秒重复执行。

## 注意事项

- 该工具类使用 `ScheduledThreadPoolExecutor`，并配置了最大线程数为 500。
- 任务执行策略为 `CallerRunsPolicy`，即如果线程池被占满，后续任务将由调用线程直接执行。

```java
private static ScheduledThreadPoolExecutor executor = new ScheduledThreadPoolExecutor(500,
        Executors.defaultThreadFactory(),
        new ThreadPoolExecutor.CallerRunsPolicy());
```

## 示例

```java
// 提交一个简单的 Runnable 任务，延迟 5 秒执行，然后以 10 秒的间隔重复执行
ScheduledFuture<?> schedule = ScheduledTaskUtil.submitTask(() -> {
    System.out.println("Task executed!");
}, 5, 10, TimeUnit.SECONDS);
```

请根据您的具体需求使用上述方法，灵活配置任务的延迟和间隔时间。