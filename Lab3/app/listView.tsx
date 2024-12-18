import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { fetchRepos } from "./api";


interface Repo {
  id: number;
  name: string;
  full_name: string;
  description: string;
  forks: { totalCount: number };
  stargazerCount: number;
}

interface ListViewProps {
  onSelectRepo: (repo: Repo) => void;
  language: string;
}

const ListView: React.FC<ListViewProps> = ({ onSelectRepo, language }) => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    fetchRepos(language)
      .then((data) => setRepos(data.items || []))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [language]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={repos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => onSelectRepo(item)}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.subtitle}>{item.full_name}</Text>
            <Text style={styles.content}>{item.description || "No description available."}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 10, 
    backgroundColor: '#080016',
  },
  item: {
    padding: 10, 
    borderBottomWidth: 1, 
    backgroundColor: '#16142d',
    margin: 4,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 5,
  },
  title: { 
    fontSize: 18, 
    color: '#ebebfa',
    fontWeight: "bold", 
  },
  subtitle: { 
    fontSize: 14, 
    color: "#c2c2f0",
  },
  content: {
    fontSize: 12,
    marginTop: 6,
    color: "#9999e6",
    lineHeight: 22,
  },
});

export default ListView;
