// 寻宝游戏 · async/await 重写版
// 在原版 4 个步骤基础上，新增「月光石并行搜寻」「星盘谜题」「潜入重试」情节

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

class TreasureMap {
  // 原情节 1：图书馆线索
  static async getInitialClue() {
    await sleep(1000);
    return "在古老的图书馆里找到了第一张羊皮卷...";
  }

  // 原情节 2：解码古文字
  static async decodeAncientScript(clue) {
    await sleep(1500);
    if (!clue) {
      throw new Error("没有线索可以解码!");
    }
    return "解码成功!宝藏在一座被迷雾环绕的月影神庙中...";
  }

  // 新情节 1：三处线索并行搜寻月光石（Promise.all 同时开始）
  static async gatherMoonstones() {
    const spots = [
      { name: "湖心", delay: 1200 },
      { name: "树洞", delay: 1600 },
      { name: "石缝", delay: 1000 },
    ];

    const stones = await Promise.all(
      spots.map(async ({ name, delay }) => {
        console.log(`  正在搜寻${name}...`);
        await sleep(delay);
        console.log(`  ${name}月光石到手`);
        return `${name}月光石`;
      })
    );

    return stones;
  }

  // 新情节 2：把月光石嵌入星盘，解开石门谜题
  static async solveStarPuzzle(stones) {
    await sleep(1500);
    if (stones.length < 3) {
      throw new Error("月光石不足三颗，星盘无法点亮!");
    }
    return "三颗月光石嵌入星盘，星轨对齐，通往神庙的石门缓缓打开...";
  }

  // 原情节 3：潜入神庙（保留 50% 遇到守卫的设定）
  static async searchTemple(location) {
    await sleep(2000);
    if (Math.random() < 0.5) {
      throw new Error("糟糕!遇到了神庙守卫!");
    }
    return "守卫正在打盹，你悄悄潜入了内殿，找到一个神秘的箱子...";
  }

  // 原情节 4：打开宝箱
  static async openTreasureBox() {
    await sleep(1000);
    return "恭喜!你找到了传说中的宝藏——星海之泪!";
  }

  // 新情节 3：被守卫发现后，重新规划潜入路线并重试
  static async sneakInto(location, maxAttempts = 3) {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        console.log(`第 ${attempt} 次潜入神庙...`);
        return await TreasureMap.searchTemple(location);
      } catch (error) {
        console.error(`  失败：${error.message}`);
        if (attempt === maxAttempts) {
          throw new Error("三次潜入都失败了，只能改日再来。");
        }
        console.log("  点起驱兽香，重新寻找潜入路线...");
        await sleep(800);
      }
    }
  }
}

async function findTreasure() {
  const start = Date.now();
  const mark = () => `[${((Date.now() - start) / 1000).toFixed(1)}s]`;

  try {
    const clue = await TreasureMap.getInitialClue();
    console.log(`${mark()} ${clue}`);

    const location = await TreasureMap.decodeAncientScript(clue);
    console.log(`${mark()} ${location}`);

    console.log(`${mark()} 三处线索同时开始搜寻...`);
    const stones = await TreasureMap.gatherMoonstones();
    console.log(`${mark()} 集齐：${stones.join("、")}`);

    const door = await TreasureMap.solveStarPuzzle(stones);
    console.log(`${mark()} ${door}`);

    const box = await TreasureMap.sneakInto(location);
    console.log(`${mark()} ${box}`);

    const treasure = await TreasureMap.openTreasureBox();
    console.log(`${mark()} ${treasure}`);
  } catch (error) {
    console.error(`${mark()} 任务失败：${error.message}`);
  }
}

findTreasure();
