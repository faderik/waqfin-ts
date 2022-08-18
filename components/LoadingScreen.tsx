import { ActivityIndicator, StyleSheet, View as DefaultView } from 'react-native';
import { Text, View } from './Themed';

type LoadingProps = {
  color?: string;
  background: string;
};

export default function LoadingScreen(props: DefaultView['props'] & LoadingProps) {
  return (
    <View style={[props.style, styles.wrapper, { backgroundColor: props.background }]}>
      <ActivityIndicator size="large" color={props.color} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
