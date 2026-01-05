import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const D3Background: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    const numCircles = 50;

    // 设置SVG尺寸
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    // 创建渐变背景
    const defs = svg.append('defs');
    
    // 主渐变
    defs.append('linearGradient')
      .attr('id', 'background-gradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '100%')
      .selectAll('stop')
      .data([
        { offset: '0%', color: '#0f172a' },
        { offset: '100%', color: '#1e293b' }
      ])
      .enter().append('stop')
      .attr('offset', d => d.offset)
      .attr('stop-color', d => d.color);

    // 绘制背景矩形
    svg.append('rect')
      .attr('width', width)
      .attr('height', height)
      .attr('fill', 'url(#background-gradient)');

    // 创建动态圆组
    const circles = svg.append('g')
      .attr('class', 'circles');

    // 生成随机圆数据
    const circleData = Array.from({ length: numCircles }, (_, i) => ({
      id: i,
      cx: Math.random() * width,
      cy: Math.random() * height,
      radius: Math.random() * 30 + 10,
      color: `hsl(${Math.random() * 360}, 70%, 60%)`,
      opacity: Math.random() * 0.5 + 0.1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      pulseSpeed: Math.random() * 0.02 + 0.01
    }));

    // 创建圆元素
    circles.selectAll('circle')
      .data(circleData)
      .enter().append('circle')
      .attr('cx', d => d.cx)
      .attr('cy', d => d.cy)
      .attr('r', d => d.radius)
      .attr('fill', d => d.color)
      .attr('opacity', d => d.opacity)
      .attr('class', 'animated-circle');

    // 为每个圆添加光晕效果
    const filters = defs.selectAll('filter')
      .data(circleData)
      .enter().append('filter')
      .attr('id', d => `glow-${d.id}`)
      .attr('x', '-50%')
      .attr('y', '-50%')
      .attr('width', '200%')
      .attr('height', '200%');

    filters.append('feGaussianBlur')
      .attr('stdDeviation', 10)
      .attr('result', 'coloredBlur');

    const merge = filters.append('feMerge');
    merge.append('feMergeNode')
      .attr('in', 'coloredBlur');
    merge.append('feMergeNode')
      .attr('in', 'SourceGraphic');

    // 应用光晕效果
    circles.selectAll('circle')
      .attr('filter', d => `url(#glow-${d.id})`);

    // 动画函数
    const animate = () => {
      circles.selectAll('circle')
        .data(circleData)
        .attr('cx', d => {
          d.cx += d.speedX;
          if (d.cx < 0 || d.cx > width) d.speedX *= -1;
          return d.cx;
        })
        .attr('cy', d => {
          d.cy += d.speedY;
          if (d.cy < 0 || d.cy > height) d.speedY *= -1;
          return d.cy;
        })
        .attr('r', d => {
          // 脉动效果
          return d.radius + Math.sin(Date.now() * d.pulseSpeed) * 5;
        });

      requestAnimationFrame(animate);
    };

    // 开始动画
    animate();

    // 窗口大小变化处理
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;

      svg.attr('width', newWidth)
        .attr('height', newHeight);

      svg.select('rect')
        .attr('width', newWidth)
        .attr('height', newHeight);

      // 更新边界检查
      circleData.forEach(d => {
        if (d.cx > newWidth) d.cx = newWidth;
        if (d.cy > newHeight) d.cy = newHeight;
      });
    };

    window.addEventListener('resize', handleResize);

    // 清理函数
    return () => {
      window.removeEventListener('resize', handleResize);
      svg.selectAll('*').remove();
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      className="d3-background"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        overflow: 'hidden'
      }}
    />
  );
};

export default D3Background;