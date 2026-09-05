---
title: 集合之 List
date: 2026-09-05 21:00:00
categories:
  - Java
  - 集合
tags:
  - Java
  - 集合
  - List
  - ArrayList
---

`List` 是有序、可重复的集合，按索引访问。最常用的是 `ArrayList`。

## 1. 为什么用集合而不是数组

数组长度固定，集合长度可动态变化。

```java
// 数组：长度固定
int[] arr = new int[3];

// 集合：长度自动增长
List<String> list = new ArrayList<>();
```

## 2. 常用操作

```java
import java.util.ArrayList;
import java.util.List;

public class ListDemo {
    public static void main(String[] args) {
        // 创建集合（JDK 7 起右边可省略泛型类型）
        List<String> list = new ArrayList<>();

        // 添加
        list.add("Java");
        list.add("Python");
        list.add("C++");
        System.out.println(list);   // [Java, Python, C++]

        // 按索引访问
        System.out.println(list.get(0));   // Java
        System.out.println(list.get(2));   // C++

        // 大小
        System.out.println(list.size());   // 3

        // 判断是否包含
        System.out.println(list.contains("Java"));   // true

        // 修改指定位置
        list.set(1, "Go");
        System.out.println(list);   // [Java, Go, C++]

        // 按索引删除
        list.remove(0);
        System.out.println(list);   // [Go, C++]

        // 按内容删除
        list.remove("C++");
        System.out.println(list);   // [Go]

        // 判断是否为空
        System.out.println(list.isEmpty());   // false
    }
}
```

## 3. 遍历 List

```java
import java.util.ArrayList;
import java.util.List;

public class ListTraverseDemo {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>();
        list.add("Java");
        list.add("Python");
        list.add("C++");

        // 方式一：普通 for（能拿到索引）
        for (int i = 0; i < list.size(); i++) {
            System.out.println(i + ": " + list.get(i));
        }

        // 方式二：增强 for（简洁）
        for (String s : list) {
            System.out.println(s);
        }

        // 方式三：forEach + Lambda
        list.forEach(s -> System.out.println(s));
    }
}
```

## 4. ArrayList 和 LinkedList 的区别

```java
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

public class ListImplDemo {
    public static void main(String[] args) {
        // 都实现了 List 接口，用法完全一样
        List<String> arrayList = new ArrayList<>();    // 底层是数组
        List<String> linkedList = new LinkedList<>();  // 底层是链表

        arrayList.add("A");
        linkedList.add("B");
    }
}
```

| 对比项 | ArrayList | LinkedList |
| --- | --- | --- |
| 底层结构 | 动态数组 | 双向链表 |
| 随机访问 get | 快（O(1)） | 慢（O(n)） |
| 插入/删除中间元素 | 慢 | 快 |
| 适用场景 | 读多写少 | 频繁增删 |

**绝大多数情况用 `ArrayList` 就够了。**

## 5. 包装类的 List

List 的泛型必须是对象类型，基本类型要用包装类。

```java
import java.util.ArrayList;
import java.util.List;

public class IntListDemo {
    public static void main(String[] args) {
        // 错误：List<int> 不行
        // List<int> list = new ArrayList<>();

        // 正确：用 Integer
        List<Integer> list = new ArrayList<>();
        list.add(10);   // 自动装箱
        list.add(20);
        list.add(30);

        int sum = 0;
        for (int n : list) {   // 自动拆箱
            sum += n;
        }
        System.out.println(sum);   // 60
    }
}
```

## 小结

- `List` 有序可重复，按索引访问
- 常用方法：`add` `get` `size` `remove` `contains` `set` `isEmpty`
- 默认用 `ArrayList`，基本类型要写包装类 `Integer`
