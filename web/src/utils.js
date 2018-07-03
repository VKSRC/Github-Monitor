const statusConvert = (status, id) => {
  let rs;
  if (status) {
    switch (status) {
      case '全部':
        rs = '';
        break;
      case '待确认':
        rs = 1;
        break;
      case '待处理':
        rs = 2;
        break;
      case '已处理':
        rs = 3;
        break;
      case '无风险':
        rs = 4;
        break;
    }
    return rs;
  } else if (id) {
    switch (id) {
      case '':
        rs = '全部';
        break;
      case 1:
        rs = '待确认';
        break;
      case 2:
        rs = '待处理';
        break;
      case 3:
        rs = '已处理';
        break;
      case 4:
        rs = '无风险';
        break;
    }
  }
};


export { statusConvert };
