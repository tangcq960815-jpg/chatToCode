window.DashboardUtils = (() => {
  const money = n => Number(n || 0).toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const wan = n => (Number(n || 0) / 10000).toFixed(2) + '万';
  const num = v => {
    if (v === null || v === undefined || v === '') return 0;
    const n = parseFloat(String(v).replace(/,/g, '').replace(/￥/g, '').trim());
    return Number.isFinite(n) ? n : 0;
  };
  const clean = v => String(v ?? '').trim();
  const sum = arr => arr.reduce((a, b) => a + Number(b || 0), 0);
  const get = (row, names) => {
    for (const name of names) {
      if (row[name] !== undefined && row[name] !== null && String(row[name]).trim() !== '') return row[name];
    }
    return '';
  };
  const normalizeMonth = m => {
    const n = parseInt(String(m || '').replace('月', '').trim(), 10);
    return Number.isFinite(n) ? n : '';
  };
  const periodFrom = (year, month, fallback) => {
    const fb = clean(fallback);
    if (fb) {
      const match = fb.match(/(20\d{2})\D{0,3}(\d{1,2})/);
      if (match) return `${match[1]}年${parseInt(match[2], 10)}月`;
      return fb;
    }
    const y = clean(year);
    const m = normalizeMonth(month);
    return y && m ? `${y}年${m}月` : '';
  };
  const periodSortValue = p => {
    const m = String(p).match(/(20\d{2})年(\d{1,2})月/);
    return m ? Number(m[1]) * 100 + Number(m[2]) : 0;
  };
  const group = (rows, keyFn, valFn) => {
    const map = new Map();
    rows.forEach(row => {
      const key = keyFn(row) || '未分类';
      map.set(key, (map.get(key) || 0) + Number(valFn(row) || 0));
    });
    return [...map.entries()].sort((a, b) => b[1] - a[1]);
  };
  const groupCountAmount = rows => {
    const map = new Map();
    rows.forEach(row => {
      const dept = row.dept || '未分类';
      if (!map.has(dept)) map.set(dept, { dept, count: 0, amount: 0 });
      const item = map.get(dept);
      item.count += 1;
      item.amount += Number(row.amount || 0);
    });
    return [...map.values()].sort((a, b) => b.amount - a.amount);
  };
  const uniquePeriods = data => {
    const set = new Set();
    ['incomeRows', 'regRows', 'settleRows', 'bedRows'].forEach(key => {
      data[key].forEach(row => row.period && set.add(row.period));
    });
    return [...set].sort((a, b) => periodSortValue(a) - periodSortValue(b));
  };
  const fillBlankPeriods = data => {
    const periods = uniquePeriods(data);
    if (periods.length !== 1) return data;
    const only = periods[0];
    ['incomeRows', 'regRows', 'settleRows', 'bedRows'].forEach(key => {
      data[key].forEach(row => { if (!row.period) row.period = only; });
    });
    return data;
  };
  const filterByPeriod = (data, period) => {
    if (!period || period === 'all') return data;
    return {
      incomeRows: data.incomeRows.filter(x => x.period === period),
      regRows: data.regRows.filter(x => x.period === period),
      settleRows: data.settleRows.filter(x => x.period === period),
      bedRows: data.bedRows.filter(x => x.period === period),
      sheetNames: data.sheetNames || [],
      fileName: data.fileName || ''
    };
  };
  return { money, wan, num, clean, sum, get, periodFrom, periodSortValue, group, groupCountAmount, uniquePeriods, fillBlankPeriods, filterByPeriod };
})();
