window.DashboardCharts = (() => {
  const { money, wan, sum } = window.DashboardUtils;

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function emptyCanvas(ctx, text) {
    ctx.fillStyle = '#5f748c';
    ctx.font = '15px Microsoft YaHei';
    ctx.fillText(text || '暂无数据，请选择Excel', 30, 50);
  }

  function drawBar(id, labels, values, opt = {}) {
    const canvas = document.getElementById(id);
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    const p = { l: 70, r: 24, t: 26, b: 48 };
    ctx.clearRect(0, 0, w, h);
    if (!values.length) return emptyCanvas(ctx);

    const max = Math.max(...values, 1) * 1.18;
    const cw = w - p.l - p.r;
    const ch = h - p.t - p.b;
    ctx.font = '13px Microsoft YaHei';
    ctx.strokeStyle = 'rgba(95,116,140,.18)';
    ctx.fillStyle = '#5f748c';

    for (let i = 0; i <= 4; i++) {
      const y = p.t + ch / 4 * i;
      ctx.beginPath();
      ctx.moveTo(p.l, y);
      ctx.lineTo(w - p.r, y);
      ctx.stroke();
      ctx.fillText(Math.round(max / 4 * (4 - i)).toLocaleString('zh-CN'), 8, y + 4);
    }

    const bw = cw / values.length * 0.52;
    values.forEach((v, i) => {
      const x = p.l + cw / values.length * i + cw / values.length * 0.24;
      const bh = v / max * ch;
      const y = p.t + ch - bh;
      const g = ctx.createLinearGradient(0, y, 0, p.t + ch);
      g.addColorStop(0, opt.color || '#0b63ce');
      g.addColorStop(1, '#00a6d6');
      ctx.fillStyle = g;
      roundRect(ctx, x, y, bw, bh, 8);
      ctx.fill();
      ctx.fillStyle = '#0f2742';
      ctx.textAlign = 'center';
      ctx.fillText(opt.money ? wan(v) : Number(v).toLocaleString('zh-CN'), x + bw / 2, y - 8);
      ctx.fillStyle = '#5f748c';
      ctx.fillText(labels[i], x + bw / 2, h - 18);
    });
    ctx.textAlign = 'left';
  }

  function drawLine(id, labels, values, moneyMode = false) {
    const canvas = document.getElementById(id);
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    const p = { l: 62, r: 26, t: 28, b: 45 };
    ctx.clearRect(0, 0, w, h);
    if (!values.length) return emptyCanvas(ctx);

    const max = Math.max(...values, 1) * 1.2;
    const cw = w - p.l - p.r;
    const ch = h - p.t - p.b;
    ctx.font = '13px Microsoft YaHei';
    ctx.strokeStyle = 'rgba(95,116,140,.18)';

    for (let i = 0; i <= 4; i++) {
      const y = p.t + ch / 4 * i;
      ctx.beginPath();
      ctx.moveTo(p.l, y);
      ctx.lineTo(w - p.r, y);
      ctx.stroke();
    }

    const pts = values.map((v, i) => ({
      x: p.l + (values.length === 1 ? cw / 2 : cw / (values.length - 1) * i),
      y: p.t + ch - v / max * ch,
      v
    }));

    ctx.beginPath();
    pts.forEach((pt, i) => i ? ctx.lineTo(pt.x, pt.y) : ctx.moveTo(pt.x, pt.y));
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#0b63ce';
    ctx.stroke();

    pts.forEach((pt, i) => {
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#fff';
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#0b63ce';
      ctx.stroke();
      ctx.fillStyle = '#0f2742';
      ctx.textAlign = 'center';
      ctx.fillText(moneyMode ? money(pt.v) : Number(pt.v).toLocaleString('zh-CN'), pt.x, pt.y - 14);
      ctx.fillStyle = '#5f748c';
      ctx.fillText(labels[i], pt.x, h - 16);
    });
    ctx.textAlign = 'left';
  }

  function drawDonut(id, data) {
    const canvas = document.getElementById(id);
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    const cx = w / 2;
    const cy = h / 2 - 4;
    const r = 88;
    ctx.clearRect(0, 0, w, h);

    const total = sum(data.map(d => d[1]));
    if (!total) return emptyCanvas(ctx);

    const colors = ['#0b63ce', '#00a6d6', '#6d5dfc', '#f59e0b', '#18a058'];
    let start = -Math.PI / 2;
    data.forEach((d, i) => {
      const ang = d[1] / total * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, start, start + ang);
      ctx.closePath();
      ctx.fillStyle = colors[i % colors.length];
      ctx.fill();
      start += ang;
    });

    ctx.beginPath();
    ctx.arc(cx, cy, 54, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.textAlign = 'center';
    ctx.fillStyle = '#0f2742';
    ctx.font = '800 24px Microsoft YaHei';
    ctx.fillText(wan(total), cx, cy + 2);
    ctx.fillStyle = '#5f748c';
    ctx.font = '13px Microsoft YaHei';
    ctx.fillText('结算合计', cx, cy + 28);
    ctx.textAlign = 'left';
  }

  return { drawBar, drawLine, drawDonut };
})();
