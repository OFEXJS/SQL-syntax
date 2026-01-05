import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

type CircleData = {
  id: number;
  cx: number;
  cy: number;
  radius: number;
  color: string;
  opacity: number;
  speedX: number;
  speedY: number;
  pulseSpeed: number;
};

const D3Background: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const numCircles = 30;

    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    /* ---------------- 背景渐变 ---------------- */
    const defs = svg.append('defs');

    const gradient = defs
      .append('linearGradient')
      .attr('id', 'bg-gradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '100%');

    gradient
      .append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#0f172a');

    gradient
      .append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#1e293b');

    svg
      .append('rect')
      .attr('width', width)
      .attr('height', height)
      .attr('fill', 'url(#bg-gradient)');

    /* ---------------- Glow Filter（共享） ---------------- */
    const glow = defs
      .append('filter')
      .attr('id', 'glow')
      .attr('x', '-50%')
      .attr('y', '-50%')
      .attr('width', '200%')
      .attr('height', '200%');

    glow
      .append('feGaussianBlur')
      .attr('stdDeviation', 12)
      .attr('result', 'blur');

    const merge = glow.append('feMerge');
    merge.append('feMergeNode').attr('in', 'blur');
    merge.append('feMergeNode').attr('in', 'SourceGraphic');

    /* ---------------- 圆数据 ---------------- */
    const circleData: CircleData[] = Array.from(
      { length: numCircles },
      (_, i) => ({
        id: i,
        cx: Math.random() * width,
        cy: Math.random() * height,
        radius: Math.random() * 25 + 10,
        color: `hsl(${Math.random() * 360}, 70%, 60%)`,
        opacity: Math.random() * 0.4 + 0.2,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4,
        pulseSpeed: Math.random() * 0.002 + 0.001,
      })
    );

    /* ---------------- 圆元素 ---------------- */
    const circlesGroup = svg.append('g').attr('class', 'circles');

    const circles = circlesGroup
      .selectAll('circle')
      .data(circleData)
      .enter()
      .append('circle')
      .attr('r', d => d.radius)
      .attr('fill', d => d.color)
      .attr('opacity', d => d.opacity)
      .attr('filter', 'url(#glow)')
      .attr('transform', d => `translate(${d.cx}, ${d.cy})`);

    /* ---------------- 动画（d3.timer） ---------------- */
    const timer = d3.timer((elapsed) => {
      circles
        .attr('transform', d => {
          d.cx += d.speedX;
          d.cy += d.speedY;

          if (d.cx < 0 || d.cx > width) d.speedX *= -1;
          if (d.cy < 0 || d.cy > height) d.speedY *= -1;

          return `translate(${d.cx}, ${d.cy})`;
        })
        .attr('r', d =>
          d.radius + Math.sin(elapsed * d.pulseSpeed) * 4
        );
    });

    /* ---------------- Resize ---------------- */
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      svg.attr('width', width).attr('height', height);

      svg.select('rect')
        .attr('width', width)
        .attr('height', height);
    };

    window.addEventListener('resize', handleResize);

    /* ---------------- Cleanup ---------------- */
    return () => {
      timer.stop();
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
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        overflow: 'hidden',
        willChange: 'transform',
        transform: 'translateZ(0)',
      }}
    />
  );
};

export default D3Background;
