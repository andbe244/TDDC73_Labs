import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity, StyleSheet } from "react-native";

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
    const fetchDetails = async () => {
      const branchesUrl = `https://api.github.com/repos/${repo.full_name}/branches`;
      const commitsUrl = `https://api.github.com/repos/${repo.full_name}/commits`;
      try {
        const [branchesRes, commitsRes] = await Promise.all([
          fetch(branchesUrl),
          fetch(commitsUrl)
        ]);

        const branches = await branchesRes.json();
        const commits = await commitsRes.json();

        setDetails({
          branchesCount: branches.length || 0,
          commitsCount: commits.length || 0
        });
      } catch (error) {
        console.error("Error fetching details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [repo]);

  if (loading || !details) {
    return <ActivityIndicator size="large" color="#007AFF" />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.item}>
        <Text style={styles.title}>{repo.name}</Text>
        <Text style={styles.subtitle}>Full Name:</Text>
        <Text style={styles.content}>{repo.full_name}</Text>
        <Text style={styles.subtitle}>Description:</Text>
        <Text style={styles.content}>{repo.description || "No description available."}</Text>
        <Text style={styles.subtitle}>Number of Branches:</Text>
        <Text style={styles.content}>{details.branchesCount}</Text>
        <Text style={styles.subtitle}>Number of Commits:</Text>
        <Text style={styles.content}>{details.commitsCount}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={onBack} style={styles.button}>
          <Text style={styles.buttonText}>Back to List</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#080016",
  },
  item: {
    backgroundColor: "#16142d",
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
    color: "#d6d6f5",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#d6d6f5",
    marginTop: 15,
    marginBottom: 5,
  },
  content: {
    fontSize: 16,
    color: "#adadeb",
    lineHeight: 22,
  },
  buttonContainer: {
    marginTop: 20,
    alignSelf: "center",
    width: 120,
  },
  button: {
    borderRadius: 8,
    width: 120,
    height: 30,
    backgroundColor: "#adadeb",
  },
  buttonText: {
    textAlign: "center",
    fontSize: 16,
    paddingTop: 5,
  },
});

export default DetailView;
