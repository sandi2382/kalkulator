import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Picker,
  Button,
  TextInput,
} from 'react-native';

Promise = require('react-native/Libraries/Promise');

import {Table, Row, Rows} from 'react-native-table-component';

import sleep from 'sleep-promise';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      osnovniSistem: '2',
      neki: '',
      izpis: '',
      stop: false,
      tece: false,

      tableHead: ['BIN', 'OCT', 'DEC', 'DEX'],
      tableData: [],

      itableHead: ['Ime', 'Čas (ms)'],
      itableData: [],

      porabljenCas: '',
      vprasajIme: false,
      ime: '',
    };
  }

  fieldRef = React.createRef();

  onSubmit = () => {
    let {current: field} = this.fieldRef;
  };

  formatText = text => {
    return text.replace(/[^+\d]/g, '');
  };

  pretvoriMedOsnovami(e, a, t) {
    var r = parseInt(e, a);
    // e = e.split(' ').join('');
    if ('' != e) {
      var i = r.toString(t);
      return 'NaN' == i.toString() && (i = 'Neveljaven vnos!'), i;
    }
  }
  pretvori(stevilo, osnova, kam) {
    var e = this.pretvoriMedOsnovami(stevilo, osnova, kam);
    this.setState({
      izpis: e,
    });
  }

  izpis(a, b, c, d) {
    this.state.tableData.push([a, b, c, d]);
  }

  async pretvoriInIzpis(stevilo, osnova) {
    if (osnova == 2) {
      var re = new RegExp('^[0-1]+$', 'i');
      if (!re.test(stevilo)) {
        this.setState({
          izpis: 'Neveljaven vnos!',
          stop: false,
          tece: false,
        });
        return false;
      }
    } else if (osnova == 8) {
      var re = new RegExp('^[0-7]+$', 'i');
      if (!re.test(stevilo)) {
        this.setState({
          izpis: 'Neveljaven vnos!',
          stop: false,
          tece: false,
        });
        return false;
      }
    } else if (osnova == 10) {
      var re = new RegExp('^[0-9]+$', 'i');
      if (!re.test(stevilo)) {
        this.setState({
          izpis: 'Neveljaven vnos!',
          stop: false,
          tece: false,
        });
        return false;
      }
    } else {
      var re = new RegExp('^[0-9A-F]+$', 'i');
      if (!re.test(stevilo)) {
        this.setState({
          izpis: 'Neveljaven vnos!',
          stop: false,
          tece: false,
        });
        return false;
      }
    }
    this.skrijPokaziGumb();
    var zacetniCas = new Date().getTime();
    if (this.state.tableData !== '') {
      this.state.tableData = [];
    }
    for (
      var odstevanje = this.pretvoriMedOsnovami(stevilo, osnova, 10);
      odstevanje > 0;
      odstevanje--
    ) {
      if (this.state.stop === true) {
        this.state.stop = false;
        break;
      }
      await sleep(10);
      var dva = this.pretvoriMedOsnovami(odstevanje, 10, 2);
      // console.warn(odstevanje);
      var osem = this.pretvoriMedOsnovami(odstevanje, 10, 8);
      var deset = this.pretvoriMedOsnovami(odstevanje, 10, 10);
      var sesnajst = this.pretvoriMedOsnovami(odstevanje, 10, 16);
      this.izpis(dva, osem, deset, sesnajst);
      this.setState({
        izpis: '',
      });
    }
    this.skrijPokaziGumb();
    var dva = '';
    var koncniCas = new Date().getTime();
    var porabljenCas = koncniCas - zacetniCas;
    this.setState({
      izpis: 'Porabljen čas: ' + porabljenCas + ' milisekund',
      stop: false,
      tece: false,
      porabljenCas: porabljenCas,
      vprasajIme: true,
    });
  }

  skrijPokaziGumb() {
    // if (this.state.tece === false) {
    //   this.setState({ tece: true, });
    // } else {
    //   // this.setState({ tece: false, });
    // }
  }

  stopKlik() {
    this.setState({
      stop: true,
      tece: false,
    });
  }

  startKlik() {
    this.setState({
      stop: false,
      tece: true,
    });
  }

  pocisti() {
    this.setState({
      osnovniSistem: '2',
      neki: '',
      izpis: '',
      stop: false,
      tece: false,

      tableHead: ['BIN', 'OCT', 'DEC', 'DEX'],
      tableData: [],

      rezultati: [],
      imena: [],
      porabljenCas: '',
      vprasajIme: false,
      ime: '',
    });
  }

  shraniPodatke() {
    var ime = this.state.ime;
    var cas = this.state.porabljenCas;
    // this.state.imena.push(ime);
    // this.state.rezultati.push(cas);
    this.state.itableData.push([ime, cas]);
    this.setState({
      ime: '',
      vprasajIme: false,
      porabljenCas: '',
      izpis: 'Shranjeno!',
    });
  }

  render() {
    return (
      <SafeAreaView>
        <View style={styles.flexWrapper}>
          <View style={styles.viewSelekt}>
            <Text>Osnova: </Text>
            <Picker
              selectedValue={this.state.osnovniSistem}
              // style={styles.flexPickerItem}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({osnovniSistem: itemValue})
              }>
              <Picker.Item label="Osnova 2" value="2" />
              <Picker.Item label="Osnova 8" value="8" />
              <Picker.Item label="Osnova 10" value="10" />
              <Picker.Item label="Osnova 16" value="16" />
            </Picker>
          </View>
          <View style={styles.vju1}>
            <TextInput
              style={styles.tekstinput1}
              placeholder="Vnesite število"
              onChangeText={(itemValue, itemIndex) =>
                this.setState({neki: itemValue})
              }
              value={this.state.neki}
            />
          </View>
          <View style={styles.vju2}>
            <Text>{this.state.izpis}</Text>
          </View>
          <View style={styles.vju3}>
            {!this.state.tece ? (
              <Button
                title="Start"
                style={{height: 80}}
                onPress={() => {
                  // Alert.alert(this.state.osnovniSistem + " : " + this.state.neki);
                  this.startKlik();
                  this.pretvoriInIzpis(
                    this.state.neki,
                    this.state.osnovniSistem,
                  );
                  // Alert.alert(this.state.izpis);
                }}
              />
            ) : (
              <Button
                title="Stop"
                style={{height: 80}}
                onPress={() => {
                  this.stopKlik();
                }}
              />
            )}
            {!this.state.tece ? (
              <Button
                title="Počisti"
                style={{height: 80}}
                onPress={() => {
                  this.pocisti();
                }}
              />
            ) : null}
            {this.state.vprasajIme ? (
              <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                placeholder="Vnesite ime"
                onChangeText={(itemValue, itemIndex) =>
                  this.setState({ime: itemValue})
                }
                value={this.state.ime}
              />
            ) : null}
            {this.state.vprasajIme ? (
              <Button
                title="Shrani"
                style={{height: 80}}
                onPress={() => {
                  this.shraniPodatke();
                }}
              />
            ) : null}
          </View>
          <ScrollView style={{backgroundColor: '#fff', height: 300}}>
            <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
              <Row
                data={this.state.tableHead}
                style={styles.head}
                textStyle={styles.text}
              />
              <Rows data={this.state.tableData} textStyle={styles.text} />
            </Table>
          </ScrollView>
          <ScrollView style={{backgroundColor: '#eee', height: 140}}>
            <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
              <Row
                data={this.state.itableHead}
                style={styles.head}
                textStyle={styles.text}
              />
              <Rows data={this.state.itableData} textStyle={styles.text} />
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
  viewSelekt: {
    backgroundColor: '#eeff96',
  },
  vju1: {
    backgroundColor: '#eafa00',
  },
  vju2: {
    backgroundColor: '#eafa00',
  },
  vju3: {
    backgroundColor: '#eeffff',
  },
  tekstinput1: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
  head: {
    height: 40,
    backgroundColor: '#f1f8ff',
  },
  text: {
    margin: 6,
  },
});

export default App;
