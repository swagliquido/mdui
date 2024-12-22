卡片是一个多功能组件，用于承载与单一主题相关的内容和操作。

## 使用方法 {#usage}

按需导入组件：

```js
import 'mdui/components/card.js';
```

按需导入组件的 TypeScript 类型：

```ts
import type { Card } from 'mdui/components/card.js';
```

使用示例：

```html,example,playgroundId=211
<mdui-card style="width: 200px;height: 124px">Card</mdui-card>
```

## 示例 {#examples}

### 形状 {#example-variant}

使用 `variant` 属性设置卡片的形状。

```html,example,expandable,playgroundId=212
<mdui-card variant="elevated" style="width: 200px;height: 124px"></mdui-card>
<mdui-card variant="filled" style="width: 200px;height: 124px"></mdui-card>
<mdui-card variant="outlined" style="width: 200px;height: 124px"></mdui-card>
```

### 可点击 {#example-clickable}

添加 `clickable` 属性可以使卡片可点击，此时会添加鼠标悬浮效果和点击涟漪效果。

```html,example,expandable,playgroundId=213
<mdui-card clickable style="width: 200px;height: 124px"></mdui-card>
```

### 链接 {#example-link}

添加 `href` 属性，可以使卡片变为链接，此时还可以使用这些和链接相关的属性：`download`、`target`、`rel`。

```html,example,expandable,playgroundId=214
<mdui-card href="https://www.mdui.org" target="_blank" style="width: 200px;height: 124px"></mdui-card>
```

### 禁用状态 {#example-disabled}

添加 `disabled` 属性可以禁用卡片。

```html,example,expandable,playgroundId=215
<mdui-card disabled style="width: 200px;height: 124px"></mdui-card>
```
