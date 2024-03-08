import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Stylesbuttons} from '../Styles/ButtonStyles.ts';

interface ScreenButtonProps {
  text: string;
  fn: () => void;
}

export default function ScreenButton({text, fn,}: ScreenButtonProps) {
  return (
    <TouchableOpacity onPress={fn} style={Stylesbuttons.Button}>
      <Text style={Stylesbuttons.TextButton}>{text}</Text>
    </TouchableOpacity>
  );
}
