import { Selector, TypeOrArray } from '@mdui/shared/helpers.js';
import { $ } from '../$.js';
import { JQ } from '../shared/core.js';
import './clone.js';
import './get.js';
import './map.js';
import './replaceWith.js';

declare module '../shared/core.js' {
  interface JQ {
    /**
     * 用当前集合中的元素替换指定元素
     * @param target 被替换的元素。可以是 CSS 选择器、DOM 元素、DOM 元素数组、或 JQ 对象
     * @returns 用于替换的元素的集合
     * @example
```js
// 用 .new 元素替换所有 .box 元素
$('.new').replaceAll('.box');
```
     */
    replaceAll(target: Selector | TypeOrArray<Element> | JQ): this;
  }
}

// eslint-disable-next-line
$.fn.replaceAll = function (this: JQ, target: any): JQ {
  return $(target).map((index, element) => {
    $(element).replaceWith(index ? this.clone() : this);

    return this.get();
  });
};
