import { getCategoryColor, getCategoryEmoji } from "@/helpers/categoryHelper";
import { StyleSheet, Text, View } from "react-native";

type ICategoryInfoProps = {
  categoryName: string | undefined;
};

export const CategoryInfo = ({ categoryName }: ICategoryInfoProps) => {
  const categoryColor = getCategoryColor(categoryName);
  const emoji = getCategoryEmoji(categoryName);

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
