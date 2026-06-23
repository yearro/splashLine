import Colors from '@/constants/Colors'
import { StyleSheet, View, ViewProps } from 'react-native'
type iProps = ViewProps

const GeneralView = ({ style, ...props }: iProps) => {
  return (
    <View style={[style, styles.containerSection]} {...props} />
  )
}

export default GeneralView

const styles = StyleSheet.create({
  containerSection: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 10,
    backgroundColor: Colors.background,
  }
})