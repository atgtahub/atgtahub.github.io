---
layout: post
title:  knife4j文件类型参数展示
categories: java
tag: knife4j
---


* content
{:toc}


### pom.xml
```xml
        <!-- knife4j version 3.0.2 -->
        <dependency>
            <groupId>com.github.xiaoymin</groupId>
            <artifactId>knife4j-spring-boot-starter</artifactId>
        </dependency>
```
### Controller
```java
@RestController
@RequestMapping("/demo")
@Api(tags = "demo")
public class DemoController {

    @GetMapping("/example")
    @ApiOperation("do something")
    @ApiImplicitParam(dataType = "__File", dataTypeClass = MultipartFile.class, name = "file", value = "example file", required = true)
    public ResponseEntity example(@RequestPart MultipartFile file) {
    	// write code

        return ResponseEntity.ok();
    }

}
```