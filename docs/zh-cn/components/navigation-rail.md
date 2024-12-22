侧边导航栏为平板电脑和桌面电脑提供了访问不同主页面的方式。

## 使用方法 {#usage}

按需导入组件：

```js
import 'mdui/components/navigation-rail.js';
import 'mdui/components/navigation-rail-item.js';
```

按需导入组件的 TypeScript 类型：

```ts
import type { NavigationRail } from 'mdui/components/navigation-rail.js';
import type { NavigationRailItem } from 'mdui/components/navigation-rail-item.js';
```

使用示例：（示例中的 `style="position: relative"` 是为了演示需要，实际使用时请移除该样式。）

```html,example,playgroundId=320
<mdui-navigation-rail value="recent" style="position: relative">
  <mdui-navigation-rail-item icon="watch_later--outlined" value="recent">Recent</mdui-navigation-rail-item>
  <mdui-navigation-rail-item icon="image--outlined" value="images">Images</mdui-navigation-rail-item>
  <mdui-navigation-rail-item icon="library_music--outlined" value="library">Library</mdui-navigation-rail-item>
</mdui-navigation-rail>
```

**注意事项：**

该组件默认使用 `position: fixed` 定位，并会自动在 `body` 上添加 `padding-left` 或 `padding-right` 样式，以防止页面内容被该组件遮挡。

但在以下两种情况下，会默认使用 `position: absolute` 定位：

1. `<mdui-navigation-rail>` 组件的 `contained` 属性为 `true` 时。此时会在父元素上添加 `padding-left` 或 `padding-right` 样式。
2. 当位于 [`<mdui-layout></mdui-layout>`](/zh-cn/docs/2/components/layout) 组件中时。此时不会添加 `padding-left` 或 `padding-right` 样式。

## 样式 {#examples}

### 位于指定容器内 {#example-contained}

默认情况下，侧边导航栏会相对于当前窗口，在页面左侧或右侧显示。如果你希望将侧边导航栏放在指定的容器内，可以在 `<mdui-navigation-rail>` 组件上添加 `contained` 属性，此时侧边导航栏会相对于其父元素显示（你需要自行在父元素上添加 `position: relative` 样式）。

```html,example,expandable,playgroundId=321
<div style="position: relative">
  <mdui-navigation-rail contained>
    <mdui-navigation-rail-item icon="watch_later--outlined">Recent</mdui-navigation-rail-item>
    <mdui-navigation-rail-item icon="image--outlined">Images</mdui-navigation-rail-item>
    <mdui-navigation-rail-item icon="library_music--outlined">Library</mdui-navigation-rail-item>
  </mdui-navigation-rail>

  <div style="height: 260px;overflow: auto">
    <div style="height: 1000px">页面内容</div>
  </div>
</div>
```

### 位于右侧 {#example-placement}

在 `<mdui-navigation-rail>` 组件上设置 `placement` 属性为 `right`，可以将侧边导航栏显示在右侧。

```html,example,expandable,playgroundId=322
<div style="position: relative">
  <mdui-navigation-rail placement="right" contained>
    <mdui-navigation-rail-item icon="watch_later--outlined">Recent</mdui-navigation-rail-item>
    <mdui-navigation-rail-item icon="image--outlined">Images</mdui-navigation-rail-item>
    <mdui-navigation-rail-item icon="library_music--outlined">Library</mdui-navigation-rail-item>
  </mdui-navigation-rail>

  <div style="height: 260px;overflow: auto">
    <div style="height: 1000px">页面内容</div>
  </div>
</div>
```

### 显示分割线 {#example-divider}

在 `<mdui-navigation-rail>` 组件上添加 `divider` 属性，可以在侧边导航栏上添加一条分割线，以便和页面内容区分开。

```html,example,expandable,playgroundId=323
<div style="position: relative">
  <mdui-navigation-rail divider contained>
    <mdui-navigation-rail-item icon="watch_later--outlined">Recent</mdui-navigation-rail-item>
    <mdui-navigation-rail-item icon="image--outlined">Images</mdui-navigation-rail-item>
    <mdui-navigation-rail-item icon="library_music--outlined">Library</mdui-navigation-rail-item>
  </mdui-navigation-rail>

  <div style="height: 260px;overflow: auto">
    <div style="height: 1000px">页面内容</div>
  </div>
</div>
```

### 在顶部/底部添加元素 {#example-top-bottom}

可以在 `<mdui-navigation-rail>` 组件内通过 `top`、`bottom` slot 在顶部和底部添加元素。

```html,example,expandable,playgroundId=324
<div style="position: relative">
  <mdui-navigation-rail contained>
    <mdui-button-icon icon="menu" slot="top"></mdui-button-icon>
    <mdui-fab lowered icon="edit--outlined" slot="top"></mdui-fab>
    <mdui-button-icon icon="settings" slot="bottom"></mdui-button-icon>

    <mdui-navigation-rail-item icon="watch_later--outlined">Recent</mdui-navigation-rail-item>
    <mdui-navigation-rail-item icon="image--outlined">Images</mdui-navigation-rail-item>
    <mdui-navigation-rail-item icon="library_music--outlined">Library</mdui-navigation-rail-item>
  </mdui-navigation-rail>

  <div style="height: 600px;overflow: auto">
    <div style="height: 1000px">页面内容</div>
  </div>
</div>
```

### 导航项垂直对齐方式 {#example-alignment}

通过设置 `<mdui-navigation-rail>` 组件的 `alignment` 属性，可以修改导航项的垂直对齐方式。

```html,example,expandable,playgroundId=325
<div class="example-alignment" style="position: relative">
  <mdui-navigation-rail alignment="start" contained>
    <mdui-navigation-rail-item icon="watch_later--outlined">Recent</mdui-navigation-rail-item>
    <mdui-navigation-rail-item icon="image--outlined">Images</mdui-navigation-rail-item>
    <mdui-navigation-rail-item icon="library_music--outlined">Library</mdui-navigation-rail-item>
  </mdui-navigation-rail>

  <div style="height: 360px;overflow: auto">
    <mdui-segmented-button-group value="start" selects="single">
      <mdui-segmented-button value="start">start</mdui-segmented-button>
      <mdui-segmented-button value="center">center</mdui-segmented-button>
      <mdui-segmented-button value="end">end</mdui-segmented-button>
    </mdui-segmented-button-group>
  </div>
</div>

<script>
  const example = document.querySelector(".example-alignment");
  const navigationRail = example.querySelector("mdui-navigation-rail");
  const segmentedButtonGroup = example.querySelector("mdui-segmented-button-group");

  segmentedButtonGroup.addEventListener("change", (event) => {
    navigationRail.alignment = event.target.value;
  });
</script>
```

### 图标 {#example-icon}

在 `<mdui-navigation-rail-item>` 组件上，可以使用 `icon` 属性设置未激活状态的导航项图标，使用 `active-icon` 属性设置激活状态的导航项图标。也可以用 `icon` 和 `active-icon` slot 设置未激活和激活状态的图标元素。

```html,example,expandable,playgroundId=326
<div style="position: relative">
  <mdui-navigation-rail contained>
    <mdui-navigation-rail-item icon="watch_later--outlined">Recent</mdui-navigation-rail-item>
    <mdui-navigation-rail-item icon="image--outlined" active-icon="image--filled">Images</mdui-navigation-rail-item>
    <mdui-navigation-rail-item>
      Library
      <mdui-icon slot="icon" name="library_music--outlined"></mdui-icon>
      <mdui-icon slot="active-icon" name="library_music--filled"></mdui-icon>
    </mdui-navigation-rail-item>
  </mdui-navigation-rail>

  <div style="height: 260px;overflow: auto">
    <div style="height: 1000px">页面内容</div>
  </div>
</div>
```

### 仅使用图标 {#example-no-label}

`<mdui-navigation-rail-item>` 组件可以仅使用图标，不添加文本。

```html,example,expandable,playgroundId=327
<div style="position: relative">
  <mdui-navigation-rail contained>
    <mdui-navigation-rail-item icon="watch_later--outlined"></mdui-navigation-rail-item>
    <mdui-navigation-rail-item icon="image--outlined"></mdui-navigation-rail-item>
    <mdui-navigation-rail-item icon="library_music--outlined"></mdui-navigation-rail-item>
  </mdui-navigation-rail>

  <div style="height: 260px;overflow: auto">
    <div style="height: 1000px">页面内容</div>
  </div>
</div>
```

### 链接 {#example-link}

在 `<mdui-navigation-rail-item>` 组件上设置 `href` 属性，可以使导航项变为链接。此时，您还可以使用这些和链接相关的属性：`download`、`target`、`rel`。

```html,example,expandable,playgroundId=328
<div style="position: relative">
  <mdui-navigation-rail divider contained>
    <mdui-navigation-rail-item
      href="https://www.mdui.org"
      target="_blank"
      icon="watch_later--outlined"
    >Recent</mdui-navigation-rail-item>
    <mdui-navigation-rail-item icon="image--outlined">Images</mdui-navigation-rail-item>
    <mdui-navigation-rail-item icon="library_music--outlined">Library</mdui-navigation-rail-item>
  </mdui-navigation-rail>

  <div style="height: 260px;overflow: auto">
    <div style="height: 1000px">页面内容</div>
  </div>
</div>
```

### 徽标 {#example-badge}

在 `<mdui-navigation-rail-item>` 组件中，可以通过 `badge` slot 添加徽标。

```html,example,expandable,playgroundId=329
<div style="position: relative">
  <mdui-navigation-rail contained>
    <mdui-navigation-rail-item icon="watch_later--outlined">
      Recent
      <mdui-badge slot="badge">99+</mdui-badge>
    </mdui-navigation-rail-item>
    <mdui-navigation-rail-item icon="image--outlined">Images</mdui-navigation-rail-item>
    <mdui-navigation-rail-item icon="library_music--outlined">Library</mdui-navigation-rail-item>
  </mdui-navigation-rail>

  <div style="height: 260px;overflow: auto">
    <div style="height: 1000px">页面内容</div>
  </div>
</div>
```
