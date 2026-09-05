---
title: 集合之 Set 与 Map
date: 2026-09-05 21:30:00
categories:
  - Java
  - 集合
tags:
  - Java
  - 集合
  - Set
  - Map
  - HashMap
---

`Set` 是无序、不可重复的集合；`Map` 是键值对（key-value）。

## 1. Set 集合

`Set` 不允许重复元素。常用实现是 `HashSet`（无序）和 `TreeSet`（有序）。

```java
import java.util.HashSet;
import java.util.Set;

public class SetDemo {
    public static void main(String[] args) {
        Set<String> set = new HashSet<>();

        set.add("Java");
        set.add("Python");
        set.add("Java");   // 重复的不会加进去
        set.add("C++");

        System.out.println(set);          // 顺序不定，例如 [Java, C++, Python]
        System.out.println(set.size());   // 3（重复的 Java 只算一次）

        System.out.println(set.contains("Java"));   // true

        // 遍历
        for (String s : set) {
            System.out.println(s);
        }
    }
}
```

**去重示例**：

```java
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class DedupDemo {
    public static void main(String[] args) {
        List<Integer> list = new ArrayList<>();
        list.add(1);
        list.add(2);
        list.add(2);
        list.add(3);
        list.add(3);
        list.add(3);

        // 用 Set 去重
        Set<Integer> set = new HashSet<>(list);
        System.out.println(set);   // [1, 2, 3]
    }
}
```

## 2. Map 集合

`Map` 存的是「键 → 值」的映射，键不能重复。最常用的是 `HashMap`。

```java
import java.util.HashMap;
import java.util.Map;

public class MapDemo {
    public static void main(String[] args) {
        Map<String, Integer> map = new HashMap<>();

        // 添加键值对
        map.put("Java", 100);
        map.put("Python", 90);
        map.put("C++", 80);
        System.out.println(map);   // {Java=100, Python=90, C++=80}

        // 根据键取值
        System.out.println(map.get("Java"));   // 100

        // 键是否存在
        System.out.println(map.containsKey("Java"));   // true

        // 大小
        System.out.println(map.size());   // 3

        // 键重复时，会覆盖旧值
        map.put("Java", 120);
        System.out.println(map.get("Java"));   // 120

        // 删除
        map.remove("C++");
        System.out.println(map);   // {Java=120, Python=90}
    }
}
```

## 3. 遍历 Map

```java
import java.util.HashMap;
import java.util.Map;

public class MapTraverseDemo {
    public static void main(String[] args) {
        Map<String, Integer> map = new HashMap<>();
        map.put("Java", 100);
        map.put("Python", 90);
        map.put("C++", 80);

        // 方式一：遍历所有键
        for (String key : map.keySet()) {
            System.out.println(key + " -> " + map.get(key));
        }

        // 方式二：遍历所有值
        for (Integer value : map.values()) {
            System.out.println(value);
        }

        // 方式三：遍历键值对（entrySet，最常用）
        for (Map.Entry<String, Integer> entry : map.entrySet()) {
            System.out.println(entry.getKey() + " -> " + entry.getValue());
        }
    }
}
```

## 4. 统计词频示例（综合练习）

```java
import java.util.HashMap;
import java.util.Map;

public class WordCountDemo {
    public static void main(String[] args) {
        String text = "apple banana apple orange banana apple";

        Map<String, Integer> count = new HashMap<>();
        for (String word : text.split(" ")) {
            // 已经出现过就 +1，没出现过就记 1
            count.put(word, count.getOrDefault(word, 0) + 1);
        }

        System.out.println(count);
        // {orange=1, banana=2, apple=3}
    }
}
```

## 5. 常见实现对比

| 集合 | 实现 | 特点 |
| --- | --- | --- |
| Set | HashSet | 无序、去重 |
| Set | TreeSet | 有序（自然排序） |
| Map | HashMap | 无序，键不能重复 |
| Map | TreeMap | 按键排序 |

## 小结

- `Set` 无序去重，`List` 有序可重复
- `Map` 是键值对，`put` 存、`get` 取、键不能重复
- 遍历 Map 用 `entrySet()`
