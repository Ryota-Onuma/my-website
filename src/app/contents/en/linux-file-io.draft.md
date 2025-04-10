---
title: Linux File I/O
date: 2025/4/4
thumbnail: /musician_duck.png
description: ""
tags:
  - English
  - Linux
---

# Open File

`open()` is the system call to open a file on a computer. It returns `file descriptor`. It is a non-negative 16 bit number and corresponds one-to-one with a file. We can use this number with specific system call like `read()`、`write()`、`lseek()`、`close()`.

When you call `open()`, you must specify an access mode from `O_RDONLY`, `O_WRONLY` and `O_RDWR` as flags. If you call `open()` with `O_RDONLY`, you'll open a file with read only mode. With `O_WRONLY`, you'll do it with write only mode. `O_RDWR` is a combination of `O_RDONLY` and `O_WRONLY`, allowing the file to be opened in read and write mode.
