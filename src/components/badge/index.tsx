import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

import { prefixCls } from '../../utils';

export type SizeProps = 'sm' | 'lg';

export interface BadegProps {
  /**
   * 颜色
   * @description 设置徽章的颜色
   */
  color: string;

  /**
   * 是否为点状徽章
   * @description 设置为点状徽章
   * @default false
   */
  dot?: boolean;

  /**
   * 显示的最大数字
   * @description 设置最大显示数字
   * @default 99
   */
  max?: number;

  /**
   * 内容
   * @description 设置徽章内容，可以是 React 元素或数字
   */
  content?: React.ReactElement | number;

  /**
   * 尺寸
   * @description 设置徽章的尺寸
   */
  size?: SizeProps;

  /**
   * 是否固定位置
   * @description 设置徽章位置是否固定
   */
  fixed?: boolean;

  /**
   * 样式
   * @description 自定义徽章样式
   */
  style?: React.CSSProperties;

  /**
   * 子元素
   * @description 包裹的子元素
   */
  children: React.ReactNode;
}

const BadgePrefixCls = prefixCls + '-badge';

const Badge: React.FC<BadegProps> = (props) => {
  let {
    children,
    color,
    dot = false,
    max = 99,
    content,
    size,
    fixed,
    style,
    ...restProps
  } = props;

  const styleObj = {
    backgroundColor: color,
    ...style,
  };

  if (content) {
    content = Number(content) ? Number(content) : content;
  }

  const renderContent = () => {
    if (dot) return '';
    return typeof content === 'number' && content > max ? `${max}+` : content;
  };

  const dotWrapCls = classNames(`${BadgePrefixCls}-wrap`);

  const dotCls = classNames(BadgePrefixCls, {
    [`${BadgePrefixCls}-dot-large`]: dot && size === 'lg',
    [`${BadgePrefixCls}-fixed`]: typeof content === 'number' || fixed || dot,
    [`${BadgePrefixCls}-dot`]: dot,
  });

  return (
    <div className={dotWrapCls}>
      {children}
      {(content || dot) && (
        <sup className={dotCls} style={{ ...styleObj }} {...restProps}>
          {renderContent()}
        </sup>
      )}
    </div>
  );
};

export default Badge;
