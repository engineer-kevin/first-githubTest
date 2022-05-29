// 给你一个数组，将数组中的元素向右轮转 k 个位置，其中 k 是非负数。

// 示例 1:

// 输入: nums = [1,2,3,4,5,6,7], k = 3
// 输出: [5,6,7,1,2,3,4]
// 解释:
// 向右轮转 1 步: [7,1,2,3,4,5,6]
// 向右轮转 2 步: [6,7,1,2,3,4,5]
// 向右轮转 3 步: [5,6,7,1,2,3,4]
// 示例 2:

// 输入：nums = [-1,-100,3,99], k = 2
// 输出：[3,99,-1,-100]
// 解释: 
// 向右轮转 1 步: [99,-1,-100,3]
// 向右轮转 2 步: [3,99,-1,-100]
//  

// 提示：

// 1 <= nums.length <= 105
// -231 <= nums[i] <= 231 - 1
// 0 <= k <= 105
// 进阶：

// 尽可能想出更多的解决方案，至少有 三种 不同的方法可以解决这个问题。
// 你可以使用空间复杂度为 O(1) 的 原地 算法解决这个问题吗？

// 来源：力扣（LeetCode）
// 链接：https://leetcode.cn/problems/rotate-array
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function(nums, k) {
  let len = nums.length
  k %= len
  reverse(nums, 0, len - 1)
  reverse(nums, 0, k - 1)
  reverse(nums, k, len - 1)
};

function reverse (nums, start, end) {
  while (start < end) {
      const temp = nums[start]
      nums[start] = nums[end]
      nums[end] = temp
      start++
      end--
  }
}