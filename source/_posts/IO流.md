---
title: IO 流
date: 2026-09-05 23:00:00
categories:
  - Java
  - IO流
tags:
  - Java
  - IO
  - 文件
---

IO 流用来读写文件、网络等数据。分「字节流」和「字符流」两大类，字符流专门处理文本。

## 1. File 类

`File` 表示一个文件或目录的路径，可以判断、创建、删除。

```java
import java.io.File;

public class FileDemo {
    public static void main(String[] args) {
        File file = new File("test.txt");

        System.out.println(file.exists());        // 是否存在
        System.out.println(file.getName());       // test.txt
        System.out.println(file.getAbsolutePath());  // 绝对路径
        System.out.println(file.isDirectory());   // 是否是目录
        System.out.println(file.length());        // 文件大小（字节）

        // 列出目录下的文件
        File dir = new File(".");
        for (String name : dir.list()) {
            System.out.println(name);
        }
    }
}
```

## 2. 写文件：FileWriter / BufferedWriter

```java
import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;

public class WriteFileDemo {
    public static void main(String[] args) {
        // try-with-resources 自动关闭流
        try (BufferedWriter writer = new BufferedWriter(new FileWriter("output.txt"))) {
            writer.write("第一行");
            writer.newLine();          // 换行
            writer.write("第二行");
            System.out.println("写入完成");
        } catch (IOException e) {
            System.out.println("写入失败：" + e.getMessage());
        }
    }
}
```

## 3. 读文件：FileReader / BufferedReader

```java
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class ReadFileDemo {
    public static void main(String[] args) {
        try (BufferedReader reader = new BufferedReader(new FileReader("output.txt"))) {
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }
        } catch (IOException e) {
            System.out.println("读取失败：" + e.getMessage());
        }
    }
}
```

输出：

```
第一行
第二行
```

## 4. 字节流：FileInputStream / FileOutputStream

字节流处理二进制数据（图片、音频、视频等）。

```java
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

public class ByteStreamDemo {
    public static void main(String[] args) {
        // 复制文件
        try (FileInputStream in = new FileInputStream("input.txt");
             FileOutputStream out = new FileOutputStream("copy.txt")) {

            byte[] buffer = new byte[1024];   // 缓冲区
            int len;
            while ((len = in.read(buffer)) != -1) {
                out.write(buffer, 0, len);
            }
            System.out.println("复制完成");
        } catch (IOException e) {
            System.out.println("出错：" + e.getMessage());
        }
    }
}
```

## 5. 字符流 vs 字节流

| 类型 | 用途 | 常用类 |
| --- | --- | --- |
| 字符流 | 处理文本（中文、字符） | FileReader / FileWriter、BufferedReader / BufferedWriter |
| 字节流 | 处理二进制（图片、视频） | FileInputStream / FileOutputStream |

**读文本用字符流，读二进制用字节流。**

## 6. 按行读取并统计行数（综合示例）

```java
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class CountLineDemo {
    public static void main(String[] args) {
        int count = 0;
        try (BufferedReader reader = new BufferedReader(new FileReader("output.txt"))) {
            while (reader.readLine() != null) {
                count++;
            }
            System.out.println("共 " + count + " 行");
        } catch (IOException e) {
            System.out.println("读取失败：" + e.getMessage());
        }
    }
}
```

## 小结

- `File` 表示文件/目录路径
- 文本用字符流（`FileReader`/`FileWriter` + `BufferedReader`/`BufferedWriter`）
- 二进制用字节流（`FileInputStream`/`FileOutputStream`）
- 用 try-with-resources 自动关闭流
