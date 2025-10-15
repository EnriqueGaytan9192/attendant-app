import { forwardRef, useImperativeHandle, useRef } from 'react';
import { Text } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { TextInput } from 'react-native-paper';

const CustomTextInput = forwardRef(({ label, asteriskColor = '#68AF00', ...props }, ref) => {
  const animRef = useRef(null);
  const textInputRef = useRef(null);
  const parts = label.split('*');

  useImperativeHandle(ref, () => ({
    shake: (duration = 600) => {
      if (animRef.current) {
        animRef.current.shake(duration);
      }
    },
    focus: () => {
      if (textInputRef?.current) {
        textInputRef.current.focus()
      }
    }
  }));

  return (
    <Animatable.View ref={animRef}>
      <TextInput
        ref={textInputRef}
        {...props}
        label={
          parts.length > 1 ? (
            <Text>
              {parts[0]}
              <Text style={{ color: asteriskColor }}>*</Text>
              {parts[1]}
            </Text>
          ) : (
            label
          )
        }
      />
    </Animatable.View>
  );
});

export default CustomTextInput;
