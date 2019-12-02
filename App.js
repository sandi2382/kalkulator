import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Platform,
} from 'react-native';

import {
  TextField,
  FilledTextField,
  OutlinedTextField,
} from 'react-native-material-textfield';

class App extends Component {
  fieldRef = React.createRef();

  onSubmit = () => {
    let {current: field} = this.fieldRef;

    console.log(field.value());
  };

  formatText = text => {
    return text.replace(/[^+\d]/g, '');
  };

  render() {
    return (
      <SafeAreaView>
        <View style={styles.flexWrapper}>
          <View style={styles.flexItemDefault}>
            <Text>Omg kk kul</Text>
          </View>
          <View style={styles.flexItemDefault} />
          <View style={styles.flexItemDefault} />
          <View style={styles.flexItemDefault} />
          <View style={styles.flexItemDefault} />
          <View style={styles.flexItemDefault} />
        </View>
      </SafeAreaView>
    );
  }
}

// const App: () => React$Node = () => {
//   return (
//     <>
//       <StatusBar barStyle="dark-content" />
//       <SafeAreaView>
//         <ScrollView
//           contentInsetAdjustmentBehavior="automatic"
//           style={styles.scrollView}>
//           <Text>Neki neki? =)</Text>
//         </ScrollView>
//       </SafeAreaView>
//     </>
//   );
// };

const styles = StyleSheet.create({
  engine: {
    position: 'absolute',
    right: 0,
  },
  flexWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'stretch',
  },
  flexItemDefault: {
    height: 50,
    backgroundColor: 'skyblue',
    borderWidth: 1,
    borderColor: '#000',
  },
});

export default App;
