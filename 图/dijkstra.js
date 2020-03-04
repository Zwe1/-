// 问题：这个图中的节点是大家愿意拿出来交换的东西，
// 边的权重是交换时需要额外加多少钱。
// 拿海报换吉他需要额外加 30 美元，拿黑胶唱片换吉他需要额外加 15 美元。
// Rama 需要确定采用哪种路径将【乐谱】换成【钢琴】时需要支付的额外费用最少。

const map = new Map();
map.set("乐谱", { 海报: 0, 黑胶: 5 });
map.set("海报", { 吉他: 30, 架子鼓: 35 });
map.set("架子鼓", { 钢琴: 10 });
map.set("黑胶", { 吉他: 15, 架子鼓: 20 });
map.set("吉他", { 钢琴: 20 });

const findWayOut = (map, start, end) => {
  const sides = map.get(start);
  const ks = Object.keys(sides);
  if (ks.includes(end)) return sides[end];
  // ks.map(());
};

findWayOut(map, "乐谱", "钢琴");
