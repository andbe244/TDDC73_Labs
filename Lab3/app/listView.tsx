import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { fetchRepos } from "./api";

interface Repo {
  id: number;
  name: string;
  full_name: string;
  description: string;
  forks: { totalCount: number };
  stargazerCount: number;
  language: string;
}

interface ListViewProps {
  onSelectRepo: (repo: Repo) => void;
}

const ListView: React.FC<ListViewProps> = ({ onSelectRepo }) => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [language, setLanguage] = useState<string>("");

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
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Trending GitHub Repositories</Text>
        <Text style={styles.headerSubtitle}>Filter</Text>
        <Text style={styles.headerText}>Language</Text>
        <Picker
          selectedValue={language}
          onValueChange={(itemValue: string) => setLanguage(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="All" value="" />
          <Picker.Item label="JavaScript" value="javascript" />
          <Picker.Item label="Python" value="python" />
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="C++" value="cpp" />
        </Picker>
        <Text style={styles.result}>Result</Text>
      </View>
      
      <FlatList
        data={repos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
        <TouchableOpacity style={styles.item} onPress={() => onSelectRepo(item)}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.language}>{item.language || "Not specified"}</Text>
          </View>
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
    padding: 20, 
    backgroundColor: '#080016',
  },
  header: { 
    padding: 5, 
    marginLeft: 20,
  },
  headerTitle: { 
    color: '#ebebfa',
    fontSize: 28,
    marginBottom: 10,
  },
  result: { 
    color: '#dfff80',
    fontSize: 20,
    marginTop: 6,
    marginBottom: 10,
  },
  headerSubtitle: { 
    color: '#c2c2f0',
    fontSize: 18,
    marginTop: 6,
    marginBottom: 5,
  },
  headerText: {
    fontSize: 12, 
    color: "#9999e6",
    //marginTop: 6,
    marginBottom: 6,
  },
  picker: {
    height: 30,
    color: '#ebebfa',
    width: 150,
    backgroundColor: '#16142d',
    marginBottom: 15,
  },
  item: {
    padding: 20, 
    borderBottomWidth: 1, 
    backgroundColor: '#16142d',
    margin: 4,
    width: 1000,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 5,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { 
    fontSize: 18, 
    color: '#ebebfa',
    fontWeight: "bold", 
  }, 
  subtitle: {
    fontSize: 12,
    color: "#9999e6",
    lineHeight: 22,
  },
  content: { 
    fontSize: 14, 
    color: "#c2c2f0",
    marginTop: 6,
  },
  language: {
    fontSize: 12,
    color: '#dfff80',
    fontWeight: "bold",
    marginTop: 5,
  },
});

export default ListView;
