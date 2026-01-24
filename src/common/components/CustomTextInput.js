import { forwardRef, useImperativeHandle, useRef } from 'react';
import { Text } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { TextInput } from 'react-native-paper';

const CustomTextInput = forwardRef(
  ({ label, readonly = false, asteriskColor = '#68AF00', style, theme, mode = "outlined", ...props }, ref) => {
    const animRef = useRef(null);
    const textInputRef = useRef(null);
    const parts = label.split('*');
    const errorColor = theme?.colors?.outline === '#FF6E64';

    useImperativeHandle(ref, () => ({
      shake: (duration = 600) => {
        if (!readonly && animRef.current) {
          animRef.current.shake(duration);
        }
      },
      focus: () => {
        if (!readonly && textInputRef.current) {
          textInputRef.current.focus()
        }
      }
    }));

    return (
      <Animatable.View ref={animRef}>
        <TextInput
          ref={textInputRef}
          {...props}
          mode={mode}
          dense
          editable={!readonly}
          pointerEvents={readonly ? 'none' : 'auto'}
          contentStyle={mode === 'flat' ? { paddingVertical: 0 } : undefined}
          outlineColor={
            mode === 'outlined'
              ? readonly
                ? '#E5E5E5'
                : theme?.colors?.outline || '#E5E5E5'
              : undefined
          }
          activeOutlineColor={
            mode === 'outlined'
              ? readonly
                ? '#E5E5E5'
                : errorColor
                  ? '#FF6E64'
                  : theme?.colors?.primary || '#90D400'
              : undefined
          }
          textColor={readonly ? "#7A7A7A" : undefined}
          theme={{
            ...theme,
            colors: {
              ...theme?.colors,
              onSurfaceVariant: "#666666",
              primary: theme?.colors?.primary || "#90D400",
            },
          }}
          style={[
            {
              margin: 0
            },
            style,
            readonly && {
              backgroundColor: '#F5F2F2',
              borderRadius: 10,
            },
          ]}
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
