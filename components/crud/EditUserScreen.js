/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import firestore from '@react-native-firebase/firestore';
import { ActivityIndicator, Text, TextInput } from 'react-native';

import MyButton from '../card/MyButton';
import Card from '../card/Card';
import CardItem from '../card/CardItem';

export default class EditUserScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.route.params.user,
      updating: false,
    };
  }

  async updateUser() {
    try {
      this.setState({ updating: true });

      await firestore().collection('usuarios').doc(this.state.user.id).update({ nome: this.state.user.nome });
      this.props.navigation.goBack();
    } catch (err) {
      console.log(err);
    } finally {
      this.setState({ updating: true });
    }
  }

  render() {
    return (
      <Card>
        <CardItem>
          <Text>Edit User</Text>
        </CardItem>

        <CardItem>
          <TextInput
            style={{ width: '100%' }}
            onChangeText={(nome) => this.setState({ user: { ...this.state.user, nome } })}
            value={this.state.user.nome}
          />
        </CardItem>

        <CardItem>
          {
            this.state.updating
              ?
              <ActivityIndicator style={{ width: '100%' }} size="large" color="#0000ff" />
              :
              <>
                <MyButton title="Update" onPress={() => this.updateUser()} />

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
