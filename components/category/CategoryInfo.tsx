import { StyleSheet, Text, View } from "react-native";

type ICategoryInfoProps = {
  categoryName: string | undefined;
  categoryColor: string;
  emoji: string;
};

export const CategoryInfo = ({
  categoryName,
  categoryColor,
  emoji,
}: ICategoryInfoProps) => {
  return (
    <View
      style={[
        styles.categoryContainer,
        { backgroundColor: categoryColor + "40" },
      ]}
    >
      <Text style={styles.categoryText}>
        {emoji} {categoryName}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 3,
    alignSelf: "flex-start",
  },
  categoryText: {
    fontSize: 12,
  },
});
