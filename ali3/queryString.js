/**
 * 简单实现一个queryString，具有parse和stringify的能力，
 * parse，用于把一个URL查询字符串解析成一个键值对的集合。
 * 输入：查询字符串 'foo=bar&abc=xyz&abc=123'
 * 输出：一个键值对的对象
 * {
 *   foo: 'bar',
 *   abc: ['xyz', '123'],
 * }
 * stringify，相反的，用于序列化给定对象的自身属性，生成URL查询字符串。
 * 输入：一个键值对的对象
 * {
 *   foo: 'bar',
 *   abc: ['xyz', '123'],
 * }
 * 输出：查询字符串 'foo=bar&abc=xyz&abc=123'
 */

const queryString = {
  parse(str) {
    /* 功能实现 */
  },
  stringify(obj) {
    /* 功能实现 */
  }
};
