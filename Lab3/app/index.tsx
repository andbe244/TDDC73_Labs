import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import ListView from "./listView";
import DetailView from "./detailView";

interface Repo {
  id: number;
  name: string;
  full_name: string;
  description: string;
  created_at: string; // Added
  last_fetched: string; // Added
}

export default function Index() {
  const [selectedRepo, setSelectedRepo] = useState<Repo | null>(null);
  const [language, setLanguage] = useState<string>("javascript"); // Default language

  return (
    <View style={styles.container}>
      {selectedRepo ? (
        // Pass the selectedRepo and onBack callback to DetailView
        <DetailView repo={selectedRepo} onBack={() => setSelectedRepo(null)} />
      ) : (
        // Pass the onSelectRepo and language props to ListView
        <ListView
          language={language} // Provide the required language prop
          onSelectRepo={(repo) => {
            const now = new Date().toISOString(); // Add "last_fetched" timestamp
            setSelectedRepo({ ...repo, last_fetched: now });
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
