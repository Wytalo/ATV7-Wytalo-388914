/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import firestore from '@react-native-firebase/firestore';
import { ActivityIndicator, Text, TextInput } from 'react-native';

import MyButton from '../card/MyButton';
import Card from '../card/Card';
import CardItem from '../card/CardItem';

export default class AddUserScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: '',
      adding: false,
    };
  }

  async addUser() {
    try {
      this.setState({ adding: true });
      await firestore().collection('usuarios').add({ nome: this.state.nome });
      this.props.navigation.goBack();
    } catch (err) {
      console.log(err);
    } finally {
      this.setState({ adding: true });
    }
  }

  render() {
    return (
      <Card>
        <CardItem>
          <Text>Add User</Text>
        </CardItem>

        <CardItem>
          <TextInput
            style={{ width: '100%' }}
            onChangeText={(nome) => this.setState({ nome })}
            placeholder="Enter name"
          />
        </CardItem>

        <CardItem>
          {
            this.state.adding
              ?
              <ActivityIndicator style={{ width: '100%' }} size="large" color="#0000ff" />
              :
              <>
                <MyButton title="Add User" onPress={() => this.addUser()} />

                <MyButton
                  title="Back"
                  onPress={() => this.props.navigation.goBack()}
                />
              </>
          }
        </CardItem>
      </Card>
    );
  }
}
