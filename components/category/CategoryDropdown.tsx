import { Colors } from "@/config/theme";
import { Category } from "@/types";
import { Picker } from "@react-native-picker/picker";
import { StyleSheet, View } from "react-native";

type Props = {
  value: number;
  onChange: (v: number) => void;
  categories: Category[];
};

export const CategoryDropdown = ({ value, onChange, categories }: Props) => {
  return (
    <View style={styles.container}>
      <Picker selectedValue={value} onValueChange={onChange}>
        {categories.map((cat) => (
          <Picker.Item key={cat.id} label={cat.name} value={cat.id} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
});
