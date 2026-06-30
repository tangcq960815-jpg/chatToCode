# Java + Spring Boot 详细学习项目教程

> 项目名称：医院资产管理学习版  
> 适合对象：Java 零基础到能独立写 Spring Boot 接口的学习者  
> 学习目标：通过一个完整业务项目，掌握 Java 基础、Maven、Spring Boot、REST API、数据库、参数校验、异常处理、分页查询、登录认证、接口文档、部署打包等内容。

---

## 1. 推荐学习路线

```text
Java 基础
  ↓
面向对象 OOP
  ↓
集合、异常、泛型、日期时间、文件 IO
  ↓
Maven 项目管理
  ↓
Spring / IoC / DI / Bean
  ↓
Spring Boot 快速开发 REST API
  ↓
数据库 MySQL / H2 / JPA 或 MyBatis
  ↓
接口参数校验、统一返回、统一异常
  ↓
登录认证、权限控制、日志记录
  ↓
项目打包、部署、运行维护
```

建议学习顺序：

| 阶段 | 内容 | 目标 |
|---|---|---|
| 第 1 阶段 | Java 基础语法 | 会写基本类、方法、循环、判断 |
| 第 2 阶段 | 面向对象 | 理解类、对象、继承、接口、多态 |
| 第 3 阶段 | 常用 API | 掌握集合、异常、日期、字符串 |
| 第 4 阶段 | Maven | 会创建项目、引入依赖、打包 |
| 第 5 阶段 | Spring Boot 入门 | 会写 Controller、Service、Repository |
| 第 6 阶段 | 数据库开发 | 会做增删改查、分页、条件查询 |
| 第 7 阶段 | 项目实战 | 完成资产管理系统后端接口 |
| 第 8 阶段 | 进阶优化 | 登录、安全、日志、部署、接口文档 |

---

## 2. 开发环境准备

### 2.1 推荐版本

| 工具 | 推荐版本 | 说明 |
|---|---|---|
| JDK | JDK 21 LTS | 学习和生产都比较稳 |
| Spring Boot | 3.5.x | 生态成熟，适合学习和项目落地 |
| Maven | 3.9.x | Java 项目依赖管理工具 |
| IDE | IntelliJ IDEA Community/Ultimate | Java 开发最常用 |
| 数据库 | MySQL 8.x / H2 | H2 适合入门，MySQL 适合真实项目 |
| 接口测试 | Postman / Apifox | 测试后端接口 |
| 版本管理 | Git + GitHub | 保存学习过程和项目代码 |

> 说明：Spring Boot 3.5.x 最低要求 Java 17，建议直接使用 JDK 21；如果后续做真实生产项目，也可以继续评估 JDK 25 LTS 或 Spring Boot 4.x。

### 2.2 检查 Java

Windows PowerShell：

```powershell
java -version
javac -version
```

正确示例：

```text
java version "21.x.x"
javac 21.x.x
```

### 2.3 检查 Maven

```powershell
mvn -version
```

---

## 3. 项目总体设计

### 3.1 项目名称

```text
hospital-asset-learning
```

中文名称：医院资产管理学习版

### 3.2 项目定位

这是一个 Java + Spring Boot 后端学习项目，不追求一开始就做得特别复杂，而是通过真实业务逐步扩展。

核心业务：

1. 部门管理
2. 用户管理
3. 资产分类管理
4. 资产台账管理
5. 资产领用管理
6. 资产维修管理
7. 资产报废管理
8. 登录认证
9. 操作日志
10. 接口文档

### 3.3 学完后应该具备的能力

完成本项目后，你应该能独立完成：

- 创建 Spring Boot 项目
- 编写 REST API
- 编写 Service 业务逻辑
- 使用数据库做 CRUD
- 设计简单业务表
- 做分页查询和条件查询
- 做统一返回结构
- 做统一异常处理
- 做参数校验
- 做登录认证基础版
- 使用 Maven 打包运行
- 将项目提交到 GitHub

---

## 4. 项目技术选型

### 4.1 后端技术

| 技术 | 用途 |
|---|---|
| Java 21 | 编程语言 |
| Spring Boot 3.5.x | 后端开发框架 |
| Spring Web | REST API |
| Spring Validation | 参数校验 |
| Spring Data JPA | 数据访问，适合入门 |
| H2 Database | 入门阶段内存数据库 |
| MySQL 8.x | 真实项目数据库 |
| Lombok | 减少 Getter/Setter 代码 |
| Spring Boot Actuator | 健康检查和运行监控 |
| springdoc-openapi | 自动生成接口文档 |
| Spring Security | 登录认证和权限控制 |

### 4.2 为什么先用 Spring Data JPA

入门阶段推荐先用 JPA，原因：

- 少写 SQL，先理解业务分层。
- Repository 自带很多基础 CRUD 方法。
- 适合快速完成项目原型。

后续可以再扩展 MyBatis / MyBatis-Plus，适合复杂 SQL 和传统管理系统。

---

## 5. 创建 Spring Boot 项目

### 5.1 使用 Spring Initializr 创建

打开：

```text
https://start.spring.io/
```

选择：

| 项目项 | 选择 |
|---|---|
| Project | Maven |
| Language | Java |
| Spring Boot | 3.5.x |
| Group | com.example |
| Artifact | hospital-asset-learning |
| Name | hospital-asset-learning |
| Packaging | Jar |
| Java | 21 |

添加依赖：

- Spring Web
- Spring Data JPA
- Validation
- H2 Database
- MySQL Driver
- Lombok
- Spring Boot DevTools
- Spring Boot Actuator

下载后解压，用 IDEA 打开。

### 5.2 推荐目录结构

```text
hospital-asset-learning
├─ pom.xml
├─ src
│  ├─ main
│  │  ├─ java
│  │  │  └─ com
│  │  │     └─ example
│  │  │        └─ asset
│  │  │           ├─ HospitalAssetLearningApplication.java
│  │  │           ├─ common
│  │  │           │  ├─ Result.java
│  │  │           │  ├─ PageResult.java
│  │  │           │  └─ BusinessException.java
│  │  │           ├─ config
│  │  │           ├─ controller
│  │  │           ├─ dto
│  │  │           ├─ entity
│  │  │           ├─ enums
│  │  │           ├─ exception
│  │  │           ├─ repository
│  │  │           └─ service
│  │  └─ resources
│  │     ├─ application.yml
│  │     ├─ application-h2.yml
│  │     └─ application-mysql.yml
│  └─ test
│     └─ java
└─ README.md
```

### 5.3 分层说明

| 层 | 作用 |
|---|---|
| controller | 接收前端请求，返回接口结果 |
| service | 编写业务逻辑 |
| repository | 操作数据库 |
| entity | 数据库表对应的实体类 |
| dto | 接收请求参数、返回数据对象 |
| common | 通用返回、分页、异常等 |
| config | 配置类 |
| exception | 全局异常处理 |
| enums | 枚举，例如资产状态 |

---

## 6. Maven 配置示例

`pom.xml` 示例：

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.5.15</version>
        <relativePath/>
    </parent>

    <groupId>com.example</groupId>
    <artifactId>hospital-asset-learning</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>hospital-asset-learning</name>
    <description>Java Spring Boot 医院资产管理学习项目</description>

    <properties>
        <java.version>21</java.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-validation</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>

        <dependency>
            <groupId>com.h2database</groupId>
            <artifactId>h2</artifactId>
            <scope>runtime</scope>
        </dependency>

        <dependency>
            <groupId>com.mysql</groupId>
            <artifactId>mysql-connector-j</artifactId>
            <scope>runtime</scope>
        </dependency>

        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>
```

---

## 7. 配置文件

### 7.1 主配置 application.yml

```yaml
spring:
  application:
    name: hospital-asset-learning
  profiles:
    active: h2

server:
  port: 8080

management:
  endpoints:
    web:
      exposure:
        include: health,info
```

### 7.2 H2 入门数据库配置 application-h2.yml

```yaml
spring:
  datasource:
    url: jdbc:h2:mem:assetdb;MODE=MySQL;DATABASE_TO_LOWER=TRUE
    driver-class-name: org.h2.Driver
    username: sa
    password:
  h2:
    console:
      enabled: true
      path: /h2-console
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
    properties:
      hibernate:
        format_sql: true
```

启动后访问：

```text
http://localhost:8080/h2-console
```

连接地址：

```text
jdbc:h2:mem:assetdb
```

### 7.3 MySQL 配置 application-mysql.yml

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/hospital_asset_learning?useUnicode=true&characterEncoding=utf8&serverTimezone=Asia/Shanghai&useSSL=false
    username: root
    password: 你的密码
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
    properties:
      hibernate:
        format_sql: true
```

切换 MySQL：

```yaml
spring:
  profiles:
    active: mysql
```

---

## 8. 第一个 Spring Boot 程序

主启动类：

```java
package com.example.asset;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class HospitalAssetLearningApplication {

    public static void main(String[] args) {
        SpringApplication.run(HospitalAssetLearningApplication.class, args);
    }
}
```

测试控制器：

```java
package com.example.asset.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping("/hello")
    public String hello() {
        return "Hello Spring Boot";
    }
}
```

启动后访问：

```text
http://localhost:8080/hello
```

---

## 9. Spring Boot 核心概念详解

### 9.1 @SpringBootApplication

`@SpringBootApplication` 是组合注解，包含：

- `@SpringBootConfiguration`
- `@EnableAutoConfiguration`
- `@ComponentScan`

它的作用：

1. 标记这是 Spring Boot 应用。
2. 开启自动配置。
3. 扫描当前包及子包中的组件。

### 9.2 Controller

Controller 用于接收 HTTP 请求。

```java
@RestController
@RequestMapping("/api/assets")
public class AssetController {

    @GetMapping("/{id}")
    public String getById(@PathVariable Long id) {
        return "资产ID：" + id;
    }
}
```

常用注解：

| 注解 | 作用 |
|---|---|
| @RestController | 声明 REST 控制器 |
| @RequestMapping | 定义公共访问路径 |
| @GetMapping | GET 请求 |
| @PostMapping | POST 请求 |
| @PutMapping | PUT 请求 |
| @DeleteMapping | DELETE 请求 |
| @PathVariable | 获取 URL 路径参数 |
| @RequestParam | 获取查询参数 |
| @RequestBody | 获取 JSON 请求体 |

### 9.3 Service

Service 用于写业务逻辑。

```java
@Service
public class AssetService {
    public String getAssetName() {
        return "电脑主机";
    }
}
```

### 9.4 Repository

Repository 用于操作数据库。

```java
public interface AssetRepository extends JpaRepository<Asset, Long> {
}
```

### 9.5 依赖注入

推荐构造方法注入：

```java
@RestController
@RequestMapping("/api/assets")
public class AssetController {

    private final AssetService assetService;

    public AssetController(AssetService assetService) {
        this.assetService = assetService;
    }
}
```

不推荐大量使用字段注入：

```java
@Autowired
private AssetService assetService;
```

---

## 10. 数据库设计

### 10.1 部门表 department

| 字段 | 类型 | 说明 |
|---|---|---|
| id | bigint | 主键 |
| name | varchar(100) | 部门名称 |
| code | varchar(50) | 部门编码 |
| parent_id | bigint | 上级部门 ID |
| enabled | tinyint | 是否启用 |
| created_at | datetime | 创建时间 |
| updated_at | datetime | 更新时间 |

### 10.2 用户表 sys_user

| 字段 | 类型 | 说明 |
|---|---|---|
| id | bigint | 主键 |
| username | varchar(50) | 登录账号 |
| password | varchar(255) | 密码 |
| real_name | varchar(50) | 真实姓名 |
| phone | varchar(30) | 手机号 |
| department_id | bigint | 所属部门 |
| enabled | tinyint | 是否启用 |
| created_at | datetime | 创建时间 |
| updated_at | datetime | 更新时间 |

### 10.3 资产分类表 asset_category

| 字段 | 类型 | 说明 |
|---|---|---|
| id | bigint | 主键 |
| name | varchar(100) | 分类名称 |
| code | varchar(50) | 分类编码 |
| parent_id | bigint | 上级分类 |
| sort_order | int | 排序 |
| enabled | tinyint | 是否启用 |
| created_at | datetime | 创建时间 |
| updated_at | datetime | 更新时间 |

### 10.4 资产表 asset

| 字段 | 类型 | 说明 |
|---|---|---|
| id | bigint | 主键 |
| asset_code | varchar(100) | 资产编号 |
| asset_name | varchar(200) | 资产名称 |
| category_id | bigint | 分类 ID |
| brand | varchar(100) | 品牌 |
| model | varchar(100) | 型号 |
| serial_number | varchar(100) | 序列号 |
| purchase_date | date | 购置日期 |
| purchase_price | decimal(12,2) | 购置金额 |
| department_id | bigint | 使用部门 |
| user_id | bigint | 使用人 |
| location | varchar(200) | 存放位置 |
| status | varchar(30) | 状态 |
| remark | varchar(500) | 备注 |
| created_at | datetime | 创建时间 |
| updated_at | datetime | 更新时间 |

资产状态建议：

| 状态 | 说明 |
|---|---|
| IDLE | 闲置 |
| IN_USE | 使用中 |
| REPAIRING | 维修中 |
| SCRAPPED | 已报废 |

### 10.5 维修记录表 asset_repair

| 字段 | 类型 | 说明 |
|---|---|---|
| id | bigint | 主键 |
| asset_id | bigint | 资产 ID |
| fault_desc | varchar(500) | 故障描述 |
| repair_result | varchar(500) | 维修结果 |
| repair_cost | decimal(12,2) | 维修费用 |
| repair_status | varchar(30) | 维修状态 |
| report_user_id | bigint | 报修人 |
| report_time | datetime | 报修时间 |
| finish_time | datetime | 完成时间 |

---

## 11. 实体类编写

### 11.1 通用父类 BaseEntity

```java
package com.example.asset.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@MappedSuperclass
public abstract class BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PrePersist
    public void prePersist() {
        LocalDateTime now = LocalDateTime.now();
        this.createdAt = now;
        this.updatedAt = now;
    }

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
```

### 11.2 资产分类实体 AssetCategory

```java
package com.example.asset.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "asset_category")
public class AssetCategory extends BaseEntity {

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, unique = true, length = 50)
    private String code;

    private Long parentId;

    private Integer sortOrder;

    private Boolean enabled;
}
```

### 11.3 资产状态枚举 AssetStatus

```java
package com.example.asset.enums;

public enum AssetStatus {
    IDLE,
    IN_USE,
    REPAIRING,
    SCRAPPED
}
```

### 11.4 资产实体 Asset

```java
package com.example.asset.entity;

import com.example.asset.enums.AssetStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "asset")
public class Asset extends BaseEntity {

    @Column(nullable = false, unique = true, length = 100)
    private String assetCode;

    @Column(nullable = false, length = 200)
    private String assetName;

    private Long categoryId;

    private String brand;

    private String model;

    private String serialNumber;

    private LocalDate purchaseDate;

    private BigDecimal purchasePrice;

    private Long departmentId;

    private Long userId;

    private String location;

    @Enumerated(EnumType.STRING)
    private AssetStatus status;

    @Column(length = 500)
    private String remark;
}
```

---

## 12. 统一返回结果

### 12.1 为什么需要统一返回

如果每个接口返回格式都不一样，前端很难处理。

推荐统一格式：

```json
{
  "code": 200,
  "message": "success",
  "data": {}
}
```

### 12.2 Result 类

```java
package com.example.asset.common;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Result<T> {

    private Integer code;
    private String message;
    private T data;

    public static <T> Result<T> success(T data) {
        Result<T> result = new Result<>();
        result.setCode(200);
        result.setMessage("success");
        result.setData(data);
        return result;
    }

    public static <T> Result<T> success() {
        return success(null);
    }

    public static <T> Result<T> fail(Integer code, String message) {
        Result<T> result = new Result<>();
        result.setCode(code);
        result.setMessage(message);
        result.setData(null);
        return result;
    }
}
```

---

## 13. 统一异常处理

### 13.1 自定义业务异常

```java
package com.example.asset.common;

public class BusinessException extends RuntimeException {

    public BusinessException(String message) {
        super(message);
    }
}
```

### 13.2 全局异常处理

```java
package com.example.asset.exception;

import com.example.asset.common.BusinessException;
import com.example.asset.common.Result;
import org.springframework.validation.BindException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BusinessException.class)
    public Result<Void> handleBusinessException(BusinessException e) {
        return Result.fail(400, e.getMessage());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Result<Void> handleValidException(MethodArgumentNotValidException e) {
        String message = e.getBindingResult().getFieldError() == null
                ? "参数校验失败"
                : e.getBindingResult().getFieldError().getDefaultMessage();
        return Result.fail(400, message);
    }

    @ExceptionHandler(Exception.class)
    public Result<Void> handleException(Exception e) {
        return Result.fail(500, "系统异常：" + e.getMessage());
    }
}
```

---

## 14. DTO 参数对象

### 14.1 新增资产分类请求

```java
package com.example.asset.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AssetCategoryCreateRequest {

    @NotBlank(message = "分类名称不能为空")
    private String name;

    @NotBlank(message = "分类编码不能为空")
    private String code;

    private Long parentId;

    private Integer sortOrder;
}
```

### 14.2 修改资产分类请求

```java
package com.example.asset.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AssetCategoryUpdateRequest {

    @NotBlank(message = "分类名称不能为空")
    private String name;

    private Long parentId;

    private Integer sortOrder;

    private Boolean enabled;
}
```

---

## 15. Repository 数据访问层

```java
package com.example.asset.repository;

import com.example.asset.entity.AssetCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AssetCategoryRepository extends JpaRepository<AssetCategory, Long> {

    boolean existsByCode(String code);

    Optional<AssetCategory> findByCode(String code);
}
```

常用方法：

| 方法 | 作用 |
|---|---|
| findAll() | 查询全部 |
| findById(id) | 按 ID 查询 |
| save(entity) | 新增或修改 |
| deleteById(id) | 按 ID 删除 |
| existsById(id) | 判断是否存在 |
| existsByCode(code) | 按编码判断是否存在 |

---

## 16. Service 业务层

### 16.1 Service 接口

```java
package com.example.asset.service;

import com.example.asset.dto.AssetCategoryCreateRequest;
import com.example.asset.dto.AssetCategoryUpdateRequest;
import com.example.asset.entity.AssetCategory;

import java.util.List;

public interface AssetCategoryService {

    AssetCategory create(AssetCategoryCreateRequest request);

    AssetCategory update(Long id, AssetCategoryUpdateRequest request);

    void delete(Long id);

    AssetCategory getById(Long id);

    List<AssetCategory> list();
}
```

### 16.2 Service 实现类

```java
package com.example.asset.service;

import com.example.asset.common.BusinessException;
import com.example.asset.dto.AssetCategoryCreateRequest;
import com.example.asset.dto.AssetCategoryUpdateRequest;
import com.example.asset.entity.AssetCategory;
import com.example.asset.repository.AssetCategoryRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AssetCategoryServiceImpl implements AssetCategoryService {

    private final AssetCategoryRepository assetCategoryRepository;

    public AssetCategoryServiceImpl(AssetCategoryRepository assetCategoryRepository) {
        this.assetCategoryRepository = assetCategoryRepository;
    }

    @Override
    @Transactional
    public AssetCategory create(AssetCategoryCreateRequest request) {
        if (assetCategoryRepository.existsByCode(request.getCode())) {
            throw new BusinessException("分类编码已存在");
        }

        AssetCategory category = new AssetCategory();
        category.setName(request.getName());
        category.setCode(request.getCode());
        category.setParentId(request.getParentId());
        category.setSortOrder(request.getSortOrder() == null ? 0 : request.getSortOrder());
        category.setEnabled(true);

        return assetCategoryRepository.save(category);
    }

    @Override
    @Transactional
    public AssetCategory update(Long id, AssetCategoryUpdateRequest request) {
        AssetCategory category = getById(id);
        category.setName(request.getName());
        category.setParentId(request.getParentId());
        category.setSortOrder(request.getSortOrder());
        category.setEnabled(request.getEnabled());
        return assetCategoryRepository.save(category);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        if (!assetCategoryRepository.existsById(id)) {
            throw new BusinessException("资产分类不存在");
        }
        assetCategoryRepository.deleteById(id);
    }

    @Override
    public AssetCategory getById(Long id) {
        return assetCategoryRepository.findById(id)
                .orElseThrow(() -> new BusinessException("资产分类不存在"));
    }

    @Override
    public List<AssetCategory> list() {
        return assetCategoryRepository.findAll();
    }
}
```

---

## 17. Controller 接口层

```java
package com.example.asset.controller;

import com.example.asset.common.Result;
import com.example.asset.dto.AssetCategoryCreateRequest;
import com.example.asset.dto.AssetCategoryUpdateRequest;
import com.example.asset.entity.AssetCategory;
import com.example.asset.service.AssetCategoryService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/asset-categories")
public class AssetCategoryController {

    private final AssetCategoryService assetCategoryService;

    public AssetCategoryController(AssetCategoryService assetCategoryService) {
        this.assetCategoryService = assetCategoryService;
    }

    @PostMapping
    public Result<AssetCategory> create(@Valid @RequestBody AssetCategoryCreateRequest request) {
        return Result.success(assetCategoryService.create(request));
    }

    @PutMapping("/{id}")
    public Result<AssetCategory> update(
            @PathVariable Long id,
            @Valid @RequestBody AssetCategoryUpdateRequest request) {
        return Result.success(assetCategoryService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public Result<Void> delete(@PathVariable Long id) {
        assetCategoryService.delete(id);
        return Result.success();
    }

    @GetMapping("/{id}")
    public Result<AssetCategory> getById(@PathVariable Long id) {
        return Result.success(assetCategoryService.getById(id));
    }

    @GetMapping
    public Result<List<AssetCategory>> list() {
        return Result.success(assetCategoryService.list());
    }
}
```

---

## 18. 接口测试

### 18.1 新增资产分类

请求：

```http
POST http://localhost:8080/api/asset-categories
Content-Type: application/json
```

请求体：

```json
{
  "name": "电脑设备",
  "code": "COMPUTER",
  "parentId": null,
  "sortOrder": 1
}
```

返回：

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "id": 1,
    "createdAt": "2026-06-30T10:00:00",
    "updatedAt": "2026-06-30T10:00:00",
    "name": "电脑设备",
    "code": "COMPUTER",
    "parentId": null,
    "sortOrder": 1,
    "enabled": true
  }
}
```

### 18.2 查询资产分类

```http
GET http://localhost:8080/api/asset-categories
```

### 18.3 修改资产分类

```http
PUT http://localhost:8080/api/asset-categories/1
Content-Type: application/json
```

```json
{
  "name": "电脑及外设",
  "parentId": null,
  "sortOrder": 1,
  "enabled": true
}
```

### 18.4 删除资产分类

```http
DELETE http://localhost:8080/api/asset-categories/1
```

---

## 19. 资产台账模块

### 19.1 新增资产请求 DTO

```java
package com.example.asset.dto;

import com.example.asset.enums.AssetStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
public class AssetCreateRequest {

    @NotBlank(message = "资产编号不能为空")
    private String assetCode;

    @NotBlank(message = "资产名称不能为空")
    private String assetName;

    @NotNull(message = "资产分类不能为空")
    private Long categoryId;

    private String brand;
    private String model;
    private String serialNumber;
    private LocalDate purchaseDate;
    private BigDecimal purchasePrice;
    private Long departmentId;
    private Long userId;
    private String location;
    private AssetStatus status;
    private String remark;
}
```

### 19.2 AssetRepository

```java
package com.example.asset.repository;

import com.example.asset.entity.Asset;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AssetRepository extends JpaRepository<Asset, Long> {

    boolean existsByAssetCode(String assetCode);

    Page<Asset> findByAssetNameContaining(String assetName, Pageable pageable);
}
```

### 19.3 资产新增业务逻辑

```java
@Service
public class AssetServiceImpl implements AssetService {

    private final AssetRepository assetRepository;

    public AssetServiceImpl(AssetRepository assetRepository) {
        this.assetRepository = assetRepository;
    }

    @Override
    @Transactional
    public Asset create(AssetCreateRequest request) {
        if (assetRepository.existsByAssetCode(request.getAssetCode())) {
            throw new BusinessException("资产编号已存在");
        }

        Asset asset = new Asset();
        asset.setAssetCode(request.getAssetCode());
        asset.setAssetName(request.getAssetName());
        asset.setCategoryId(request.getCategoryId());
        asset.setBrand(request.getBrand());
        asset.setModel(request.getModel());
        asset.setSerialNumber(request.getSerialNumber());
        asset.setPurchaseDate(request.getPurchaseDate());
        asset.setPurchasePrice(request.getPurchasePrice());
        asset.setDepartmentId(request.getDepartmentId());
        asset.setUserId(request.getUserId());
        asset.setLocation(request.getLocation());
        asset.setStatus(request.getStatus() == null ? AssetStatus.IDLE : request.getStatus());
        asset.setRemark(request.getRemark());

        return assetRepository.save(asset);
    }
}
```

### 19.4 分页查询

```java
@GetMapping("/page")
public Result<Page<Asset>> page(
        @RequestParam(defaultValue = "") String keyword,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size) {

    Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "id"));
    Page<Asset> result = keyword == null || keyword.isBlank()
            ? assetRepository.findAll(pageable)
            : assetRepository.findByAssetNameContaining(keyword, pageable);

    return Result.success(result);
}
```

注意：Spring Data JPA 的页码默认从 0 开始，前端如果传第 1 页，需要后端转换：

```java
int pageIndex = Math.max(page - 1, 0);
```

---

## 20. 参数校验详解

常用校验注解：

| 注解 | 作用 |
|---|---|
| @NotNull | 不能为 null |
| @NotBlank | 字符串不能为空，不能全是空格 |
| @NotEmpty | 集合或字符串不能为空 |
| @Size | 限制长度 |
| @Min | 最小值 |
| @Max | 最大值 |
| @Pattern | 正则校验 |
| @Email | 邮箱格式 |

示例：

```java
@NotBlank(message = "资产名称不能为空")
@Size(max = 200, message = "资产名称不能超过200个字符")
private String assetName;
```

Controller 中必须加 `@Valid`：

```java
@PostMapping
public Result<Asset> create(@Valid @RequestBody AssetCreateRequest request) {
    return Result.success(assetService.create(request));
}
```

---

## 21. REST API 设计规范

### 21.1 推荐接口命名

| 操作 | 方法 | 地址 |
|---|---|---|
| 新增资产 | POST | /api/assets |
| 修改资产 | PUT | /api/assets/{id} |
| 删除资产 | DELETE | /api/assets/{id} |
| 查询单个资产 | GET | /api/assets/{id} |
| 分页查询资产 | GET | /api/assets/page |
| 资产报修 | POST | /api/assets/{id}/repair |
| 资产报废 | POST | /api/assets/{id}/scrap |

### 21.2 状态码建议

| HTTP 状态码 | 说明 |
|---|---|
| 200 | 成功 |
| 400 | 请求参数错误 |
| 401 | 未登录 |
| 403 | 无权限 |
| 404 | 资源不存在 |
| 500 | 服务端异常 |

---

## 22. 登录认证基础版

入门阶段可以先做简单登录，不急着上 JWT 和 Spring Security。

### 22.1 登录请求

```java
@Getter
@Setter
public class LoginRequest {
    @NotBlank(message = "用户名不能为空")
    private String username;

    @NotBlank(message = "密码不能为空")
    private String password;
}
```

### 22.2 登录返回

```java
@Getter
@Setter
@AllArgsConstructor
public class LoginResponse {
    private Long userId;
    private String username;
    private String realName;
    private String token;
}
```

### 22.3 简单登录接口

```java
@PostMapping("/login")
public Result<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
    // 学习阶段先简化：真实项目密码必须加密存储
    if (!"admin".equals(request.getUsername()) || !"123456".equals(request.getPassword())) {
        throw new BusinessException("用户名或密码错误");
    }

    LoginResponse response = new LoginResponse(
            1L,
            "admin",
            "系统管理员",
            UUID.randomUUID().toString()
    );

    return Result.success(response);
}
```

### 22.4 真实项目登录建议

真实项目应该使用：

- Spring Security
- BCryptPasswordEncoder
- JWT
- Redis 存储登录状态或黑名单
- 权限菜单表
- 角色表
- 用户角色关联表

---

## 23. Spring Security 入门理解

Spring Security 负责：

1. 判断用户是否登录。
2. 判断用户有没有权限访问接口。
3. 处理登录、退出、认证失败、无权限访问。

学习顺序：

```text
先理解普通登录
  ↓
再理解 Filter 过滤器
  ↓
再接入 Spring Security
  ↓
再接入 JWT
  ↓
最后做角色权限控制
```

不要一开始就上复杂权限，否则容易卡住。

---

## 24. 接口文档 springdoc-openapi

### 24.1 添加依赖

```xml
<dependency>
    <groupId>org.springdoc</groupId>
    <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
    <version>2.8.13</version>
</dependency>
```

### 24.2 访问地址

启动后访问：

```text
http://localhost:8080/swagger-ui/index.html
```

### 24.3 Controller 添加说明

```java
@Tag(name = "资产分类管理")
@RestController
@RequestMapping("/api/asset-categories")
public class AssetCategoryController {

    @Operation(summary = "新增资产分类")
    @PostMapping
    public Result<AssetCategory> create(@Valid @RequestBody AssetCategoryCreateRequest request) {
        return Result.success(assetCategoryService.create(request));
    }
}
```

---

## 25. 操作日志设计

### 25.1 操作日志表 operation_log

| 字段 | 类型 | 说明 |
|---|---|---|
| id | bigint | 主键 |
| module_name | varchar(100) | 模块名称 |
| operation_type | varchar(50) | 操作类型 |
| operation_content | varchar(1000) | 操作内容 |
| operator_id | bigint | 操作人 ID |
| operator_name | varchar(100) | 操作人名称 |
| request_ip | varchar(50) | 请求 IP |
| created_at | datetime | 操作时间 |

### 25.2 先用简单方式记录日志

```java
log.info("新增资产分类：{}", request.getName());
```

### 25.3 进阶方式

后续可以使用：

- AOP 切面
- 自定义注解 `@OperationLog`
- 自动记录请求路径、请求参数、操作人、IP

---

## 26. 项目功能清单

### 26.1 第一版必须完成

| 模块 | 功能 |
|---|---|
| 资产分类 | 新增、修改、删除、查询 |
| 资产台账 | 新增、修改、删除、分页查询、详情 |
| 部门管理 | 新增、修改、删除、查询 |
| 用户管理 | 新增、修改、删除、查询 |
| 登录 | 用户名密码登录 |

### 26.2 第二版扩展

| 模块 | 功能 |
|---|---|
| 维修管理 | 报修、维修完成、维修记录查询 |
| 报废管理 | 报废申请、确认报废、报废记录 |
| 领用管理 | 资产领用、归还 |
| 资产盘点 | 创建盘点任务、盘点明细 |
| 操作日志 | 记录新增、修改、删除 |

### 26.3 第三版进阶

| 模块 | 功能 |
|---|---|
| 权限管理 | 用户、角色、菜单、按钮权限 |
| 文件上传 | 上传资产图片、维修附件 |
| Excel 导入导出 | 批量导入资产、导出台账 |
| 二维码/条码 | 生成资产标签 |
| 部署 | 打包成 jar，部署到 Linux |

---

## 27. 学习任务安排

### 第 1 周：Java 基础

任务：

1. 安装 JDK 和 IDEA。
2. 学习变量、数据类型、运算符。
3. 学习 if、switch、for、while。
4. 学习数组和方法。
5. 每天写 5 个小练习。

练习示例：

```java
public class HelloJava {
    public static void main(String[] args) {
        String name = "Java";
        int year = 2026;
        System.out.println("Hello " + name + ", year=" + year);
    }
}
```

### 第 2 周：面向对象

任务：

1. 类和对象。
2. 构造方法。
3. this 关键字。
4. 封装、继承、多态。
5. 接口和抽象类。

练习：写一个资产类。

```java
public class Asset {
    private String assetCode;
    private String assetName;
    private String status;

    public Asset(String assetCode, String assetName) {
        this.assetCode = assetCode;
        this.assetName = assetName;
        this.status = "闲置";
    }

    public void use() {
        this.status = "使用中";
    }
}
```

### 第 3 周：集合、异常、泛型

任务：

1. ArrayList。
2. HashMap。
3. HashSet。
4. try-catch。
5. 自定义异常。
6. 泛型。

练习：用 List 保存资产列表，用 Map 按资产编号查询。

### 第 4 周：Maven + Spring Boot 入门

任务：

1. 创建 Maven 项目。
2. 理解 pom.xml。
3. 创建 Spring Boot 项目。
4. 写第一个 Controller。
5. 用 Postman/Apifox 测试接口。

### 第 5 周：数据库 CRUD

任务：

1. 配置 H2。
2. 编写 Entity。
3. 编写 Repository。
4. 完成资产分类 CRUD。
5. 完成资产台账 CRUD。

### 第 6 周：项目完善

任务：

1. 统一返回。
2. 统一异常。
3. 参数校验。
4. 分页查询。
5. 接口文档。

### 第 7 周：登录和权限

任务：

1. 用户表。
2. 登录接口。
3. 密码加密。
4. Token。
5. 简单权限控制。

### 第 8 周：部署和总结

任务：

1. Maven 打包。
2. 运行 jar。
3. 切换 MySQL。
4. 部署到 Linux。
5. 写 README。
6. 提交 GitHub。

---

## 28. 常用命令

### 28.1 Maven 编译

```powershell
mvn clean compile
```

### 28.2 Maven 测试

```powershell
mvn test
```

### 28.3 Maven 打包

```powershell
mvn clean package -DskipTests
```

### 28.4 运行 jar

```powershell
java -jar target/hospital-asset-learning-0.0.1-SNAPSHOT.jar
```

### 28.5 指定环境运行

```powershell
java -jar target/hospital-asset-learning-0.0.1-SNAPSHOT.jar --spring.profiles.active=mysql
```

---

## 29. Git 提交步骤

### 29.1 初始化仓库

```powershell
git init
```

### 29.2 添加文件

```powershell
git add .
```

### 29.3 提交

```powershell
git commit -m "init java spring boot learning project"
```

### 29.4 绑定远程仓库

```powershell
git remote add origin https://github.com/你的用户名/hospital-asset-learning.git
```

### 29.5 推送

```powershell
git branch -M main
git push -u origin main
```

---

## 30. 推荐的 README 模板

```markdown
# hospital-asset-learning

Java + Spring Boot 医院资产管理学习项目。

## 技术栈

- Java 21
- Spring Boot 3.5.x
- Spring Web
- Spring Data JPA
- H2 / MySQL
- Validation
- Lombok

## 功能模块

- 资产分类管理
- 资产台账管理
- 部门管理
- 用户管理
- 登录认证
- 维修管理
- 报废管理

## 启动方式

```bash
mvn spring-boot:run
```

## 接口测试

访问：

```text
http://localhost:8080/hello
```

## H2 控制台

```text
http://localhost:8080/h2-console
```
```

---

## 31. 常见错误处理

### 31.1 java: 无法识别

原因：JDK 没有安装或环境变量没有配置。

处理：

1. 安装 JDK。
2. 配置 JAVA_HOME。
3. Path 中增加 `%JAVA_HOME%\\bin`。
4. 重新打开 PowerShell。

### 31.2 Maven 下载依赖很慢

可以配置国内镜像，例如阿里云 Maven 镜像。

`settings.xml` 中加入：

```xml
<mirrors>
    <mirror>
        <id>aliyunmaven</id>
        <mirrorOf>*</mirrorOf>
        <name>阿里云公共仓库</name>
        <url>https://maven.aliyun.com/repository/public</url>
    </mirror>
</mirrors>
```

### 31.3 端口 8080 被占用

修改 `application.yml`：

```yaml
server:
  port: 8081
```

或者 Windows 查看占用：

```powershell
netstat -ano | findstr 8080
```

### 31.4 Lombok 不生效

处理：

1. IDEA 安装 Lombok 插件。
2. 开启 Annotation Processing。
3. 重新 Maven Reload。

路径：

```text
Settings → Build, Execution, Deployment → Compiler → Annotation Processors
```

勾选：

```text
Enable annotation processing
```

### 31.5 H2 控制台连接不上

检查：

```yaml
spring:
  h2:
    console:
      enabled: true
      path: /h2-console
```

连接地址必须和配置一致：

```text
jdbc:h2:mem:assetdb
```

---

## 32. 学习时不要犯的错误

1. 不要一开始就同时学太多框架。
2. 不要只复制代码，要自己敲一遍。
3. 不要跳过 Java 基础直接写 Spring Boot。
4. 不要把 Controller、Service、Repository 全写在一个类里。
5. 不要真实项目明文保存密码。
6. 不要接口返回格式混乱。
7. 不要表结构没有主键。
8. 不要直接把数据库密码提交到公开 GitHub。
9. 不要所有异常都只返回“系统错误”。
10. 不要不写 README。

---

## 33. 后续进阶方向

完成本项目后，可以继续学习：

1. MyBatis-Plus
2. Spring Security + JWT
3. Redis
4. MinIO / RustFS 文件存储
5. Excel 导入导出 EasyExcel
6. Docker 部署
7. Nginx 反向代理
8. Vue / React 前端后台管理
9. 微信小程序 / 钉钉 H5 对接
10. 日志链路和系统监控

---

## 34. 最终交付标准

完成后项目至少应具备：

- 能启动。
- 能访问 `/hello`。
- 能新增资产分类。
- 能查询资产分类。
- 能新增资产。
- 能分页查询资产。
- 参数错误能返回明确提示。
- 数据不存在能返回明确提示。
- 能打包成 jar。
- GitHub 上有 README。

检查命令：

```powershell
mvn clean package -DskipTests
java -jar target/hospital-asset-learning-0.0.1-SNAPSHOT.jar
```

测试地址：

```text
http://localhost:8080/hello
http://localhost:8080/api/asset-categories
http://localhost:8080/api/assets/page
```

---

## 35. 建议提交记录

学习时建议每完成一个阶段提交一次：

```text
day01: java basic practice
day02: oop asset model
day03: collection and exception practice
day04: create spring boot project
day05: add common result and exception handler
day06: add asset category crud
day07: add asset crud
day08: add page query
day09: add login api
day10: add readme and deployment guide
```

---

## 36. 总结

这个项目不是单纯看教程，而是通过一个完整的医院资产管理学习项目，把 Java 基础和 Spring Boot 后端开发串起来。

最重要的学习方法：

```text
先跑通 → 再理解 → 再扩展 → 再优化
```

第一目标不是写得多高级，而是每个接口都能自己解释清楚：

1. 请求从哪里进来。
2. Controller 做了什么。
3. Service 做了什么。
4. Repository 怎么查数据库。
5. 返回结果怎么组装。
6. 异常怎么返回给前端。

把这些理解清楚后，再继续学习权限、缓存、文件上传、部署和前端对接。