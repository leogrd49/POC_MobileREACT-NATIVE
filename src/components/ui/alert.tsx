// src/components/ui/alert.tsx
import React from 'react';
import { View, Text, StyleSheet, ViewProps, StyleProp, ViewStyle, TextStyle } from 'react-native';

const styles = StyleSheet.create({
  base: {
    padding: 16,
    borderRadius: 8,
    margin: 8,
  },
  default: {
    backgroundColor: '#E8F0FE',
  },
  destructive: {
    backgroundColor: '#FEE2E2',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#4B5563',
  },
});

type AlertVariant = 'default' | 'destructive';

interface AlertProps extends Omit<ViewProps, 'style'> {
  variant?: AlertVariant;
  style?: StyleProp<ViewStyle>;
}

const Alert = React.forwardRef<View, AlertProps>(
  ({ children, style, variant = 'default', ...props }, ref) => {
    const alertStyles = [
      styles.base,
      styles[variant],
      style,
    ];

    return (
      <View ref={ref} style={alertStyles} {...props}>
        {children}
      </View>
    );
  }
);
Alert.displayName = 'Alert';

interface AlertTextProps extends Omit<React.ComponentProps<typeof Text>, 'style'> {
  style?: StyleProp<TextStyle>;
}

const AlertTitle = React.forwardRef<Text, AlertTextProps>(
  ({ children, style, ...props }, ref) => (
    <Text ref={ref} style={[styles.title, style]} {...props}>
      {children}
    </Text>
  )
);
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef<Text, AlertTextProps>(
  ({ children, style, ...props }, ref) => (
    <Text ref={ref} style={[styles.description, style]} {...props}>
      {children}
    </Text>
  )
);
AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertTitle, AlertDescription };