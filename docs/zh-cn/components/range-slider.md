范围滑块组件用于让用户在一系列值中选择一个范围。

## 使用方法 {#usage}

按需导入组件：

```js
import 'mdui/components/range-slider.js';
```

按需导入组件的 TypeScript 类型：

```ts
import type { RangeSlider } from 'mdui/components/range-slider.js';
```

使用示例：

```html,example,playgroundId=336
<mdui-range-slider></mdui-range-slider>
```

## 示例 {#examples}

### 默认值 {#example-value}

通过 `value` 属性，可以读取或设置范围滑块的当前值。该属性值是一个数组，只能通过 JavaScript 属性进行读取和设置。

```html,example,expandable,playgroundId=337
<mdui-range-slider class="example-value"></mdui-range-slider>

<script>
  const slider = document.querySelector(".example-value");
  slider.value = [30, 70];
</script>
```

### 禁用状态 {#example-disabled}

添加 `disabled` 属性可以禁用范围滑块。

```html,example,expandable,playgroundId=338
<mdui-range-slider disabled></mdui-range-slider>
```

### 范围 {#example-min-max}

使用 `min` 和 `max` 属性设置范围滑块的最小值和最大值。

```html,example,expandable,playgroundId=339
<mdui-range-slider min="10" max="20"></mdui-range-slider>
```

### 步进间隔 {#example-step}

使用 `step` 属性设置范围滑块的步进间隔。

```html,example,expandable,playgroundId=340
<mdui-range-slider step="10"></mdui-range-slider>
```

### 刻度标记 {#example-tickmarks}

添加 `tickmarks` 属性可以在范围滑块上添加刻度标记。

```html,example,expandable,playgroundId=341
<mdui-range-slider tickmarks step="10"></mdui-range-slider>
```

### 隐藏文本提示 {#example-nolabel}

添加 `nolabel` 属性可以隐藏范围滑块上的文本提示。

```html,example,expandable,playgroundId=342
<mdui-range-slider nolabel></mdui-range-slider>
```

### 修改文本提示 {#example-labelFormatter}

通过 `labelFormatter` JavaScript 属性，可以修改文本提示的显示格式。该属性值是一个函数，函数参数为当前范围滑块的值，返回值为你期望显示的文本。

```html,example,expandable,playgroundId=343
<mdui-range-slider class="example-label-formatter"></mdui-range-slider>

<script>
  const slider = document.querySelector(".example-label-formatter");
  slider.labelFormatter = (value) => `${value} 小时`;
</script>
```
