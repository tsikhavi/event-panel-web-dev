import { customRender } from '../../../test-utils';

import Typography, { Colors, MapVariant, TypographyProps, Variant } from './Typography';

const text = 'Hello, Event Panel!';

const generateProps = (props: Partial<TypographyProps> = {}): TypographyProps => ({
  children: text,
  ...props,
});

describe('Typography', () => {
  it('should renders default', () => {
    const { getByText } = customRender(<Typography {...generateProps()} />);
    const element = getByText(text);

    expect(element.tagName.toLowerCase()).toBe('p');
    expect(element.className).toContain('bodyM');
  });

  it('should renders with className', () => {
    const className = 'class-name';
    const { getByText } = customRender(<Typography {...generateProps({ className })} />);
    const element = getByText(text);

    expect(element.className).toContain(className);
  });

  it('should renders with centerAlign', () => {
    const { getByText } = customRender(<Typography {...generateProps({ centerAlign: true })} />);

    expect(getByText(text).className).toContain('centerAlign');
  });

  it.each<[Variant, MapVariant]>([
    ['h1', 'h1'],
    ['h2', 'h2'],
    ['h3', 'h3'],
    ['bodyXL', 'p'],
    ['bodyL', 'p'],
    ['bodyM', 'p'],
    ['bodyS', 'p'],
    ['bodyXS', 'p'],
    ['bodyXXS', 'p'],
    ['inherit', 'span'],
  ])('should renders variant: %s', (variant, tag) => {
    const { getByText } = customRender(<Typography {...generateProps({ variant })} />);
    const element = getByText(text);

    expect(element.tagName.toLowerCase()).toBe(tag);
    expect(element.className).toContain(variant);
  });

  it.each<Colors>(['primary', 'secondary'])('should renders with color: %s', (color) => {
    const { getByText } = customRender(<Typography {...generateProps({ color })} />);
    const element = getByText(text);

    expect(element.className).toContain(color);
  });
});
