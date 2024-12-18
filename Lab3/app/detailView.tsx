import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { fetchRepoDetails } from "./api";

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
  const [details, setDetails] = useState<{ branchesCount: number; commitsCount: number } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchRepoDetails(repo.full_name)
      .then(setDetails)
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [repo]);

  if (loading || !details) {
    return <ActivityIndicator size="large" color="#007AFF" />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{repo.name}</Text>
        <Text style={styles.subtitle}>Full Name:</Text>
        <Text style={styles.content}>{repo.full_name}</Text>

        <Text style={styles.subtitle}>Description:</Text>
        <Text style={styles.content}>
          {repo.description || "No description available."}
        </Text>

        <Text style={styles.subtitle}>Number of Branches:</Text>
        <Text style={styles.content}>{details.branchesCount}</Text>

        <Text style={styles.subtitle}>Number of Commits:</Text>
        <Text style={styles.content}>{details.commitsCount}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Back to List" onPress={onBack} color="#007AFF" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f7f9fc",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333333",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#007AFF",
    marginTop: 15,
    marginBottom: 5,
  },
  content: {
    fontSize: 16,
    color: "#555555",
    lineHeight: 22,
  },
  buttonContainer: {
    marginTop: 20,
    alignSelf: "center",
    width: "60%",
  },
});

export default DetailView;
