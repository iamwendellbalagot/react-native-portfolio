import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import Navigation from './container/Navigation/Navigation';
import Login from './Examples/Login/Login';
import Stopwatch from './Examples/Stopwatch/Stopwatch';
import GroceryApp from './Examples/Grocery/Grocery';

const Main = () => {
  return (
    <GroceryApp />
  );
}

export default Main;