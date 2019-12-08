/**
 * 渲染带标记的文本
 * 说明：实现一个 marked 方法对带标记的文本进行 HTML 渲染
 *   标记的文本的格式如 @@文本@@，*文本*，默认规则如下
 *   '@@'使用blink标签, '*'使用em标签,
 *   '**'使用strong标签, '__' 使用strong标签。
 *   同时也可通过第二个参数对符号和标签做自定义配对。
 *
 * 示例：
 *   marked('@@whatever@@') // <p><blink>whatever</blink></p>
 *   marked('*abc* @@def@@ __ghi__') // <p><em>abc</em> <blink>def</blink> <strong>ghi</strong></p>
 *   marked('@@**cool**@@') // <p><blink><strong>cool</strong></blink></p>
 *   marked('++hello++', { '++': 'big' }) // <p><big>hello</big></p>
 */

function marked(str, matches) {
  /* 代码实现 */
  const defaultRules = {
    "@@": "blink",
    "*": "em",
    "**": "strong",
    __: "strong"
  };

  if (!matches) {
    return str
      .replace(/@@(\.+)@@/, "<blink>$1</blink>")
      .replace(/@@(\.+)@@/, "<blink>$1</blink>");
  }
}
