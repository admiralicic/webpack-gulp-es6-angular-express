import {
  computeCatmullRomPoints
} from '../curves';

function randomValue(min, max) {
  return min + Math.random() * (max - min);
}

describe('Catmull-Rom curve computation', () => {
  it('should return an array of 150 points', () => {
    let controlPoints = [];
    for (let i = 0; i < 10; ++i) {
      controlPoints.push([randomValue(0, 100), randomValue(0, 100)]);
    }
    let curvePoints = computeCatmullRomPoints(controlPoints, false, 150);
    expect(curvePoints.length).toBe(150);
  });
});