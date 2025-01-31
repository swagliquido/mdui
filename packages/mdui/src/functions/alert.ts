import { msg } from '@lit/localize';
import isPromise from 'is-promise';
import { $ } from '@mdui/jq/$.js';
import '@mdui/jq/methods/find.js';
import '@mdui/jq/methods/on.js';
import '@mdui/jq/methods/text.js';
import { isUndefined, returnTrue } from '@mdui/jq/shared/helper.js';
import { onLocaleReady, offLocaleReady } from '../internal/localize.js';
import { dialog as openDialog } from './dialog.js';
import type { Dialog } from '../components/dialog.js';

interface Options {
  /**
   * alert 的标题
   */
  headline?: string;

  /**
   * alert 的描述文本
   */
  description?: string;

  /**
   * alert 顶部的 Material Icons 图标名
   */
  icon?: string;

  /**
   * 是否在按下 ESC 键时，关闭 alert
   */
  closeOnEsc?: boolean;

  /**
   * 是否在点击遮罩层时，关闭 alert
   */
  closeOnOverlayClick?: boolean;

  /**
   * 确认按钮的文本
   */
  confirmText?: string;

  /**
   * 队列名称。
   * 默认不启用队列，在多次调用该函数时，将同时显示多个 alert。
   * 可在该参数中传入一个队列名称，具有相同队列名称的 alert 函数，将在上一个 alert 关闭后才打开下一个 alert。
   * `dialog()`、`alert()`、`confirm()`、`prompt()` 这四个函数的队列名称若相同，则也将互相共用同一个队列。
   */
  queue?: string;

  /**
   * 点击确认按钮时的回调函数。
   * 函数参数为 dialog 实例，`this` 也指向 dialog 实例。
   * 默认点击确认按钮后会关闭 alert；若返回值为 `false`，则不关闭 alert；若返回值为 promise，则将在 promise 被 resolve 后，关闭 alert。
   * @param dialog
   */
  onConfirm?: (dialog: Dialog) => void | boolean | Promise<void>;

  /**
   * alert 开始打开时的回调函数。
   * 函数参数为 dialog 实例，`this` 也指向 dialog 实例。
   * @param dialog
   */
  onOpen?: (dialog: Dialog) => void;

  /**
   * alert 打开动画完成时的回调函数。
   * 函数参数为 dialog 实例，`this` 也指向 dialog 实例。
   * @param dialog
   */
  onOpened?: (dialog: Dialog) => void;

  /**
   * alert 开始关闭时的回调函数。
   * 函数参数为 dialog 实例，`this` 也指向 dialog 实例。
   * @param dialog
   */
  onClose?: (dialog: Dialog) => void;

  /**
   * alert 关闭动画完成时的回调函数。
   * 函数参数为 dialog 实例，`this` 也指向 dialog 实例。
   * @param dialog
   */
  onClosed?: (dialog: Dialog) => void;

  /**
   * 点击遮罩层时的回调函数。
   * 函数参数为 dialog 实例，`this` 也指向 dialog 实例。
   * @param dialog
   */
  onOverlayClick?: (dialog: Dialog) => void;
}

const getConfirmText = () => {
  return msg('OK', {
    id: 'functions.alert.confirmText',
  });
};

/**
 * 打开一个 alert，返回 Promise。
 * 如果是通过点击确定按钮关闭，则返回的 promise 会被 resolve；
 * 如果是通过其他方式关闭，则返回的 promise 会被 reject。
 * @param options
 */
export const alert = (options: Options): Promise<void> => {
  const mergedOptions = Object.assign(
    {},
    {
      confirmText: getConfirmText(),
      onConfirm: returnTrue,
    },
    options,
  );
  const properties: (keyof Pick<
    Options,
    | 'headline'
    | 'description'
    | 'icon'
    | 'closeOnEsc'
    | 'closeOnOverlayClick'
    | 'queue'
    | 'onOpen'
    | 'onOpened'
    | 'onClose'
    | 'onClosed'
    | 'onOverlayClick'
  >)[] = [
    'headline',
    'description',
    'icon',
    'closeOnEsc',
    'closeOnOverlayClick',
    'queue',
    'onOpen',
    'onOpened',
    'onClose',
    'onClosed',
    'onOverlayClick',
  ];

  return new Promise((resolve, reject) => {
    let isResolve = false;
    const dialog = openDialog({
      ...Object.fromEntries(
        properties
          .filter((key) => !isUndefined(mergedOptions[key]))
          .map((key) => [key, mergedOptions[key]]),
      ),
      actions: [
        {
          text: mergedOptions.confirmText,
          onClick: (dialog) => {
            const clickResult = mergedOptions.onConfirm.call(dialog, dialog);

            if (isPromise(clickResult)) {
              clickResult.then(() => {
                isResolve = true;
              });
            } else if (clickResult !== false) {
              isResolve = true;
            }

            return clickResult;
          },
        },
      ],
    });

    // 若未传入自定义文案，则监听 locale 变化更新文案
    if (!options.confirmText) {
      onLocaleReady(dialog, () => {
        $(dialog).find('[slot="action"]').text(getConfirmText());
      });
    }

    $(dialog).on('close', (e) => {
      if (e.target === dialog) {
        isResolve ? resolve() : reject();
        offLocaleReady(dialog);
      }
    });
  });
};
