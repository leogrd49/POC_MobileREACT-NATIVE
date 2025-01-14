// src/components/ui/card.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Card = React.forwardRef<View, React.ComponentProps<typeof View>>(
  ({ children, style, ...props }, ref) => (
    <View ref={ref} style={[styles.card, style]} {...props}>
      {children}
    </View>
  )
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<View, React.ComponentProps<typeof View>>(
  ({ children, style, ...props }, ref) => (
    <View ref={ref} style={[styles.header, style]} {...props}>
      {children}
    </View>
  )
);
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<Text, React.ComponentProps<typeof Text>>(
  ({ children, style, ...props }, ref) => (
    <Text ref={ref} style={[styles.title, style]} {...props}>
      {children}
    </Text>
  )
);
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<Text, React.ComponentProps<typeof Text>>(
  ({ children, style, ...props }, ref) => (
    <Text ref={ref} style={[styles.description, style]} {...props}>
      {children}
    </Text>
  )
);
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<View, React.ComponentProps<typeof View>>(
  ({ children, style, ...props }, ref) => (
    <View ref={ref} style={[styles.content, style]} {...props}>
      {children}
    </View>
  )
);
CardContent.displayName = 'CardContent';

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    margin: 8,
  },
  header: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  content: {
    padding: 16,
  },
});

export { Card, CardHeader, CardTitle, CardDescription, CardContent };