import { View, Text, StyleSheet } from 'react-native';
import Spline from '@splinetool/react-spline';
import CustomButton from '../components/CustomButton';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <CustomButton
        title="Click Me"
        onPress={() => alert('Button Pressed!')}
        backgroundColor="#28a745"
        textColor="#ffffff"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
