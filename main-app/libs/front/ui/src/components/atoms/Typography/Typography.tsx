import React, { forwardRef } from 'react';

import useStyles from './Typography.styles';

export type Variant = 'h1' | 'h2' | 'h3' | 'bodyXL' | 'bodyL' | 'bodyM' | 'bodyS' | 'bodyXS' | 'bodyXXS' | 'inherit';
export type MapVariant = 'h1' | 'h2' | 'h3' | 'p' | 'span';
export type Colors = 'primary' | 'secondary';

export type TypographyProps = {
  children: React.ReactNode;
} & Partial<{
  color: Colors;
  variant: Variant;
  className: string;
  centerAlign: boolean;
}>;

const mapVariantToTag: Record<Variant, MapVariant> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  bodyXL: 'p',
  bodyL: 'p',
  bodyM: 'p',
  bodyS: 'p',
  bodyXS: 'p',
  bodyXXS: 'p',
  inherit: 'span',
};

const Typography = forwardRef<HTMLElement, TypographyProps>(
  ({ className, children, centerAlign, color = 'primary', variant = 'bodyM', ...rest }, ref) => {
    const { classes, cx } = useStyles();

    const Tag = mapVariantToTag[variant] as React.ElementType;

    const combinedClasses = cx(classes.root, classes[color], classes[variant], className, {
      [classes.centerAlign]: Boolean(centerAlign),
    });

    return (
      <Tag {...rest} className={combinedClasses} ref={ref}>
        {children}
      </Tag>
    );
  }
);

export default Typography;
