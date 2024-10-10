/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const jrRed = '#990024';
const jrGrey = '#808080';

const backgroundColorLight = '#efefef';
const textColorLight = '#11181C';
const tintColorLight = jrRed;
const inactiveTintColorLight = jrGrey;

const backgroundColorDark = '#151718';
const textColorDark = '#ECEDEE';
const tintColorDark = jrRed; 
const inactiveTintColorDark = jrGrey;

export const Colors = {
  light: {
    textColor: textColorLight, 
    backgroundColor: backgroundColorLight,
    highlightColor: '#fff',
    shadeColor: '#fff',
    tintColor: tintColorLight,
    iconColor: '#687076',
    tabIconDefaultColor: '#687076',
    tabIconSelectedColor: tintColorLight,
    headerColor: '#A1CEDC',
    tabBarBackgroundColor: backgroundColorLight,
    tabBarActiveTintColor: tintColorLight,
    tabBarInactiveTintColor: inactiveTintColorLight,
    headerBackgroundColor: backgroundColorLight,
    headerTextColor: textColorLight,
    headerBackColor: jrRed,
    jrRed: jrRed,
    jrGrey: jrGrey,
  },
  dark: {
    textColor: textColorDark,
    backgroundColor: backgroundColorDark,
    highlightColor: '#000',
    shadeColor: '#3e3e3e',
    tintColor: tintColorDark,
    iconColor: '#9BA1A6',
    tabIconDefaultColor: '#9BA1A6',
    tabIconSelectedColor: tintColorDark,
    headerColor: '#1D3D47',
    tabBarBackgroundColor: backgroundColorDark,
    tabBarActiveTintColor: tintColorDark,
    tabBarInactiveTintColor: inactiveTintColorDark,
    headerBackgroundColor: backgroundColorDark,
    headerTextColor: textColorDark,
    headerBackColor: jrRed,
    jrRed: jrRed,
    jrGrey: jrGrey,
  },
  constant: {
    jrRed: jrRed,
    jrGrey: jrGrey,
  }
};
