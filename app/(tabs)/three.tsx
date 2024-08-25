import { H1 } from '@expo/html-elements';
import { Stack } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, View, Text } from 'react-native';
export default function TabThreeScreen() {
  const width = Dimensions.get('window');

  return (
    <>
      <View className="h-screen w-full flex-1 items-center justify-center bg-slate-400">
        <Text>Tab 3</Text>
      </View>
    </>
  );
}
