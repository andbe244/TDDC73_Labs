import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import ListView from "./listView";
import DetailView from "./detailView";

interface Repo {
  id: number;
  name: string;
  full_name: string;
  description: string;
}

export default function Index() {
  const [selectedRepo, setSelectedRepo] = useState<Repo | null>(null);

  return (
    <View style={styles.container}>
      {selectedRepo ? (
        <DetailView repo={selectedRepo} onBack={() => setSelectedRepo(null)} />
      ) : (
        <ListView onSelectRepo={(repo) => setSelectedRepo(repo)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
