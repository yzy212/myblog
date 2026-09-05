---
title: String 字符串
date: 2026-09-05 19:30:00
categories:
  - Java
  - 常用类
tags:
  - Java
  - 常用类
  - String
---

`String` 是 Java 里最常用的类，表示一串字符。注意它是**不可变**的。

## 1. 创建字符串

```java
public class StringCreateDemo {
    public static void main(String[] args) {
        // 方式一：直接赋值（常用）
        String s1 = "hello";

        // 方式二：new（不常用）
        String s2 = new String("hello");

        System.out.println(s1);
        System.out.println(s2);
    }
}
```

## 2. 字符串比较：equals 和 ==

```java
public class StringEqualsDemo {
    public static void main(String[] args) {
        String s1 = "hello";
        String s2 = "hello";
        String s3 = new String("hello");

        // equals：比较内容
        System.out.println(s1.equals(s2));   // true
        System.out.println(s1.equals(s3));   // true

        // ==：比较的是引用（内存地址）
        System.out.println(s1 == s2);        // true（都在字符串常量池里）
        System.out.println(s1 == s3);        // false（new 出来的地址不同）

        // 忽略大小写比较
        System.out.println("Hello".equalsIgnoreCase("hello"));   // true
    }
}
```

**结论：比较字符串内容永远用 `equals`，不要用 `==`。**

## 3. 常用方法

```java
public class StringMethodDemo {
    public static void main(String[] args) {
        String s = "Hello, Java";

        System.out.println(s.length());              // 11  长度
        System.out.println(s.charAt(0));             // H   下标 0 的字符
        System.out.println(s.contains("Java"));      // true  是否包含
        System.out.println(s.indexOf("Java"));       // 7   首次出现的位置
        System.out.println(s.startsWith("Hello"));   // true  是否以...开头
        System.out.println(s.endsWith("Java"));      // true  是否以...结尾

        // 截取（左闭右开）
        System.out.println(s.substring(7));          // Java
        System.out.println(s.substring(0, 5));       // Hello

        // 拆分
        String csv = "a,b,c,d";
        String[] parts = csv.split(",");
        System.out.println(parts[0]);                // a

        // 替换
        System.out.println(s.replace("Java", "World"));  // Hello, World

        // 大小写
        System.out.println(s.toUpperCase());         // HELLO, JAVA
        System.out.println(s.toLowerCase());         // hello, java

        // 去首尾空格
        String spaced = "   hi   ";
        System.out.println(spaced.trim());           // hi
    }
}
```

## 4. 字符串不可变

```java
public class StringImmutableDemo {
    public static void main(String[] args) {
        String s = "hello";
        s = s + " world";   // 看起来是修改，实际是创建了新字符串

        // 原来的 "hello" 还在常量池里，s 现在指向新的 "hello world"
        System.out.println(s);   // hello world
    }
}
```

因为 String 不可变，频繁拼接会创建很多中间字符串。**大量拼接用 StringBuilder**。

## 5. StringBuilder（可变字符串）

```java
public class StringBuilderDemo {
    public static void main(String[] args) {
        StringBuilder sb = new StringBuilder();

        sb.append("Hello");
        sb.append(" ");
        sb.append("Java");

        // 链式调用
        sb.append("!").append(" 欢迎");

        System.out.println(sb.toString());   // Hello Java! 欢迎

        // 插入
        sb.insert(0, ">>");
        System.out.println(sb.toString());   // >>Hello Java! 欢迎

        // 反转
        System.out.println(sb.reverse());
    }
}
```

**String vs StringBuilder：**

| 场景 | 用哪个 |
| --- | --- |
| 字符串基本不变 | String |
| 循环里频繁拼接 | StringBuilder |

```java
public class CompareDemo {
    public static void main(String[] args) {
        // 循环拼接 10 万次，用 StringBuilder 快很多
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 100000; i++) {
            sb.append(i);
        }
        String result = sb.toString();
        System.out.println(result.length());
    }
}
```

## 小结

- 比较内容用 `equals`，不用 `==`
- `String` 不可变，频繁拼接用 `StringBuilder`
- 常用：`length` `charAt` `equals` `contains` `indexOf` `substring` `split` `replace` `trim`
