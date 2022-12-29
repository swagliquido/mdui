import { html, LitElement, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, Ref, ref } from 'lit/directives/ref.js';
import { when } from 'lit/directives/when.js';
import cc from 'classcat';
import { HasSlotController } from '@mdui/shared/controllers/has-slot.js';
import { uniqueId } from '@mdui/shared/helpers/uniqueId.js';
import { componentStyle } from '@mdui/shared/lit-styles/component-style.js';
import { AnchorMixin } from '@mdui/shared/mixins/anchor.js';
import { FocusableMixin } from '@mdui/shared/mixins/focusable.js';
import '../icon.js';
import { RippleMixin } from '../ripple/ripple-mixin.js';
import { navigationRailItemStyle } from './navigation-rail-item-style.js';
import type { MaterialIconsName } from '../icon.js';
import type { Ripple } from '../ripple/index.js';
import type { CSSResultGroup, TemplateResult } from 'lit';

/**
 * @slot - 文本
 * @slot icon - 图标
 * @slot active-icon - 激活状态的图标
 * @slot badge - 徽标
 *
 * @event click - 点击时触发
 * @event focus - 获得焦点时触发
 * @event blur - 失去焦点时触发
 *
 * @csspart label - 文本
 * @csspart icon - 图标
 * @csspart active-icon - 激活状态的图标
 *
 * @cssprop --shape-corner-indicator 指示器的圆角大小。可以指定一个具体的像素值；但更推荐[引用系统变量]()
 */
@customElement('mdui-navigation-rail-item')
export class NavigationRailItem extends AnchorMixin(
  RippleMixin(FocusableMixin(LitElement)),
) {
  static override styles: CSSResultGroup = [
    componentStyle,
    navigationRailItemStyle,
  ];

  private readonly rippleRef: Ref<Ripple> = createRef();

  protected override get rippleElement() {
    return this.rippleRef.value!;
  }

  private readonly hasSlotController = new HasSlotController(
    this,
    '[default]',
    'active-icon',
  );

  // 每一个 `navigation-rail-item` 元素都添加一个唯一的 key
  protected readonly key = uniqueId();

  protected override get focusDisabled(): boolean {
    return this.disabled;
  }

  protected override get focusElement(): HTMLElement | null {
    return this.href ? this.renderRoot?.querySelector('._a') : this;
  }

  protected override get rippleDisabled(): boolean {
    return this.disabled;
  }

  // 是否禁用该元素，该组件没有禁用状态
  @state() private disabled = false;

  /**
   * 是否为激活状态，由 `navigation-rail` 组件控制该参数
   */
  @property({
    type: Boolean,
    reflect: true,
    converter: (value: string | null): boolean => value !== 'false',
  })
  protected active = false;

  /**
   * 导航栏的位置，由 `navigation-rail` 组件控制该参数
   */
  @property({ reflect: true })
  protected placement: 'left' | 'right' = 'left';

  /**
   * 未激活状态的 Material Icons 图标名
   */
  @property({ reflect: true })
  public icon!: MaterialIconsName;

  /**
   * 激活状态的 Material Icons 图标名
   */
  @property({ reflect: true, attribute: 'active-icon' })
  public activeIcon!: MaterialIconsName;

  /**
   * 导航项的值
   */
  @property({ reflect: true })
  public value = '';

  private renderBadge(): TemplateResult {
    return html`<slot name="badge"></slot>`;
  }

  private renderActiveIcon(): TemplateResult {
    return html`<slot name="active-icon">
      ${when(
        this.activeIcon,
        () => html`<mdui-icon
          part="active-icon"
          class="active-icon"
          name=${this.activeIcon}
        ></mdui-icon>`,
      )}
    </slot>`;
  }

  private renderIcon(): TemplateResult {
    return html`<slot name="icon">
      ${when(
        this.icon,
        () => html`<mdui-icon
          part="icon"
          class="icon"
          name=${this.icon}
        ></mdui-icon>`,
      )}
    </slot>`;
  }

  private renderLabel(
    hasDefaultSlot: boolean,
  ): TemplateResult | typeof nothing {
    if (!hasDefaultSlot) {
      return nothing;
    }

    return html`<span part="label" class="label"><slot></slot></span>`;
  }

  private renderInner(hasDefaultSlot: boolean): TemplateResult {
    return html`<span
        class="indicator ${classMap({
          'has-active-icon':
            this.activeIcon || this.hasSlotController.test('active-icon'),
        })}"
      >
        ${this.renderBadge()}${this.renderActiveIcon()}${this.renderIcon()}
      </span>
      ${this.renderLabel(hasDefaultSlot)}`;
  }

  protected override render(): TemplateResult {
    const hasDefaultSlot = this.hasSlotController.test('[default]');
    const className = cc({
      item: true,
      'has-label': hasDefaultSlot,
    });

    return html`${this.href
        ? this.renderAnchor({
            className,
            content: this.renderInner(hasDefaultSlot),
          })
        : html`<span class=${className}>
            ${this.renderInner(hasDefaultSlot)}
          </span>`}<mdui-ripple
        .noRipple=${!this.active}
        ${ref(this.rippleRef)}
      ></mdui-ripple>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mdui-navigation-rail-item': NavigationRailItem;
  }
}
