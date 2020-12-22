import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import Navigation from './container/Navigation/Navigation';
import Login from './Examples/Login/Login';
import Stopwatch from './Examples/Stopwatch/Stopwatch';
import GroceryApp from './Examples/Grocery/Grocery';
import MemApp from './Examples/MemoryTrainingApp/MemApp';

const Main = () => {
  return (
    <MemApp />
  );
}

export default Main;