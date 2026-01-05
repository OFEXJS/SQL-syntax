// App.tsx
import { useState, useRef, useEffect } from 'react';
import './App.css';
import { executeSQL, formatSQL, getSchema } from './sql-parser';
import D3Background from './D3Background';

function App() {
  const [sqlQuery, setSqlQuery] = useState<string>('SELECT * FROM users;');
  const [queryResult, setQueryResult] = useState<any[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [showSchema, setShowSchema] = useState<boolean>(true);

  // 新增：控制教程弹窗显示
  const [showTutorial, setShowTutorial] = useState<boolean>(false);

  // 新增：拖拽功能状态
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    handleRun();
  }, []);

  const handleRun = () => {
    try {
      const { result, affectedRows } = executeSQL(sqlQuery);
      setQueryResult(result || []);
      if (affectedRows !== undefined) {
        setMessage(`操作成功，影响 ${affectedRows} 条记录`);
      } else {
        setMessage(null);
      }
      setError(null);
    } catch (err) {
      setError((err as Error).message);
      setQueryResult([]);
      setMessage(null);
    }
  };

  const handleFormat = () => {
    try {
      const formatted = formatSQL(sqlQuery);
      setSqlQuery(formatted);
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (textarea) {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;

        const newValue = sqlQuery.substring(0, start) + '  ' + sqlQuery.substring(end);
        setSqlQuery(newValue);

        setTimeout(() => {
          if (textareaRef.current) {
            textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 2;
          }
        }, 0);
      }
    }
  };

  // 拖拽处理函数
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    const modal = e.currentTarget.parentElement;
    if (modal) {
      setDragOffset({
        x: e.clientX - modal.offsetLeft,
        y: e.clientY - modal.offsetTop
      });
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    const modal = document.getElementById('tutorial-modal');
    if (modal) {
      modal.style.left = `${e.clientX - dragOffset.x}px`;
      modal.style.top = `${e.clientY - dragOffset.y}px`;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  const schema = getSchema();

  return (
    <div className="app">
      <D3Background />
      <div className="container">
        <div className="editor-panel">
          <div className="editor-header">
            <h2>SQL编辑器</h2>
            <div className="button-group">
              <button className="btn btn-tutorial" onClick={() => setShowTutorial(true)}>
                SQL 常用命令教程
              </button>
              <button className="btn btn-format" onClick={handleFormat}>
                格式化SQL
              </button>
              <button className="btn btn-run" onClick={handleRun}>
                执行SQL
              </button>
            </div>
          </div>
          <div className="schema-panel">
            <h2 onClick={() => setShowSchema(!showSchema)} style={{ cursor: 'pointer' }}>
              可用表和字段 {showSchema ? '▼' : '▶'}
            </h2>
            {showSchema && (
              <div className="schema-content">
                {Object.entries(schema).map(([tableName, fields]) => (
                  <div key={tableName}>
                    <h3>{tableName}</h3>
                    <ul>
                      {fields.map(field => (
                        <li key={field}>{field}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
          <textarea
            ref={textareaRef}
            value={sqlQuery}
            onChange={(e) => setSqlQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="sql-editor"
            placeholder="输入SQL查询语句..."
          />
        </div>
        <div className="result-panel">
          <h2>查询结果</h2>
          {error ? (
            <div className="error">{error}</div>
          ) : message ? (
            <div className="success">{message}</div>
          ) : (
            <div className="result-table">
              {queryResult.length > 0 ? (
                <>
                  <table>
                    <thead>
                      <tr>
                        {Object.keys(queryResult[0]).map(key => (
                          <th key={key}>{key}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {queryResult.map((row, index) => (
                        <tr key={index}>
                          {Object.keys(row).map(key => (
                            <td key={key}>{String(row[key])}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="result-info">共 {queryResult.length} 条记录</div>
                </>
              ) : (
                <div className="no-result">运行查询以查看结果</div>
              )}
            </div>
          )}
        </div>
      </div>
      {/* 新增：SQL教程弹窗 */}
      {showTutorial && (
        <div className="modal-overlay" onClick={() => setShowTutorial(false)}>
          <div
            id="tutorial-modal"
            className="tutorial-modal"
            onClick={(e) => e.stopPropagation()} // 点击内容不关闭
          >
            <div className="modal-header" onMouseDown={handleMouseDown}>
              <h3>SQL 常用命令教程</h3>
              <button className="close-btn" onClick={() => setShowTutorial(false)}>×</button>
            </div>
            <div className="modal-content">
              <table className="tutorial-table">
                <thead>
                  <tr>
                    <th>命令</th>
                    <th>说明</th>
                    <th>示例</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>SELECT</td>
                    <td>用于从一个或多个表中查询数据。可以指定要查询的列和条件。</td>
                    <td><code>SELECT * FROM employees WHERE department = 'Sales';</code></td>
                  </tr>
                  <tr>
                    <td>INSERT INTO</td>
                    <td>用于向表中插入新的记录。需要指定目标表和要插入的列及其值。</td>
                    <td><code>INSERT INTO employees (name, department, hire_date) VALUES ('John Doe', 'Marketing', '2024-08-01');</code></td>
                  </tr>
                  <tr>
                    <td>UPDATE</td>
                    <td>用于更新表中现有的记录。需要指定更新的表、要更新的列和值，以及更新的条件。</td>
                    <td><code>UPDATE employees SET department = 'HR' WHERE name = 'John Doe';</code></td>
                  </tr>
                  <tr>
                    <td>DELETE</td>
                    <td>用于删除表中的记录。需要指定删除的表和删除的条件。</td>
                    <td><code>DELETE FROM employees WHERE name = 'John Doe';</code></td>
                  </tr>
                  <tr>
                    <td>CREATE TABLE</td>
                    <td>用于创建新的表。需要指定表名和表中的列及其数据类型。</td>
                    <td><code>CREATE TABLE employees (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(100), department VARCHAR(50), hire_date DATE);</code></td>
                  </tr>
                  <tr>
                    <td>ALTER TABLE</td>
                    <td>用于修改现有表的结构，例如添加列、删除列或修改列的数据类型。</td>
                    <td><code>ALTER TABLE employees ADD salary DECIMAL(10, 2);</code></td>
                  </tr>
                  <tr>
                    <td>DROP TABLE</td>
                    <td>用于删除现有的表及其所有数据。操作不可逆，表一旦删除，数据也会丢失。</td>
                    <td><code>DROP TABLE employees;</code></td>
                  </tr>
                  <tr>
                    <td>CREATE DATABASE</td>
                    <td>用于创建新的数据库。需要指定数据库的名称。</td>
                    <td><code>CREATE DATABASE company;</code></td>
                  </tr>
                  <tr>
                    <td>DROP DATABASE</td>
                    <td>用于删除现有的数据库及其所有表和数据。操作不可逆。</td>
                    <td><code>DROP DATABASE company;</code></td>
                  </tr>
                  <tr>
                    <td>JOIN</td>
                    <td>用于根据某些条件将多个表中的数据进行联合查询。包括 INNER JOIN、LEFT JOIN、RIGHT JOIN 等。</td>
                    <td><code>SELECT employees.name, departments.department_name FROM employees INNER JOIN departments ON employees.department_id = departments.id;</code></td>
                  </tr>
                  <tr>
                    <td>WHERE</td>
                    <td>用于指定查询条件，从而筛选符合条件的数据行。</td>
                    <td><code>SELECT * FROM employees WHERE department = 'Sales';</code></td>
                  </tr>
                  <tr>
                    <td>GROUP BY</td>
                    <td>用于将结果集中的数据分组，常与聚合函数（如 COUNT、SUM、AVG）一起使用。</td>
                    <td><code>SELECT department, COUNT(*) FROM employees GROUP BY department;</code></td>
                  </tr>
                  <tr>
                    <td>ORDER BY</td>
                    <td>用于对查询结果进行排序。可以指定升序（ASC）或降序（DESC）。</td>
                    <td><code>SELECT * FROM employees ORDER BY hire_date DESC;</code></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;