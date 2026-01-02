import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface Props {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
}

export const Button = ({ title, onPress, variant = 'primary' }: Props) => (
  <TouchableOpacity 
    style={[styles.btn, { backgroundColor: variant === 'primary' ? '#0055FF' : '#00CC88' }]} 
    onPress={onPress}
  >
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  btn: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 8,
  },
  text: { color: '#FFF', fontWeight: '600', fontSize: 16, fontFamily: 'Inter' }
});
