/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';

import firestore from '@react-native-firebase/firestore';

import Card from '../card/Card';
import CardItem from '../card/CardItem';
import MyButton from '../card/MyButton';

import { useIsFocused } from '@react-navigation/native';

const ListUserScren = ({ navigation }) => {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();

  const loadUsers = async () => {
    try {
      setLoading(true);

      const { _docs } = await firestore().collection('usuarios').get();

      let arr = [];

      _docs.forEach((doc) => {
        arr.push({ ...doc.data(), id: doc.id });
      });

      setUsers(arr);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [isFocused]);

  const deleteUser = async (id) => {
    await firestore().collection('usuarios').doc(id).delete();
    loadUsers();
  };

  const renderUsers = () => {
    return (
      <FlatList
        data={users}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-start',
              }}>

              <View style={{ flex: 1.5, justifyContent: 'center' }}>
                <Text style={{ fontSize: 18 }}>{item.nome}</Text>
              </View>

              <View style={{ flex: 1 }}>
                <MyButton
                  title="Edit"
                  onPress={() =>
                    navigation.navigate('EditUserScreen', {
                      user: item,
                    })
                  }
                />
              </View>

              <View style={{ flex: 1 }}>
                <MyButton title="Delete" onPress={() => deleteUser(item.id)} />
              </View>
            </View>
          );
        }}
        keyExtractor={(item, index) => item + index}
      />
    );
  };


  return (
    <Card>
      <CardItem style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
          ..::List Users::..
          </Text>
      </CardItem>

      <CardItem>
        {
          loading
            ?
            <ActivityIndicator style={{ width: '100%' }} size="large" color="#0000ff" />
            :
            users.length === 0
              ? <Text style={{ textAlign: 'center', width: '100%' }}>No users found</Text>
              :
              renderUsers()
        }
      </CardItem>

      <CardItem>
        <MyButton
          title="Add User"
          onPress={() => navigation.navigate('AddUserScreen')}
        />
      </CardItem>
    </Card>
  );

};

export default ListUserScren;
