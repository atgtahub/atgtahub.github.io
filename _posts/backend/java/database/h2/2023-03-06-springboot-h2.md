---
layout: post
title:  SpringBoot使用h2数据库
categories: java
tag: h2
---


* content
{:toc}


### 依赖

```xml
<project>
    <parent>
        <artifactId>spring-boot-starter-parent</artifactId>
        <groupId>org.springframework.boot</groupId>
        <version>2.3.7.RELEASE</version>
    </parent>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
        <!-- mybatis-plus -->
        <dependency>
            <groupId>com.baomidou</groupId>
            <artifactId>mybatis-plus-boot-starter</artifactId>
            <version>3.4.2</version>
        </dependency>
        <!-- h2 -->
        <dependency>
            <groupId>com.h2database</groupId>
            <artifactId>h2</artifactId>
            <scope>runtime</scope>
        </dependency>
        <!-- lombok -->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
    </dependencies>
</project>
```


### 表结构脚本`schema.sql`

```sql
DROP TABLE IF EXISTS `tb_user`;
CREATE TABLE `tb_user`
(
    `id`       bigint      NOT NULL AUTO_INCREMENT,
    `username` varchar(50) NOT NULL COMMENT '用户名',
    PRIMARY KEY (`id`)
);
```


### 数据脚本`data.sql`

```sql
DELETE FROM `tb_user`;
INSERT INTO `tb_user`(`id`, `username`) VALUES (null, '123');
INSERT INTO `tb_user`(`id`, `username`) VALUES (null, '456');
INSERT INTO `tb_user`(`id`, `username`) VALUES (null, '789');
```


### 配置文件`application.yml`

```yaml
spring:
  application:
    name: @pom.artifactId@
  datasource:
    driver-class-name: org.h2.Driver
    url: jdbc:h2:mem:test;MODE=MySQL;DATABASE_TO_LOWER=TRUE;IGNORECASE=TRUE
    username: sa
    password:
    #数据记录脚本
    data: classpath:db/data.sql
    #表结构脚本
    schema: classpath:db/schema.sql
  #开启h2数据库控制台，默认访问路径/h2-console
  h2:
    console:
      enabled: true
```

- 内存数据库：jdbc:h2:mem:databaseName
- 文件数据库：jdbc:h2:file:filePath，例：jdbc:h2:file:./bin/h2/test
- 远程数据库：jdbc:h2:tcp://{ip\|hostname}:{port}/{Path}，例：jdbc:h2:tcp://localhost//usr/h2/data/rlib

#### 连接参数

官方文档：<a href="http://www.h2database.com/html/features.html#database_url" target="_blank">http://www.h2database.com/html/features.html#database_url</a>

| Topic                                                        | URL Format and Examples                                      |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [嵌入式（本地）连接](https://www.oschina.net/action/GoToLink?url=http%3A%2F%2Fwww.h2database.com%2Fhtml%2Ffeatures.html%23embedded_databases) | jdbc:h2:[file:][]<databaseName> jdbc:h2:~/test jdbc:h2:file:/data/sample jdbc:h2:file:C:/data/sample (Windows only) |
| [内存数据库（私有）](https://www.oschina.net/action/GoToLink?url=http%3A%2F%2Fwww.h2database.com%2Fhtml%2Ffeatures.html%23in_memory_databases) | jdbc:h2:mem:                                                 |
| [内存数据库（被命名）](https://www.oschina.net/action/GoToLink?url=http%3A%2F%2Fwww.h2database.com%2Fhtml%2Ffeatures.html%23in_memory_databases) | jdbc:h2:mem:<databaseName> jdbc:h2:mem:test_mem              |
| [使用TCP/IP的服务器模式（远程连接）](https://www.oschina.net/action/GoToLink?url=http%3A%2F%2Fwww.h2database.com%2Fhtml%2Ftutorial.html%23using_server) | jdbc:h2:tcp://<server>[:<port>]/[<path>]<databaseName> jdbc:h2:tcp://localhost/~/test jdbc:h2:tcp://dbserv:8084/~/sample |
| [使用SSL/TLS的服务器模式（远程连接）](https://www.oschina.net/action/GoToLink?url=http%3A%2F%2Fwww.h2database.com%2Fhtml%2Fadvanced.html%23ssl_tls_connections) | jdbc:h2:ssl://<server>[:<port>]/<databaseName> jdbc:h2:ssl://secureserv:8085/~/sample; |
| [使用加密文件](https://www.oschina.net/action/GoToLink?url=http%3A%2F%2Fwww.h2database.com%2Fhtml%2Ffeatures.html%23file_encryption) | jdbc:h2:<url>;CIPHER=[AES\|XTEA] jdbc:h2:ssl://secureserv/~/testdb;CIPHER=AES jdbc:h2:file:~/secure;CIPHER=XTEA |
| [文件锁](https://www.oschina.net/action/GoToLink?url=http%3A%2F%2Fwww.h2database.com%2Fhtml%2Ffeatures.html%23database_file_locking) | jdbc:h2:<url>;FILE_LOCK={NO\|FILE\|SOCKET} jdbc:h2:file:~/quickAndDirty;FILE_LOCK=NO jdbc:h2:file:~/private;CIPHER=XTEA;FILE_LOCK=SOCKET |
| [仅打开存在的数据库](https://www.oschina.net/action/GoToLink?url=http%3A%2F%2Fwww.h2database.com%2Fhtml%2Ffeatures.html%23database_only_if_exists) | jdbc:h2:<url>;IFEXISTS=TRUE jdbc:h2:file:~/sample;IFEXISTS=TRUE |
| [当虚拟机退出时并不关闭数据库](https://www.oschina.net/action/GoToLink?url=http%3A%2F%2Fwww.h2database.com%2Fhtml%2Ffeatures.html%23do_not_close_on_exit) | jdbc:h2:<url>;DB_CLOSE_ON_EXIT=FALSE                         |
| [用户名和密码](https://www.oschina.net/action/GoToLink?url=http%3A%2F%2Fwww.h2database.com%2Fhtml%2Ffeatures.html%23passwords) | jdbc:h2:<url>[;USER=<username>][;PASSWORD=<value>] jdbc:h2:file:~/sample;USER=sa;PASSWORD=123 |
| [更新记入索引](https://www.oschina.net/action/GoToLink?url=http%3A%2F%2Fwww.h2database.com%2Fhtml%2Ffeatures.html%23log_index_changes) | jdbc:h2:<url>;LOG=2 jdbc:h2:file:~/sample;LOG=2              |
| [调试跟踪项设置](https://www.oschina.net/action/GoToLink?url=http%3A%2F%2Fwww.h2database.com%2Fhtml%2Ffeatures.html%23trace_options) | jdbc:h2:<url>;TRACE_LEVEL_FILE=<level 0..3> jdbc:h2:file:~/sample;TRACE_LEVEL_FILE=3 |
| [忽略位置参数设置](https://www.oschina.net/action/GoToLink?url=http%3A%2F%2Fwww.h2database.com%2Fhtml%2Ffeatures.html%23ignore_unknown_settings) | jdbc:h2:<url>;IGNORE_UNKNOWN_SETTINGS=TRUE                   |
| [指定文件读写模式](https://www.oschina.net/action/GoToLink?url=http%3A%2F%2Fwww.h2database.com%2Fhtml%2Ffeatures.html%23custom_access_mode) | jdbc:h2:<url>;ACCESS_MODE_LOG=rws;ACCESS_MODE_DATA=rws       |
| [在Zip 文件中的数据库](https://www.oschina.net/action/GoToLink?url=http%3A%2F%2Fwww.h2database.com%2Fhtml%2Ffeatures.html%23database_in_zip) | jdbc:h2:zip:<zipFileName>!/<databaseName> jdbc:h2:zip:~/db.zip!/test |
| [兼容模式](https://www.oschina.net/action/GoToLink?url=http%3A%2F%2Fwww.h2database.com%2Fhtml%2Ffeatures.html%23compatibility) | jdbc:h2:<url>;MODE=<databaseType> jdbc:h2:~/test;MODE=MYSQL  |
| [自动重连接](https://www.oschina.net/action/GoToLink?url=http%3A%2F%2Fwww.h2database.com%2Fhtml%2Ffeatures.html%23auto_reconnect) | jdbc:h2:<url>;AUTO_RECONNECT=TRUE jdbc:h2:tcp://localhost/~/test;AUTO_RECONNECT=TRUE |
| [自动混合模式](https://www.oschina.net/action/GoToLink?url=http%3A%2F%2Fwww.h2database.com%2Fhtml%2Ffeatures.html%23auto_mixed_mode) | jdbc:h2:<url>;AUTO_SERVER=TRUE jdbc:h2:~/test;AUTO_SERVER=TRUE |
| [更改其他设置](https://www.oschina.net/action/GoToLink?url=http%3A%2F%2Fwww.h2database.com%2Fhtml%2Ffeatures.html%23other_settings) | jdbc:h2:<url>;<setting>=<value>[;<setting>=<value>...] jdbc:h2:file:~/sample;TRACE_LEVEL_SYSTEM_OUT=3 |
| 不区分大小写的标识符                                         | jdbc:h2:~/test;MODE=MySQL;DATABASE_TO_LOWER=TRUE;CASE_INSENSITIVE_IDENTIFIERS=TRUE |
| [文本列默认不区分大小写](http://www.h2database.com/html/features.html#compatibility) | jdbc:h2:~/test；IGNORECAES=TRUE                              |


### 启动类`Application.java`

```java
@MapperScan("com.demo.dao")
@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

}
```

### 配置类`MybatisPlusConfig.java`

```java
import com.baomidou.mybatisplus.annotation.DbType;
import com.baomidou.mybatisplus.extension.plugins.MybatisPlusInterceptor;
import com.baomidou.mybatisplus.extension.plugins.inner.PaginationInnerInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MybatisPlusConfig {

    /**
     * 分页插件
     */
    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        interceptor.addInnerInterceptor(new PaginationInnerInterceptor(DbType.H2));
        return interceptor;
    }

}
```


### 实体类`User.java`

```java
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName("tb_user")
public class User {

    @TableId(type = IdType.AUTO)
    private Long id;

    private String username;

}
```

### Dao类`UserDao.java`

```java
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserDao extends BaseMapper<User> {
}
```

### Service类`UserService.java`

```java
import com.baomidou.mybatisplus.extension.service.IService;

public interface UserService extends IService<User> {
}
```

#### `UserServiceImpl.java`

```java
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl extends ServiceImpl<UserDao, User> implements UserService {
}
```


### 测试类`ApplicationTest.java`

```java
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class ApplicationTest {

    @Autowired
    private UserService userService;

    @Test
    public void contextLoad() {
        System.out.println(userService.list());
    }

}
```

#### 输出

```text
2023-03-06T15:43:19.843 +0800 DEBUG 11002 --- [           main] UserDao.selectList         [  137] : ==>  Preparing: SELECT id,username FROM tb_user
2023-03-06T15:43:19.846 +0800 DEBUG 11002 --- [           main] UserDao.selectList         [  137] : ==> Parameters: 
2023-03-06T15:43:19.848 +0800 DEBUG 11002 --- [           main] UserDao.selectList         [  137] : <==      Total: 3
[User(id=1, username=123), User(id=2, username=456), User(id=3, username=789)]
```

参考原文
-

- <a href="https://my.oschina.net/u/580298/blog/674606" target="_blank">H2 数据库连接 URL 说明</a>
