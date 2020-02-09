// input

const input = [
  "Allegoric Alaskans;Blithering Badgers;win",
  "Devastating Donkeys;Courageous Californians;draw",
  "Devastating Donkeys;Allegoric Alaskans;win",
  "Courageous Californians;Blithering Badgers;loss",
  "Blithering Badgers;Devastating Donkeys;loss",
  "Allegoric Alaskans;Courageous Californians;win"
];
// output
//
// Team                           | MP |  W |  D |  L |  P
// Devastating Donkeys            |  3 |  2 |  1 |  0 |  7
// Allegoric Alaskans             |  3 |  2 |  0 |  1 |  6
// Blithering Badgers             |  3 |  1 |  0 |  2 |  3
// Courageous Californians        |  3 |  0 |  1 |  2 |  1
//

// 输入校验
function getLegallyInput(arr) {
  // 需要是数组形式
  if (!(arr instanceof Array)) return [];

  // 检验输入格式
  return arr.filter(res => /^.*;.*;(win|draw|loss)$/.test(res));
}

// 计算具体分数
function getScore(result) {
  if (result === "win") return 3;
  if (result === "draw") return 1;
  return 0;
}

// 记录单个team得分
function addRecord(totoal, team, result) {
  if (totoal[team]) {
    totoal[team].MP++;
    totoal[team].P += getScore(result);
    if (result === "win") {
      totoal[team].W++;
    } else if (result === "draw") {
      totoal[team].D++;
    } else {
      totoal[team].L++;
    }
  } else {
    totoal[team] = {
      MP: 0,
      W: 0,
      D: 0,
      L: 0,
      P: 0
    };
  }
}

// 计算比赛得分
function getTeamsRecords(arr) {
  const outputMap = {};

  arr.forEach(res => {
    const [ta, tb, result] = res.split(";");
    addRecord(outputMap, ta, result);
    addRecord(outputMap, tb, result);
  });

  return outputMap;
}

/**
 *
 * @param {输入的比赛结果，以数组的方式传入} result
 */
function competation(result = []) {
  const list = getLegallyInput(result);
  let resultTable = {};

  if (list.length) {
    resultTable = getTeamsRecords(list);
  }

  return resultTable;
}

console.log(competation(input));
