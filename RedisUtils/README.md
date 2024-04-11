# RedisUtils

# 快速上手

## application.yml

### V1.9.5.GAMA之前

```yaml
spring:
	redis:
        database: 0
        host: localhost
        port: 6379
        timeout: 5000
        password: localhost
katool:
    lock:
        internalLockLeaseTime: 30   # 分布式锁默认租约时间，建议别设太小，不然和没有设置毫无区别
        timeUnit: seconds           # 租约时间单位
    util:
        redis:
            policy: "caffeine"      # 选择内存缓存策略，caffeine
            exptime: {5*60*1000}    # LFU过期时间
            time-unit: milliseconds # 过期时间单位
```

### V1.9.5.GAMA之后

```yaml
spring:
	redis:
        database: 0
        host: localhost
        port: 6379
        timeout: 5000
        password: localhost
katool:
    cache:
        policy: "caffeine"      		# 选择内存缓存策略，caffeine
        exp-time: { 5*60*1000 }         # LFU过期时间
        time-unit: milliseconds 		# 过期时间单位
    redis:
        policy: "default"       		# 多级缓存策略模式选定，默认情况下和cache采用同一个策略，我cache是啥，那么policy就是啥，如果想要关闭，那么cache.policy请改为default，，如果需要单独使用其他的缓存工具类，在1.9.6之前不支持，1.9.6之后可以看看下文的方法
        lock:
            internalLockLeaseTime: 30   # 分布式锁默认租约时间
            timeUnit: seconds           # 租约时间单位
```

> 1.9.6开始出了Caffeine之外，官方还提供了EhCahce作为缓存策略，将policy换为ehcache即可开启
>
> 如果我们需要单独使用某个缓存工具类，而想引入到RedisUtil中，可以这样配置
>
> ```yaml
> katool:
>  cache:
>      policy: "caffeine"      		# 选择内存缓存策略，caffeine
>      exp-time: { 5*60*1000 }         # LFU过期时间
>      time-unit: milliseconds 		# 过期时间单位
>      ehcache:
>      	enable: true
>      	enable-to-disk:true			# 开启多余的缓存存储到磁盘
>  redis:
>      policy: "default"       		# 多级缓存策略模式选定，默认情况下和cache采用同一个策略，我cache是啥，那么policy就是啥，如果想要关闭，那么cache.policy请改为default
>      lock:
>          internalLockLeaseTime: 30   # 分布式锁默认租约时间
>          timeUnit: seconds           # 租约时间单位
> ```
>
> 1.9.6.BETA之后，配置类如下：
>
> ```yaml
> katool:
> 	util：
> 	 cache:
>      policy: "caffeine"      		# 选择内存缓存策略，caffeine
>      exp-time: { 5*60*1000 }         # LFU过期时间
>      time-unit: milliseconds 		# 过期时间单位
>      ehcache:
>      	enable: true
>      	enable-to-disk:true			# 开启多余的缓存存储到磁盘
>      redis:
>          policy: "default"       		# 多级缓存策略模式选定，默认情况下和cache采用同一个策略，我cache是啥，那么policy就是啥，如果想要关闭，那么cache.policy请改为default
>          lock:
>              internalLockLeaseTime: 30   # 分布式锁默认租约时间
>              timeUnit: seconds           # 租约时间单位
> ```

## 自动装配

## 分布式锁的使用

```java
@RestController
@RequestMapping("/test")
@Slf4j
public class TestController {

    @Resource
    RedisUtils redisUtils;

    public int i=0;


    Integer q=1000;
    @GetMapping
    public String test() throws InterruptedException {
        i++;
    redisUtils.lock("this",true);
    String value = (String) redisUtils.getValue("1234");
    if (q>0){
        Thread.sleep(1);
        q--;
    }
        log.info("i={},q={}",i,q);
    if (ObjectUtil.isEmpty(value)){
        redisUtils.setValue("1234", RandomUtil.randomString(10),5L, TimeUnit.MINUTES);
        value = (String) redisUtils.getValue("1234");
    }
        redisUtils.unlock("this");
    return value.toString();
    }
}
```

## 在Test中使用RedisUtil

```java
@SpringBootTest
@Slf4j
class KaToolTestApplicationTests {
    @Resource
    RedisUtils<String,String> redisUtils;

    @Resource
    CaffeineUtils caffeineUtils;

    @Resource
    RedisTemplate redisTemplate;

    @Test
    void test(){
        System.out.println(redisUtils);
        RedisUtils instance = RedisUtils.getInstance(redisTemplate);
        System.out.println(instance);
    }

    // 分布式锁单元测试
    @Test
    void Test(){
        redisUtils.lock("1");
        redisUtils.unlock("1");
    }
    @Test
    void testRange(){
        redisUtils.putZSet("qwe","2",3D);
        redisUtils.getZSetByRange("qwe",0L,-1L);
    }
    @Test
    void testMap(){
        redisUtils.getMap("123");
        Map map = redisUtils.getMap("123");
        (map).forEach((k,v)-> {
            System.out.println(v);
        });
        System.out.println(map);
    }
    @Test
    void DistributedLockTest() throws InterruptedException, ParseException {
       while(true){
           final long[] i = {20l};
           List<FutureTask> futureTaskList=new ArrayList<>();
           new Thread(() -> {
               while(true){
                   System.err.println("i[0]="+i[0]);
                   if(i[0]==0){
                       break;
                   }
               }
           }).start();
           for (int j = 0; j < 25; j++) {
               if (i[0]==0)break;
               long l = System.currentTimeMillis();
               int finalJ = j+1;
               FutureTask futureTask = new FutureTask(() -> {
                   redisUtils.lock("lock");
//                   synchronized ("lock".intern()){
                       log.info("成功进入第{}个线程", finalJ);
                       if (i[0] > 0) {
                           Thread.sleep(1000);
                           i[0]--;
                       }
//                   }
                   redisUtils.unlock("lock");
                   return null;
               });
               futureTaskList.add(futureTask);
           }
           int k=0;
           for (FutureTask task : futureTaskList) {
               Thread thread = new Thread(task);
               thread.start();
               log.error(thread.getId() + "已开始！");
           }
           k=0;
           for (FutureTask futureTask : futureTaskList) {
               try {
                   futureTask.get();
                   log.info("第{}个线程已完成", ++k);
               } catch (InterruptedException e) {
                   throw new RuntimeException(e);
               } catch (ExecutionException e) {
                   throw new RuntimeException(e);
               }
           }
           if (i[0]!=0) System.err.println("分布式锁错误，超卖问题：i[0]="+i[0]);
           else System.out.println("分布式锁正确，没有超卖问题：i[0]="+i[0]);
       }
    }

    // Caffeine内存缓存测试
    @Test
    void CaffeineTest() throws InterruptedException {
        caffeineUtils.put("key", "value");
        redisUtils.setValue("123","123");
        while(true){
            log.info("{}",redisUtils.getValue("123"));
            Thread.sleep(2000);
        }
    }

}
```

# 多级缓存配置

在KaTool中，我们引入了Redis多级缓存策略，什么是多级缓存策略？

[Redis多级缓存架构、缓存设计、布隆过滤器_多层级缓存架构-CSDN博客](https://blog.csdn.net/yaoyaochengxian/article/details/118155668)

这里我们主要说说我们提供的策略：

- CaffeineCachePolicy()
- DefaultCachePolicy()

我们有使用Caffeine和采用默认策略（不适用多级缓存）两种方式

## 如何启用Caffeine？

### application.yml

```yaml
katool:
    util:
        redis:
            policy: "caffeine"      # 选择内存缓存策略，caffeine
            exptime: {5*60*1000}              # LFU过期时间
            time-unit: milliseconds #  过期时间单位
```

如果policy为其他值，那么走默认缓存策略，开启后我们像往常一样启用RedisUtil即可

## 自定义缓存策略

要使用自定义多级缓存，我们需要两个东西

- CachePolicy缓存实例
- CachePolicy的Bean

### 重写CachePolicy缓存策略接口

```java
package cn.katool.util.cache.policy;

public interface CachePolicy {

    Object  get(Object key);

    void    set(Object key, Object value);

    void update(Object key, Object value);

    void setOrUpdate(Object key, Object value);

    void    remove(Object key);

    void    clear();

    // 获取缓存大小
    Long size();
}
```

### 重写CachePolicy的@Bean

```java
package cn.katool.katooltest.config;


import cn.katool.util.cache.policy.CachePolicy;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;



@Configuration
public class RedisUtilConfig {

    

    @Bean
    @DependsOn({"KaTool-Init"})
    @Primary
    public CachePolicy cachePolicy() {

        return null;
    }
}
```

除此之外你也可以通过尝试操作`CACHE_POLICY_MAPPER`和`REDIS_UTIL_CACHE_POLICY_MAPPER`来进行修改，但是我们不太推荐

