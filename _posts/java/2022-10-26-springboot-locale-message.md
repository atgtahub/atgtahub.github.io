---
layout: post
title:  Springboot配置国际化消息
categories: java
tag: springboot
---


* content
{:toc}

## 依赖

```xml
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.6.3</version>
    </parent>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-validation</artifactId>
        </dependency>
    </dependencies>
```



## 配置文件

application.yml

```yaml
#国际化配置
#basename 指定国际化文件前缀
spring:
  messages:
    basename: i18n/messages
    encoding: UTF-8
```



## 资源文件

**在src\main\resources目录下创建目录i18n**

### 默认语言messages.properties

```properties
login.fail=登录失败
login.success=登录成功
login.welcome=欢迎 {0}!

validation.message.name.not-blank=名字不能为空

resource.apple=苹果
resource.xiaomi=小米

error.not-found=未找到{0}
```



### 英文messages_en.properties

```properties
login.fail=Login failed
login.success=Login Success
login.welcome=Welcome {0}!

validation.message.not-blank=Name can not be blank.

resource.apple=Apple
resource.xiaomi=Xiaomi

error.not-found=Not found {0}
```



### 中文messages_zh.properties

```properties
login.fail=登录失败
login.success=登录成功
login.welcome=欢迎 {0}!

validation.message.not-blank=名字不能为空

resource.apple=苹果
resource.xiaomi=小米

error.not-found=未找到{0}
```



## 启动类

```java
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

}
```

## 配置类

```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.i18n.CookieLocaleResolver;
import org.springframework.web.servlet.i18n.LocaleChangeInterceptor;

import javax.validation.Validator;
import java.util.Locale;

/**
 * 国际化配置
 */
@Configuration
public class LocaleConfig {

    /**
     * 默认解析器根据cookie解析
     * @return 语言解析器
     */
    @Bean
    public LocaleResolver localeResolver() {
        CookieLocaleResolver cookieLocaleResolver = new CookieLocaleResolver();
        // 默认语言
        cookieLocaleResolver.setDefaultLocale(Locale.CHINESE);
        // cookie中参数名
        cookieLocaleResolver.setCookieName(LocaleChangeInterceptor.DEFAULT_PARAM_NAME);
        cookieLocaleResolver.setCookieMaxAge(-1);
        return cookieLocaleResolver;
    }

    /**
     * 配置拦截器，拦截后根据配置的参数名去设置语言
     * <p>
     *     1、请求参数方式：http://localhost:8080/test?locale=en
     *     2、cookie替换：cookie中存放locale=en
     * </p>
     *
     * @see LocaleChangeInterceptor#setParamName(java.lang.String)
     * @see LocaleChangeInterceptor#preHandle(javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse, java.lang.Object)
     * @return
     */
    @Bean
    public WebMvcConfigurer localeInterceptor() {
        return new WebMvcConfigurer() {
            @Override
            public void addInterceptors(InterceptorRegistry registry) {
                registry.addInterceptor(new LocaleChangeInterceptor());
            }
        };
    }

    /**
     * 配置JSR-303国际化
     * @param messageSource 消息源
     * @return
     */
    @Bean
    public Validator getValidator(@Autowired MessageSource messageSource) {
        LocalValidatorFactoryBean validator = new LocalValidatorFactoryBean();
        validator.setValidationMessageSource(messageSource);
        return validator;
    }

}
```



## 工具类

```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class MessageUtil {

    private static MessageSource messageSource;

    public MessageUtil() {
    }

    /**
     * 通过set方法注入
     *
     * @param messageSource
     */
    @Autowired
    public void setMessageSource(MessageSource messageSource) {
        MessageUtil.messageSource = messageSource;
    }

    /**
     * 根据code获取国际化消息
     *
     * @param code code
     * @return
     */
    public static String getMessage(Object code) {
        return messageSource.getMessage(code.toString(), null, code.toString(), LocaleContextHolder.getLocale());
    }

    /**
     * 通过code和占位符获取国际化消息
     *
     * @param code         消息code
     * @param messageCodes 占位符
     * @return
     */
    public static String getMessage(Object code, Object... messageCodes) {
        Object[] objs = Arrays.stream(messageCodes).map(MessageUtil::getMessage).toArray();
        return messageSource.getMessage(code.toString(), objs, code.toString(), LocaleContextHolder.getLocale());
    }
}
```

## 测试类

```java
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotBlank;
import java.util.List;

@Validated
@RestController
@RequestMapping("/locale")
public class TestLocaleController {

    /**
     * 测试
     *
     * @param code  消息code
     * @param codes 消息占位符
     * @return
     */
    @GetMapping("/{code}")
    public String getLocaleMessage(@PathVariable String code, @RequestParam(required = false) List<String> codes) {
        if (codes != null && !codes.isEmpty()) {
            return MessageUtil.getMessage(code, codes);
        }

        return MessageUtil.getMessage(code);
    }

    /**
     * 测试jsr303国际化消息
     *
     * @param name
     * @return
     */
    @GetMapping("/login")
    public String getValid(@NotBlank(message = "{validation.message.name.not-blank}") @RequestParam String name) {
        return MessageUtil.getMessage("login.welcome", name);
    }

    @GetMapping("/not/found")
    public String notFound() {
        return MessageUtil.getMessage("error.not-found", "resource.apple");
    }

}
```

## 约束异常处理

```java
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.validation.ConstraintViolationException;
import java.util.ArrayList;

@Order(100)
@RestControllerAdvice
public class RestControllerExceptionHandler {

    /**
     * 拦截约束异常
     * @param e
     * @return
     */
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(ConstraintViolationException.class)
    public String constraintViolationExceptionHandler(ConstraintViolationException e) {
        // 返回错误消息
        return new ArrayList<>(e.getConstraintViolations()).get(0).getMessage();
    }

}
```



页面上可通过开发者工具中cookies选项里设置切换语言，如果没有locale的值，则新建（鼠标滑动到最下方，按下“下方向键”）

![https://img-blog.csdnimg.cn/41ef22ac4e5240b7bdee0329cc0a1776.png#pic_center](https://img-blog.csdnimg.cn/41ef22ac4e5240b7bdee0329cc0a1776.png#pic_center)

