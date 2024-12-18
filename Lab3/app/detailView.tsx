import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

interface Repo {
  id: number;
  name: string;
  full_name: string;
  description: string;
}

interface DetailViewProps {
  repo: Repo;
  onBack: () => void;
}

const DetailView: React.FC<DetailViewProps> = ({ repo, onBack }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{repo.name}</Text>
      <Text style={styles.subtitle}>Full Name: {repo.full_name}</Text>
      <Text style={styles.description}>{repo.description || "No description available."}</Text>
      <Button title="Back to List" onPress={onBack} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 24, fontWeight: "bold" },
  subtitle: { fontSize: 16, marginVertical: 10 },
  description: { fontSize: 14, color: "#555" },
});

export default DetailView;
