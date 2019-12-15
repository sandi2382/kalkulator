import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Platform,
  Picker,
  Button,
  Alert,
  TextInput,
} from 'react-native';

import {
  TextField,
  FilledTextField,
  OutlinedTextField,
} from 'react-native-material-textfield';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: '2',
      neki: 'a',
      izpis: '',
    };
  }

  fieldRef = React.createRef();

  onSubmit = () => {
    let {current: field} = this.fieldRef;

    console.log(field.value());
  };

  formatText = text => {
    return text.replace(/[^+\d]/g, '');
  };

  pretvoriMedOsnovami(e, a, t) {
    var r = parseInt(e, a);
    if ('' != e.trim()) {
      var i = r.toString(t);
      return 'NaN' == i.toString() && (i = 'Invalid Input'), i;
    }
  }

  render() {
    return (
      <SafeAreaView>
        <View style={styles.flexWrapper}>
          <View style={{ backgroundColor: '#eeff96' }}>
            <Picker
              selectedValue={this.state.language}
              // style={styles.flexPickerItem}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({language: itemValue})
              }>
              <Picker.Item label="Osnova 2" value="2" />
              <Picker.Item label="Osnova 3" value="3" />
              <Picker.Item label="Osnova 4" value="4" />
              <Picker.Item label="Osnova 5" value="5" />
              <Picker.Item label="Osnova 6" value="6" />
              <Picker.Item label="Osnova 7" value="7" />
              <Picker.Item label="Osnova 8" value="8" />
              <Picker.Item label="Osnova 9" value="9" />
              <Picker.Item label="Osnova 10" value="10" />
              <Picker.Item label="Osnova 11" value="11" />
              <Picker.Item label="Osnova 12" value="12" />
              <Picker.Item label="Osnova 14" value="13" />
              <Picker.Item label="Osnova 13" value="14" />
              <Picker.Item label="Osnova 15" value="15" />
              <Picker.Item label="Osnova 16" value="16" />
              <Picker.Item label="Osnova 17" value="17" />
              <Picker.Item label="Osnova 18" value="18" />
              <Picker.Item label="Osnova 19" value="19" />
              <Picker.Item label="Osnova 20" value="20" />
            </Picker>
          </View>
          <View style={{ backgroundColor: '#eeffff' }}>
            <Button
              title="Press me"
              style={{height: 80}}
              onPress={() => {
                Alert.alert(this.state.language + " : " + this.state.neki);
              }}
            />
          </View>
          <View style={{ backgroundColor: '#eafa00' }}>
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              onChangeText={(itemValue, itemIndex) =>
                this.setState({neki: itemValue})
              }
            />
          </View>
          <View style={{ backgroundColor: '#eafa00' }}>
            <Text>{this.state.izpis}</Text>
          </View>
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
    // display: 'flex',
    // flexWrap: 'wrap',
    // flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'stretch',
    minHeight: 40,
    borderWidth: 1,
    borderStyle: 'solid',
    padding: 5,
    margin: 5,
    backgroundColor: '#58c09e',
  },
  // flexItemDefault: {
  //   height: 50,
  //   // backgroundColor: 'skyblue',
  //   borderWidth: 1,
  //   borderColor: '#aca',
  // },
  // flexPickerItem: {
  //   // height: 500,
  //   // width: 100,
  //   // marginLeft: 250,
  //   borderWidth: 1,
  //   borderColor: 'blue',
  //   // flex: '1 0 auto',
  //   flex: 2,
  // },
  // flexItem: {
  //   height: 50,
  //   backgroundColor: 'skyblue',
  //   borderWidth: 1,
  //   borderColor: 'red',
  // },
});

export default App;
