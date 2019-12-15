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

Promise = require('react-native/Libraries/Promise');

import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

import {YellowBox} from 'react-native';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: '2',
      neki: 'a',
      izpis: '??',

      tableHead: ['BIN', 'OCT', 'DEC', 'DEX'],
      tableData: [
      ],
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
    if ('' != e) {
      var i = r.toString(t);
      return 'NaN' == i.toString() && (i = 'Invalid Input'), i;
    }
  }
  pretvori(stevilo, osnova, kam) {
    var e = this.pretvoriMedOsnovami(stevilo, osnova, kam);
    this.setState({
      izpis: e,
    });
  }
  pretvoriInIzpis(stevilo, osnova) {
    for (var odstevanje = this.pretvoriMedOsnovami(stevilo, osnova, 10); odstevanje >= 0; odstevanje--) {
      var dva = this.pretvoriMedOsnovami(odstevanje, 10, 2);
      console.warn(odstevanje);
      var osem = this.pretvoriMedOsnovami(odstevanje, 10, 8);
      var deset = this.pretvoriMedOsnovami(odstevanje, 10, 10);
      var sesnajst = this.pretvoriMedOsnovami(odstevanje, 10, 16);
      this.state.tableData.push([dva, osem, deset, sesnajst]);
    }
    var dva = "a";
    this.setState({
      izpis: dva,
    });
  }

  render() {
    return (
      <SafeAreaView>
        <View style={styles.flexWrapper}>
          <View style={{ backgroundColor: '#eeff96' }}>
            <Text>Osnova: </Text>
            <Picker
              selectedValue={this.state.language}
              // style={styles.flexPickerItem}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({language: itemValue})
              }>
              <Picker.Item label="Osnova 2" value="2" />
              <Picker.Item label="Osnova 8" value="8" />
              <Picker.Item label="Osnova 10" value="10" />
              <Picker.Item label="Osnova 16" value="16" />
            </Picker>
          </View>
          <View style={{ backgroundColor: '#eeffff' }}>
            <Button
              title="Start"
              style={{height: 80}}
              onPress={() => {
                // Alert.alert(this.state.language + " : " + this.state.neki);
                this.pretvoriInIzpis(this.state.neki, this.state.language);
                // Alert.alert(this.state.izpis);
              }}
            />
            <Button
              title="Stop"
              style={{height: 80}}
              onPress={() => {
                
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
          <ScrollView style={{ backgroundColor: '#fff', height: 300}}>
            <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
              <Row data={this.state.tableHead} style={styles.head} textStyle={styles.text}/>
              <Rows data={this.state.tableData} textStyle={styles.text}/>
            </Table>
          </ScrollView>
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
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 }
});

export default App;
