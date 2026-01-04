# SQL语法编辑器

一个用于学习和测试SQL语句的交互式工具，支持SQL格式化和虚拟数据表查询。

## 功能特性

- **左右布局界面**：左侧为SQL编辑器，右侧显示查询结果
- **SQL格式化**：自动格式化SQL语句，提高可读性
- **虚拟数据表**：内置users、products、orders表，支持日常SQL操作
- **语法高亮**：基本SQL语法支持
- **错误处理**：清晰的错误提示信息

## 虚拟数据表结构

### users 表
| 字段 | 类型 | 示例值 |
|------|------|--------|
| id | number | 1 |
| name | string | 'Alice' |
| email | string | 'alice@example.com' |
| age | number | 25 |

### products 表
| 字段 | 类型 | 示例值 |
|------|------|--------|
| id | number | 1 |
| name | string | 'Laptop' |
| price | number | 1200 |
| category | string | 'Electronics' |

### orders 表
| 字段 | 类型 | 示例值 |
|------|------|--------|
| id | number | 1 |
| user_id | number | 1 |
| product_id | number | 2 |
| quantity | number | 1 |
| order_date | string | '2023-01-15' |

## 支持的SQL语法

- SELECT语句
- FROM子句
- WHERE子句（支持等值比较）
- ORDER BY子句
- LIMIT子句

## 使用方法

1. 启动开发服务器：
   ```bash
   npm run dev
   ```

2. 在左侧编辑器中输入SQL语句，例如：
   ```sql
   SELECT * FROM users;
   ```

3. 点击"格式化SQL"按钮优化语句格式

4. 点击"运行"按钮执行查询

## 示例查询

- 查询所有用户：`SELECT * FROM users;`
- 条件查询：`SELECT * FROM users WHERE age = 30;`
- 字段选择：`SELECT name, email FROM users;`
- 限制结果：`SELECT * FROM products LIMIT 2;`

## 技术栈

- React
- TypeScript
- Vite
- CSS

## 项目结构

```
src/
├── App.tsx          # 主应用组件
├── sql-parser.ts    # SQL解析和执行模块
├── App.css          # 样式文件
└── ...
```