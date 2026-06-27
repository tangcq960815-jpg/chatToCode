(() => {
  const U = window.DashboardUtils;
  const C = window.DashboardCharts;
  const E = window.DashboardExcel;

  const state = {
    selectedPeriod: 'all',
    fullData: createSampleData()
  };

  function createSampleData() {
    return {
      incomeRows: [
        { period: '2025年1月', dept: '儿科', category: 'B超', quantity: 6, amount: 234 },
        { period: '2025年1月', dept: '儿科', category: 'CT', quantity: 4, amount: 720 },
        { period: '2025年1月', dept: '妇科', category: 'B超', quantity: 300, amount: 12141 },
        { period: '2025年1月', dept: '妇科', category: '检验费', quantity: 2492, amount: 58609 },
        { period: '2025年1月', dept: '妇科', category: '草药费', quantity: 65054, amount: 22053.17 },
        { period: '2025年1月', dept: '急诊科', category: 'CT', quantity: 1207, amount: 64320 },
        { period: '2025年1月', dept: '急诊科', category: '检验费', quantity: 1981, amount: 39739.5 }
      ],
      regRows: [
        { period: '2025年1月', dept: '内科', count: 1651, income: 1350.4 },
        { period: '2025年1月', dept: '急诊科', count: 878, income: 1028 },
        { period: '2025年1月', dept: '外科（骨科）', count: 539, income: 433.6 },
        { period: '2025年2月', dept: '内科', count: 1418, income: 1166.8 },
        { period: '2025年2月', dept: '急诊科', count: 681, income: 809.6 },
        { period: '2025年2月', dept: '妇科', count: 305, income: 244 }
      ],
      settleRows: [
        { period: '2025年1月', dept: '骨科1', amount: 189317.45 },
        { period: '2025年1月', dept: '骨科2', amount: 214644.62 },
        { period: '2025年1月', dept: '内科', amount: 54630.67 },
        { period: '2025年1月', dept: '普外科', amount: 21310.29 }
      ],
      bedRows: [
        { period: '2025年1月', bedDays: 9, roomFee: 360, bedDayFee: 4112.37, bedNum: 9, settleFee: 12711.32 },
        { period: '2025年1月', bedDays: 4, roomFee: 160, bedDayFee: 4007.5, bedNum: 4, settleFee: 16030.01 },
        { period: '2025年1月', bedDays: 20, roomFee: 1400, bedDayFee: 649.95, bedNum: 20, settleFee: 12999.08 }
      ],
      sheetNames: [],
      fileName: ''
    };
  }

  function $(id) { return document.getElementById(id); }
  function setStatus(text) { $('loadStatus').textContent = text; }
  function currentData() { return U.filterByPeriod(state.fullData, state.selectedPeriod); }
  function emptyText() { return state.selectedPeriod === 'all' ? '暂无数据，请选择Excel。' : `当前选择 ${state.selectedPeriod}，这个分类暂无数据；可切换“全部年月”或确认该 Sheet 是否有此月份记录。`; }
  function summaryText(data) { return `读取成功：收入${data.incomeRows.length}条、挂号${data.regRows.length}条、结算${data.settleRows.length}条、床日${data.bedRows.length}条`; }

  function populatePeriodSelect() {
    const select = $('periodSelect');
    const periods = U.uniquePeriods(state.fullData);
    select.innerHTML = '<option value="all">全部年月</option>' + periods.map(p => `<option value="${p}">${p}</option>`).join('');
    if (!periods.includes(state.selectedPeriod)) state.selectedPeriod = 'all';
    select.value = state.selectedPeriod;
    $('periodText').textContent = state.selectedPeriod === 'all' ? '统计期间：全部年月' : '统计期间：' + state.selectedPeriod;
  }

  function renderCards(data) {
    const income = U.sum(data.incomeRows.map(r => r.amount));
    const settle = U.sum(data.settleRows.map(r => r.amount));
    const reg = U.sum(data.regRows.map(r => r.count));
    const regFee = U.sum(data.regRows.map(r => r.income));
    const bedDay = U.sum(data.bedRows.map(r => r.bedDays));
    const bedFee = U.sum(data.bedRows.map(r => r.bedDayFee));
    const cards = [
      ['门诊收入', U.wan(income), `${data.incomeRows.length}条收入汇总`, '#0b63ce'],
      ['住院结算', U.wan(settle), `${data.settleRows.length}条结算明细`, '#6d5dfc'],
      ['挂号总数', reg.toLocaleString('zh-CN'), `${data.regRows.length}条挂号汇总`, '#18a058'],
      ['挂号收入', U.money(regFee), '挂号收入合计', '#00a6d6'],
      ['床日计费', bedDay.toLocaleString('zh-CN'), '床日计费合计', '#f59e0b'],
      ['床日费用', U.money(bedFee), '床日费用合计', '#ef4444']
    ];
    $('metricCards').innerHTML = cards.map(c => `<article class="card" style="color:${c[3]}"><div class="label">${c[0]}</div><div class="value">${c[1]}</div><div class="desc">${c[2]}</div></article>`).join('');
  }

  function renderAlerts(data) {
    const topIncome = U.group(data.incomeRows, r => r.dept, r => r.amount)[0] || ['暂无', 0];
    const topReg = U.group(data.regRows, r => r.dept, r => r.count)[0] || ['暂无', 0];
    const topSettle = U.group(data.settleRows, r => r.dept, r => r.amount)[0] || ['暂无', 0];
    $('alerts').innerHTML = [
      ['收入最高科室', `${topIncome[0]}，收入 ${U.money(topIncome[1])} 元。`, 'orange', '关注'],
      ['挂号量最高科室', `${topReg[0]}，挂号 ${Number(topReg[1]).toLocaleString('zh-CN')} 人次。`, 'blue', '排班'],
      ['结算金额最高科室', `${topSettle[0]}，结算 ${U.money(topSettle[1])} 元。`, 'purple', '住院'],
      ['年月筛选已生效', state.selectedPeriod === 'all' ? '当前展示全部年月数据。' : `当前只展示 ${state.selectedPeriod} 数据。`, 'green', '筛选']
    ].map(a => `<div class="alert"><div><b>${a[0]}</b><p>${a[1]}</p></div><span class="badge ${a[2]}">${a[3]}</span></div>`).join('');
  }

  function renderRank(id, data, moneyMode = true) {
    if (!data.length) {
      $(id).innerHTML = `<div class="empty">${emptyText()}</div>`;
      return;
    }
    const max = Math.max(...data.map(d => Number(d[1] || 0))) || 1;
    $(id).innerHTML = data.map(d => `<div class="barrow"><strong>${d[0]}</strong><div class="barbox"><div class="bar" style="width:${Math.max(3, d[1] / max * 100)}%"></div></div><div class="ranknum">${moneyMode ? U.money(d[1]) : Number(d[1]).toLocaleString('zh-CN')}</div></div>`).join('');
  }

  function renderTables(data) {
    const incomeMap = new Map();
    data.incomeRows.forEach(r => {
      const key = `${r.dept}|${r.category}`;
      if (!incomeMap.has(key)) incomeMap.set(key, { dept: r.dept, category: r.category, quantity: 0, amount: 0 });
      const item = incomeMap.get(key);
      item.quantity += Number(r.quantity || 0);
      item.amount += Number(r.amount || 0);
    });
    const incomeRows = [...incomeMap.values()].sort((a, b) => b.amount - a.amount);
    const totalIncome = U.sum(incomeRows.map(r => r.amount));
    $('incomeTable').innerHTML = incomeRows.map(r => `<tr><td>${r.dept}</td><td>${r.category}</td><td>${r.quantity.toLocaleString('zh-CN')}</td><td>${U.money(r.amount)}</td><td>${totalIncome ? (r.amount / totalIncome * 100).toFixed(2) : 0}%</td></tr>`).join('') || `<tr><td colspan="5">${emptyText()}</td></tr>`;

    $('regTable').innerHTML = data.regRows.map(r => `<tr><td>${r.period || '-'}</td><td>${r.dept}</td><td>${Number(r.count).toLocaleString('zh-CN')}</td><td>${U.money(r.income)}</td></tr>`).join('') || `<tr><td colspan="4">${emptyText()}</td></tr>`;

    const settleGrouped = U.groupCountAmount(data.settleRows);
    const totalSettle = U.sum(settleGrouped.map(r => r.amount));
    $('settlementTable').innerHTML = settleGrouped.map(r => `<tr><td>${r.dept}</td><td>${r.count}</td><td>${U.money(r.amount)}</td><td>${U.money(r.amount / Math.max(1, r.count))}</td><td>${totalSettle ? (r.amount / totalSettle * 100).toFixed(2) : 0}%</td></tr>`).join('') || `<tr><td colspan="5">${emptyText()}</td></tr>`;
  }

  function renderMini(data) {
    const settleGrouped = U.groupCountAmount(data.settleRows);
    const st = U.sum(settleGrouped.map(r => r.amount));
    const sc = U.sum(settleGrouped.map(r => r.count));
    const bd = U.sum(data.bedRows.map(r => r.bedDays));
    const bf = U.sum(data.bedRows.map(r => r.bedDayFee));
    const roomFee = U.sum(data.bedRows.map(r => r.roomFee));
    const bedNum = U.sum(data.bedRows.map(r => r.bedNum));
    $('settleTotalMini').textContent = U.wan(st);
    $('settleCountMini').textContent = sc;
    $('settleDeptMini').textContent = settleGrouped.length;
    $('settleTopMini').textContent = (settleGrouped[0] || { dept: '--' }).dept;
    $('bedDayTotal').textContent = bd.toLocaleString('zh-CN');
    $('bedFeeTotal').textContent = U.money(bf);
    $('bedAvgFee').textContent = U.money(bf / Math.max(1, data.bedRows.length));
    $('bedCount').textContent = data.bedRows.length;
    $('bedNumberTotal').textContent = bedNum.toLocaleString('zh-CN');
    $('bedRoomFeeTotal').textContent = U.money(roomFee);
  }

  function renderChartsAndRanks(data) {
    const deptIncome = U.group(data.incomeRows, r => r.dept, r => r.amount);
    C.drawBar('deptIncomeChart', deptIncome.map(d => d[0]), deptIncome.map(d => d[1]), { money: true });
    renderRank('incomeDeptRank', deptIncome, true);
    renderRank('categoryRank', U.group(data.incomeRows, r => r.category, r => r.amount).slice(0, 10), true);
    renderRank('regDeptRank', U.group(data.regRows, r => r.dept, r => r.count), false);

    const months = [...new Set(data.regRows.map(r => r.period).filter(Boolean))].sort((a, b) => U.periodSortValue(a) - U.periodSortValue(b));
    C.drawLine('regTrend', months, months.map(m => U.sum(data.regRows.filter(r => r.period === m).map(r => r.count))), false);
    C.drawLine('regIncomeTrend', months, months.map(m => U.sum(data.regRows.filter(r => r.period === m).map(r => r.income))), true);

    const settleGrouped = U.group(data.settleRows, r => r.dept, r => r.amount);
    renderRank('settlementRank', settleGrouped, true);
    C.drawDonut('settleDonut', settleGrouped);

    const groups = ['0-500元', '500-1000元', '1000-1500元', '1500-2000元', '2000元以上'];
    const vals = [0, 0, 0, 0, 0];
    data.bedRows.forEach(r => {
      const v = Number(r.bedDayFee || 0);
      if (v < 500) vals[0]++;
      else if (v < 1000) vals[1]++;
      else if (v < 1500) vals[2]++;
      else if (v < 2000) vals[3]++;
      else vals[4]++;
    });
    C.drawBar('bedFeeChart', groups, vals, { color: '#6d5dfc' });
  }

  function renderAll() {
    populatePeriodSelect();
    const data = currentData();
    $('nowText').textContent = '更新时间：' + new Date().toLocaleString('zh-CN', { hour12: false });
    renderCards(data);
    renderAlerts(data);
    renderMini(data);
    renderTables(data);
    renderChartsAndRanks(data);
  }

  async function readExcel(file) {
    try {
      setStatus('正在读取：' + file.name);
      state.fullData = await E.readFile(file);
      state.selectedPeriod = 'all';
      $('fileText').textContent = '文件：' + file.name;
      setStatus(summaryText(state.fullData));
      renderAll();
    } catch (err) {
      console.error(err);
      setStatus('读取失败：请确认Excel格式和Sheet名称。');
      alert('Excel读取失败：' + err.message);
    }
  }

  function bindEvents() {
    document.querySelectorAll('.tab').forEach(btn => btn.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
      btn.classList.add('active');
      $(btn.dataset.target).classList.add('active');
    }));
    $('excelFile').addEventListener('change', e => {
      const file = e.target.files[0];
      if (file) readExcel(file);
    });
    $('periodSelect').addEventListener('change', e => {
      state.selectedPeriod = e.target.value;
      renderAll();
    });
  }

  async function init() {
    bindEvents();
    renderAll();
    const ok = await E.loadXlsxLib();
    if (ok) {
      $('excelFile').disabled = false;
      setStatus('Excel解析库已就绪，请选择你的Excel文件。');
    } else {
      setStatus('Excel解析库加载失败：请把 lib/xlsx.full.min.js 放到 index.html 同级目录下。');
    }
  }

  init();
})();
