import { $ } from '../$.js';
import { JQ } from '../shared/core.js';
import { getStyle } from '../shared/css.js';
import './each.js';
import './hide.js';
import './show.js';

declare module '../shared/core.js' {
  interface JQ {
    /**
     * 切换集合中所有元素的显示状态
     * @example
```js
$('.box').toggle()
```
     */
    toggle(): this;
  }
}

/**
 * 切换元素的显示状态
 */
$.fn.toggle = function (this: JQ): JQ {
  return this.each((_, element) => {
    getStyle(element, 'display') === 'none'
      ? $(element).show()
      : $(element).hide();
  });
};
