import type { ReactiveController, ReactiveControllerHost } from 'lit';

type SlotName = '[default]' | string;

/**
 * 检查指定的 slot 是否存在
 */
export class HasSlotController implements ReactiveController {
  private host: ReactiveControllerHost & Element;
  private slotNames: SlotName[] = [];

  public constructor(
    host: ReactiveControllerHost & Element,
    ...slotNames: SlotName[]
  ) {
    (this.host = host).addController(this);
    this.slotNames = slotNames;
    this.onSlotChange = this.onSlotChange.bind(this);
  }

  private hasDefaultSlot(): boolean {
    // @ts-ignore
    return [...this.host.childNodes].some((node) => {
      if (node.nodeType === node.TEXT_NODE && node.textContent!.trim() !== '') {
        return true;
      }

      if (node.nodeType === node.ELEMENT_NODE) {
        const el = node as HTMLElement;
        if (!el.hasAttribute('slot')) {
          return true;
        }
      }

      return false;
    });
  }

  private hasNamedSlot(name: string): boolean {
    return this.host.querySelector(`:scope > [slot="${name}"]`) !== null;
  }

  public test(slotName: SlotName): boolean {
    return slotName === '[default]'
      ? this.hasDefaultSlot()
      : this.hasNamedSlot(slotName);
  }

  public hostConnected(): void {
    this.host.shadowRoot!.addEventListener('slotchange', this.onSlotChange);
  }

  public hostDisconnected(): void {
    this.host.shadowRoot!.removeEventListener('slotchange', this.onSlotChange);
  }

  private onSlotChange(event: Event): void {
    const slot = event.target as HTMLSlotElement;

    if (
      (this.slotNames.includes('[default]') && !slot.name) ||
      (slot.name && this.slotNames.includes(slot.name))
    ) {
      this.host.requestUpdate();
    }
  }
}
