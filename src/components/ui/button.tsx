// src/components/ui/button.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps, StyleProp, ViewStyle, TextStyle } from 'react-native';

const styles = StyleSheet.create({
  base: {
    minWidth: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  default: {
    backgroundColor: '#007AFF',
  },
  destructive: {
    backgroundColor: '#FF3B30',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  secondary: {
    backgroundColor: '#8E8E93',
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  sizeDefault: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  sizeSm: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  sizeLg: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  textOutline: {
    color: '#007AFF',
  },
  textDestructive: {
    color: '#FFFFFF',
  },
});

type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost';
type ButtonSize = 'default' | 'sm' | 'lg';

export interface ButtonProps extends Omit<TouchableOpacityProps, 'style'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  children: React.ReactNode;
}

const getVariantStyle = (variant: ButtonVariant = 'default') => {
  return styles[variant] || styles.default;
};

const getSizeStyle = (size: ButtonSize = 'default') => {
  switch (size) {
    case 'sm':
      return styles.sizeSm;
    case 'lg':
      return styles.sizeLg;
    default:
      return styles.sizeDefault;
  }
};

const Button = React.forwardRef<TouchableOpacity, ButtonProps>(
  ({ variant = 'default', size = 'default', children, style, textStyle, ...props }, ref) => {
    const buttonStyles = [
      styles.base,
      getVariantStyle(variant),
      getSizeStyle(size),
      style,
    ];

    const textStyles = [
      styles.text,
      variant === 'outline' && styles.textOutline,
      variant === 'destructive' && styles.textDestructive,
      textStyle,
    ];

    return (
      <TouchableOpacity ref={ref} style={buttonStyles} {...props}>
        <Text style={textStyles}>
          {children}
        </Text>
      </TouchableOpacity>
    );
  }
);

Button.displayName = 'Button';

export { Button };