import { DBConfig } from "@/config/dbConfig";
import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { Suspense } from "react";

export default function RootLayout() {
  return (
    <Suspense>
      <SQLiteProvider
        databaseName={DBConfig.DBName}
        assetSource={{ assetId: DBConfig.DBAssetPath }}
        useSuspense
      >
        <Stack>
          <Stack.Screen
            name="home"
            options={{
              headerTitle: "Budget Buddy",
              headerTitleAlign: "center",
              headerLargeTitleEnabled: true,
            }}
          />
        </Stack>
      </SQLiteProvider>
    </Suspense>
  );
}
