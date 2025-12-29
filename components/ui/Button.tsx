import { Colors } from "@/config/theme";
import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";

type ButtonVariant = "primary" | "secondary";

type Props = {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
};

export const Button: React.FC<Props> = ({
  title,
  onPress,
  variant = "primary",
  disabled = false,
  loading = false,
}) => {
  const variantStyle = VARIANT_STYLES[variant];

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.base,
        variantStyle.container,
        (disabled || loading) && styles.disabled,
        pressed && styles.pressed,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={variantStyle.text.color} />
      ) : (
        <Text style={[styles.text, variantStyle.text]}>{title}</Text>
      )}
    </Pressable>
  );
};

const VARIANT_STYLES = {
  primary: {
    container: {
      backgroundColor: Colors.primary,
    },
    text: {
      color: Colors.white,
    },
  },
  secondary: {
    container: {
      backgroundColor: Colors.secondary,
    },
    text: {
      color: Colors.white,
    },
  },
} as const;

const styles = StyleSheet.create({
  base: {
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",

    // Android
    elevation: 3,

    // iOS
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});
