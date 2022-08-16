/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { Text as DefaultText, View as DefaultView, Dimensions } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

const width = Dimensions.get('window').width;

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  // const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  let sty: any = style;
  let fsize = 360 / sty.fontSize;
  // console.log(fsize ? { ...sty, fontSize: fsize } : { ...sty });

  return (
    // <DefaultText style={[{ color: '#000' }, style]} {...otherProps} />
    <DefaultText
      style={[{ color: '#000' }, fsize ? { ...sty, fontSize: width / fsize } : { ...sty }]}
      {...otherProps}
    />
  );
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  // const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultView style={[{ backgroundColor: '#FFF' }, style]} {...otherProps} />;
}
