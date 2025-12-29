import { CategoryColors, CategoryEmojis } from "@/config/constants";

export const getCategoryColor = (name: string | undefined): string => {
  if (!name) {
    return CategoryColors["Default"];
  }

  const foundKey = Object.keys(CategoryColors).find(
    (key) => key.toLowerCase() === name.toLowerCase()
  );

  return foundKey ? CategoryColors[foundKey] : CategoryColors["Default"];
};

export const getCategoryEmoji = (name: string | undefined): string => {
  if (!name) {
    return CategoryEmojis["Default"];
  }

  const foundKey = Object.keys(CategoryEmojis).find(
    (key) => key.toLowerCase() === name.toLowerCase()
  );

  return foundKey ? CategoryEmojis[foundKey] : CategoryEmojis["Default"];
};
