// sql-parser.ts
// 虚拟数据表 - 扩展更多表和数据
export let MOCK_TABLES: { [key: string]: any[] } = {
  users: [
    { id: 1, name: 'Alice', email: 'alice@example.com', age: 25, city: 'New York' },
    { id: 2, name: 'Bob', email: 'bob@example.com', age: 30, city: 'Los Angeles' },
    { id: 3, name: 'Charlie', email: 'charlie@example.com', age: 35, city: 'Chicago' },
    { id: 4, name: 'David', email: 'david@example.com', age: 28, city: 'Houston' },
    { id: 5, name: 'Eve', email: 'eve@example.com', age: 22, city: 'Phoenix' },
    { id: 6, name: 'Frank', email: 'frank@example.com', age: 40, city: 'Philadelphia' },
    { id: 7, name: 'Grace', email: 'grace@example.com', age: 33, city: 'San Antonio' },
    { id: 8, name: 'Henry', email: 'henry@example.com', age: 27, city: 'San Diego' },
    { id: 9, name: 'Ivy', email: 'ivy@example.com', age: 29, city: 'Dallas' },
    { id: 10, name: 'Jack', email: 'jack@example.com', age: 31, city: 'San Jose' }
  ],
  products: [
    { id: 1, name: 'Laptop', price: 1200, category: 'Electronics', stock: 50 },
    { id: 2, name: 'Phone', price: 800, category: 'Electronics', stock: 100 },
    { id: 3, name: 'Book', price: 20, category: 'Education', stock: 200 },
    { id: 4, name: 'Headphones', price: 150, category: 'Electronics', stock: 75 },
    { id: 5, name: 'Monitor', price: 300, category: 'Electronics', stock: 40 },
    { id: 6, name: 'Keyboard', price: 100, category: 'Accessories', stock: 60 },
    { id: 7, name: 'Mouse', price: 50, category: 'Accessories', stock: 80 },
    { id: 8, name: 'Printer', price: 200, category: 'Office', stock: 30 },
    { id: 9, name: 'Desk', price: 250, category: 'Furniture', stock: 20 },
    { id: 10, name: 'Chair', price: 150, category: 'Furniture', stock: 25 },
    { id: 11, name: 'Tablet', price: 400, category: 'Electronics', stock: 45 },
    { id: 12, name: 'Camera', price: 500, category: 'Electronics', stock: 35 },
    { id: 13, name: 'Speaker', price: 100, category: 'Electronics', stock: 55 },
    { id: 14, name: 'Backpack', price: 80, category: 'Accessories', stock: 90 },
    { id: 15, name: 'Notebook', price: 10, category: 'Education', stock: 150 }
  ],
  orders: [
    { id: 1, user_id: 1, product_id: 2, quantity: 1, order_date: '2023-01-15', status: 'shipped' },
    { id: 2, user_id: 2, product_id: 1, quantity: 1, order_date: '2023-02-20', status: 'delivered' },
    { id: 3, user_id: 3, product_id: 3, quantity: 5, order_date: '2023-03-10', status: 'pending' },
    { id: 4, user_id: 4, product_id: 4, quantity: 2, order_date: '2023-04-05', status: 'shipped' },
    { id: 5, user_id: 5, product_id: 5, quantity: 1, order_date: '2023-05-12', status: 'delivered' },
    { id: 6, user_id: 6, product_id: 6, quantity: 3, order_date: '2023-06-18', status: 'pending' },
    { id: 7, user_id: 7, product_id: 7, quantity: 1, order_date: '2023-07-22', status: 'shipped' },
    { id: 8, user_id: 8, product_id: 8, quantity: 1, order_date: '2023-08-30', status: 'delivered' },
    { id: 9, user_id: 9, product_id: 9, quantity: 2, order_date: '2023-09-14', status: 'pending' },
    { id: 10, user_id: 10, product_id: 10, quantity: 1, order_date: '2023-10-25', status: 'shipped' },
    { id: 11, user_id: 1, product_id: 11, quantity: 1, order_date: '2023-11-03', status: 'delivered' },
    { id: 12, user_id: 2, product_id: 12, quantity: 1, order_date: '2023-12-07', status: 'pending' },
    { id: 13, user_id: 3, product_id: 13, quantity: 4, order_date: '2024-01-11', status: 'shipped' },
    { id: 14, user_id: 4, product_id: 14, quantity: 2, order_date: '2024-02-15', status: 'delivered' },
    { id: 15, user_id: 5, product_id: 15, quantity: 10, order_date: '2024-03-20', status: 'pending' }
  ],
  departments: [
    { id: 1, name: 'Sales', manager_id: 3 },
    { id: 2, name: 'Marketing', manager_id: 6 },
    { id: 3, name: 'Engineering', manager_id: 9 },
    { id: 4, name: 'HR', manager_id: 2 },
    { id: 5, name: 'Finance', manager_id: 5 }
  ],
  employees: [
    { id: 1, name: 'John Doe', department_id: 1, salary: 60000, hire_date: '2020-01-10' },
    { id: 2, name: 'Jane Smith', department_id: 2, salary: 65000, hire_date: '2019-05-15' },
    { id: 3, name: 'Mike Johnson', department_id: 3, salary: 80000, hire_date: '2018-03-20' },
    { id: 4, name: 'Emily Davis', department_id: 1, salary: 55000, hire_date: '2021-07-25' },
    { id: 5, name: 'Chris Brown', department_id: 4, salary: 70000, hire_date: '2017-11-30' },
    { id: 6, name: 'Patricia Wilson', department_id: 5, salary: 75000, hire_date: '2022-02-05' },
    { id: 7, name: 'Robert Miller', department_id: 3, salary: 85000, hire_date: '2016-09-10' },
    { id: 8, name: 'Linda Anderson', department_id: 2, salary: 62000, hire_date: '2023-04-15' },
    { id: 9, name: 'James Taylor', department_id: 1, salary: 58000, hire_date: '2019-08-20' },
    { id: 10, name: 'Barbara Thomas', department_id: 4, salary: 68000, hire_date: '2020-12-25' }
  ]
};

// 获取schema函数
export const getSchema = () => {
  const schema: { [key: string]: string[] } = {};
  for (const [tableName, rows] of Object.entries(MOCK_TABLES)) {
    if (rows.length > 0) {
      schema[tableName] = Object.keys(rows[0]);
    }
  }
  return schema;
};

// 辅助函数：解析条件（支持 =, >, <, >=, <=, !=, AND, OR, LIKE）
function evaluateCondition(row: any, condition: string): boolean {
  condition = condition.trim();
  if (condition.startsWith('(') && condition.endsWith(')')) {
    return evaluateCondition(row, condition.slice(1, -1));
  }

  // 查找最外层 AND/OR
  let depth = 0;
  for (let i = 0; i < condition.length; i++) {
    if (condition[i] === '(') depth++;
    if (condition[i] === ')') depth--;
    if (depth === 0 && condition.slice(i, i+3).toUpperCase() === ' OR') {
      return evaluateCondition(row, condition.slice(0, i)) || evaluateCondition(row, condition.slice(i+3));
    }
    if (depth === 0 && condition.slice(i, i+4).toUpperCase() === ' AND') {
      return evaluateCondition(row, condition.slice(0, i)) && evaluateCondition(row, condition.slice(i+4));
    }
  }

  // 单个条件
  const operators = ['>=', '<=', '!=', '>', '<', '='];
  for (const op of operators) {
    if (condition.includes(op)) {
      const [field, valueStr] = condition.split(op).map(s => s.trim());
      const value = valueStr.replace(/'/g, '');
      const rowValue = row[field];
      const numRow = Number(rowValue);
      const numVal = Number(value);
      const isNum = !isNaN(numRow) && !isNaN(numVal);

      switch (op) {
        case '=': return isNum ? numRow === numVal : rowValue == value;
        case '>': return isNum ? numRow > numVal : rowValue > value;
        case '<': return isNum ? numRow < numVal : rowValue < value;
        case '>=': return isNum ? numRow >= numVal : rowValue >= value;
        case '<=': return isNum ? numRow <= numVal : rowValue <= value;
        case '!=': return isNum ? numRow !== numVal : rowValue != value;
      }
    }
  }

  // 支持 LIKE
  if (condition.toLowerCase().includes(' like ')) {
    const [field, valueStr] = condition.toLowerCase().split(' like ').map(s => s.trim());
    const value = valueStr.replace(/'/g, '').replace(/%/g, '.*');
    const regex = new RegExp(`^${value}$`, 'i');
    return regex.test(row[field]);
  }

  throw new Error(`无法解析条件: ${condition}`);
}

// 简单JOIN支持：只支持 INNER JOIN ON 单条件
function handleJoin(table1: any[], table2: any[], onCondition: string): any[] {
  const [field1, field2] = onCondition.split('=').map(s => s.trim().split('.').pop()!); // 简单假设 table.field = table.field
  return table1.flatMap(row1 => 
    table2.filter(row2 => row1[field1] === row2[field2]).map(row2 => ({ ...row1, ...row2 }))
  );
}

// SQL执行器 - 扩展支持简单JOIN, GROUP BY, HAVING, COUNT等聚合
export const executeSQL = (sql: string): { result?: any[]; affectedRows?: number } => {
  const trimmedSql = sql.trim().toLowerCase().replace(/;/g, '');
  
  if (trimmedSql.startsWith('select')) {
    // 改进解析：支持JOIN, GROUP BY, 聚合
    let match = trimmedSql.match(/select\s+(.*?)\s+from\s+(\w+)(?:\s+inner join\s+(\w+)\s+on\s+(.*?))?(?:\s+where\s+(.*?))?(?:\s+group by\s+(.*?))?(?:\s+having\s+(.*?))?(?:\s+order\s+by\s+(.*?)(?:\s+(asc|desc))?)?(?:\s+limit\s+(\d+))?$/);
    if (!match) throw new Error('无法解析SELECT语句');
    
    let [, fields, tableName, joinTable, onCondition, whereClause, groupBy, having, orderBy, orderDir = 'asc', limit] = match;
    let table = MOCK_TABLES[tableName];
    if (!table) throw new Error(`表 "${tableName}" 不存在`);
    
    let result = [...table];
    
    if (joinTable) {
      const joinTableData = MOCK_TABLES[joinTable];
      if (!joinTableData) throw new Error(`表 "${joinTable}" 不存在`);
      result = handleJoin(result, joinTableData, onCondition);
    }
    
    if (whereClause) {
      result = result.filter(row => evaluateCondition(row, whereClause));
    }
    
    // 简单聚合支持：只支持 COUNT(*)
    let aggregated = false;
    if (groupBy || fields.includes('count')) {
      if (fields.includes('count(*)') && groupBy) {
        const groupField = groupBy.trim();
        const groups: { [key: string]: number } = {};
        result.forEach(row => {
          const key = row[groupField];
          groups[key] = (groups[key] || 0) + 1;
        });
        result = Object.entries(groups).map(([key, count]) => ({ [groupField]: key, count }));
        aggregated = true;
      } else {
        throw new Error('只支持 COUNT(*) 与 GROUP BY');
      }
    }
    
    if (having) {
      result = result.filter(row => evaluateCondition(row, having));
    }
    
    if (orderBy) {
      result.sort((a, b) => {
        const valA = a[orderBy];
        const valB = b[orderBy];
        const cmp = valA < valB ? -1 : valA > valB ? 1 : 0;
        return orderDir.toLowerCase() === 'asc' ? cmp : -cmp;
      });
    }
    
    if (limit) {
      result = result.slice(0, parseInt(limit));
    }
    
    if (fields.trim() !== '*' && !aggregated) {
      const fieldList = fields.split(',').map(f => f.trim());
      result = result.map(row => {
        const newRow: any = {};
        fieldList.forEach(field => newRow[field] = row[field]);
        return newRow;
      });
    }
    
    return { result };
  } else if (trimmedSql.startsWith('insert into')) {
    // ... (保持原有INSERT逻辑)
    const insertMatch = trimmedSql.match(/insert into\s+(\w+)\s+\((.*?)\)\s+values\s+\((.*?)\)$/);
    if (!insertMatch) throw new Error('无法解析INSERT语句');
    
    const [, tableName, fieldsStr, valuesStr] = insertMatch;
    const table = MOCK_TABLES[tableName];
    if (!table) throw new Error(`表 "${tableName}" 不存在`);
    
    const fields = fieldsStr.split(',').map(f => f.trim());
    const values = valuesStr.split(',').map(v => {
      v = v.trim().replace(/'/g, '');
      const num = Number(v);
      return isNaN(num) ? v : num;
    });
    
    if (fields.length !== values.length) throw new Error('字段和值数量不匹配');
    
    const newRow: any = {};
    fields.forEach((field, i) => newRow[field] = values[i]);
    
    if ('id' in newRow) {
      const maxId = Math.max(...table.map(r => r.id || 0), 0);
      newRow.id = maxId + 1;
    } else if (table.length > 0 && 'id' in table[0]) {
      const maxId = Math.max(...table.map(r => r.id || 0), 0);
      newRow.id = maxId + 1;
    }
    
    table.push(newRow);
    return { affectedRows: 1 };
  } else if (trimmedSql.startsWith('update')) {
    // ... (保持原有UPDATE逻辑)
    const updateMatch = trimmedSql.match(/update\s+(\w+)\s+set\s+(.*?)(?:\s+where\s+(.*?))?$/);
    if (!updateMatch) throw new Error('无法解析UPDATE语句');
    
    const [, tableName, setClause, whereClause] = updateMatch;
    const table = MOCK_TABLES[tableName];
    if (!table) throw new Error(`表 "${tableName}" 不存在`);
    
    const sets = setClause.split(',').map(s => s.trim().split('=').map(p => p.trim()));
    
    let affected = 0;
    table.forEach(row => {
      if (!whereClause || evaluateCondition(row, whereClause)) {
        sets.forEach(([field, valueStr]) => {
          const value = valueStr.replace(/'/g, '');
          const num = Number(value);
          row[field] = isNaN(num) ? value : num;
        });
        affected++;
      }
    });
    
    return { affectedRows: affected };
  } else if (trimmedSql.startsWith('delete from')) {
    // ... (保持原有DELETE逻辑)
    const deleteMatch = trimmedSql.match(/delete from\s+(\w+)(?:\s+where\s+(.*?))?$/);
    if (!deleteMatch) throw new Error('无法解析DELETE语句');
    
    const [, tableName, whereClause] = deleteMatch;
    const table = MOCK_TABLES[tableName];
    if (!table) throw new Error(`表 "${tableName}" 不存在`);
    
    const originalLength = table.length;
    MOCK_TABLES[tableName] = table.filter(row => !(whereClause ? evaluateCondition(row, whereClause) : true));
    const affected = originalLength - MOCK_TABLES[tableName].length;
    
    return { affectedRows: affected };
  } else {
    throw new Error('不支持的SQL语句类型');
  }
};

// SQL格式化器 - 添加更多关键词
export const formatSQL = (sql: string) => {
  sql = sql
    .replace(/select/i, 'SELECT')
    .replace(/from/i, '\nFROM')
    .replace(/inner join/i, '\nINNER JOIN')
    .replace(/on/i, '\nON')
    .replace(/where/i, '\nWHERE')
    .replace(/group by/i, '\nGROUP BY')
    .replace(/having/i, '\nHAVING')
    .replace(/order by/i, '\nORDER BY')
    .replace(/limit/i, '\nLIMIT')
    .replace(/insert into/i, 'INSERT INTO')
    .replace(/values/i, '\nVALUES')
    .replace(/update/i, 'UPDATE')
    .replace(/set/i, '\nSET')
    .replace(/delete from/i, 'DELETE FROM')
    .replace(/,/g, ', ');
  
  const lines = sql.split('\n');
  return lines.map(line => line.trim() ? '  ' + line.trim() : '').join('\n').trim();
};