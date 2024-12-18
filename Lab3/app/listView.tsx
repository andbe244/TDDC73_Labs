import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { fetchRepos } from "./api";

interface Repo {
  id: number;
  name: string;
  full_name: string;
  description: string;
}

interface ListViewProps {
  onSelectRepo: (repo: Repo) => void;
}

const ListView: React.FC<ListViewProps> = ({ onSelectRepo }) => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchRepos()
      .then(setRepos)
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      {/* <Text> HELLO </Text> */}
      <FlatList
        data={repos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => onSelectRepo(item)}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.subtitle}>{item.full_name}</Text>
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
    //borderColor: "#ddd",
  },
  title: { 
    fontSize: 16, 
    color: '#d6d6f5',
    fontWeight: "bold", 
  },
  subtitle: { 
    fontSize: 12, 
    color: "#adadeb",
  },

});

export default ListView;
