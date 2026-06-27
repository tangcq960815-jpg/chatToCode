window.DashboardExcel = (() => {
  const { num, clean, get, periodFrom, fillBlankPeriods } = window.DashboardUtils;

  function loadXlsxLib() {
    return new Promise(resolve => {
      if (window.XLSX) return resolve(true);
      const local = document.createElement('script');
      local.src = './lib/xlsx.full.min.js';
      local.onload = () => resolve(true);
      local.onerror = () => {
        const cdn = document.createElement('script');
        cdn.src = 'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js';
        cdn.onload = () => resolve(true);
        cdn.onerror = () => resolve(false);
        document.head.appendChild(cdn);
      };
      document.head.appendChild(local);
    });
  }

  function loadSheet(workbook, names) {
    const arr = Array.isArray(names) ? names : [names];
    const name = workbook.SheetNames.find(s => arr.some(n => s === n || s.includes(n)));
    return name ? XLSX.utils.sheet_to_json(workbook.Sheets[name], { defval: '', raw: false }) : [];
  }

  function parseIncome(workbook) {
    let rows = loadSheet(workbook, '收入数据');
    if (!rows.length) rows = loadSheet(workbook, '内科医生门诊收入');
    return rows.map(row => {
      const period = periodFrom(get(row, ['年', '统计年份']), get(row, ['月', '统计月份']), get(row, ['年月']));
      return {
        period,
        source: clean(get(row, ['来源'])) || '门诊',
        dept: clean(get(row, ['科室', '开单科室', '就诊科室'])),
        category: clean(get(row, ['类别', '费用类别'])),
        quantity: num(get(row, ['总数量', '数量', '类别数量'])),
        amount: num(get(row, ['总收入', '类别总金额', '金额', '收入']))
      };
    }).filter(x => x.dept && x.category && (x.quantity || x.amount));
  }

  function parseRegister(workbook) {
    return loadSheet(workbook, '挂号数据').map(row => ({
      period: periodFrom(get(row, ['统计年份', '年']), get(row, ['统计月份', '月']), get(row, ['年月'])),
      dept: clean(get(row, ['就诊科室', '科室'])),
      count: num(get(row, ['挂号总数'])),
      income: num(get(row, ['挂号总收入']))
    })).filter(x => x.dept && x.dept !== 'NULL' && (x.count || x.income));
  }

  function parseSettlement(workbook) {
    return loadSheet(workbook, '结算数据').map(row => ({
      period: periodFrom(get(row, ['年', '统计年份']), get(row, ['月', '统计月份']), get(row, ['年月'])),
      dept: clean(get(row, ['就诊科室', '科室'])) || '未分类',
      amount: num(get(row, ['患者总费用', '住院结算总费用', '总费用', '费用']))
    })).filter(x => x.amount > 0);
  }

  function parseBedDay(workbook) {
    return loadSheet(workbook, '床日数据').map(row => ({
      period: periodFrom(get(row, ['年', '统计年份']), get(row, ['月', '统计月份']), get(row, ['年月'])),
      bedDays: num(get(row, ['床日计费', '床日数'])),
      roomFee: num(get(row, ['床位费'])),
      bedDayFee: num(get(row, ['床日费用'])),
      bedNum: num(get(row, ['床位总数'])),
      settleFee: num(get(row, ['住院结算总费用']))
    })).filter(x => x.bedDays || x.roomFee || x.bedDayFee || x.bedNum || x.settleFee);
  }

  function parseWorkbook(workbook, fileName) {
    const data = {
      incomeRows: parseIncome(workbook),
      regRows: parseRegister(workbook),
      settleRows: parseSettlement(workbook),
      bedRows: parseBedDay(workbook),
      sheetNames: workbook.SheetNames,
      fileName
    };
    return fillBlankPeriods(data);
  }

  async function readFile(file) {
    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: 'array', cellDates: true });
    return parseWorkbook(workbook, file.name);
  }

  return { loadXlsxLib, readFile };
})();
