const KnightsTrail = require("./KnightsTrail");

const KTinstance = new KnightsTrail;

test(
  "should find the shortest number of moves to reach a target coordinate from a starting position",
  () => {
    expect(KTinstance.findShortestPath([4,5], [5,5])).toBe(3);
  }
);
