// 给定一个包含非负整数的数组 nums ，返回其中可以组成三角形三条边的三元组个数。

//

// 示例 1:

// 输入: nums = [2,2,3,4]
// 输出: 3
// 解释:有效的组合是:
// 2,3,4 (使用第一个 2)
// 2,3,4 (使用第二个 2)
// 2,2,3
// 示例 2:

// 输入: nums = [4,2,3,4]
// 输出: 4
//

// 提示:

// 1 <= nums.length <= 1000
// 0 <= nums[i] <= 1000

// 来源：力扣（LeetCode）
// 链接：https://leetcode.cn/problems/valid-triangle-number
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
/**
 * @param {number[]} nums
 * @return {number}
 */
var triangleNumber = function (nums) {
  const len = nums.length;
  let ans = 0;
  nums.sort((a, b) => a - b);
  for (let i = len - 1; i >= 2; i--) {
    let left = 0;
    let right = i - 1;
    while (left < right) {
      if (nums[left] + nums[right] > nums[i]) {
        ans += right - left;
        right--;
      } else {
        left++;
      }
    }
  }

  return ans;
};

console.log(triangleNumber([2, 2, 3, 4]));
console.log(triangleNumber([4, 2, 3, 4]));
console.log(triangleNumber([7, 0, 0, 0]));
