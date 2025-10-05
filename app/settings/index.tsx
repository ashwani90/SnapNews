import React, { useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";

export default function SettingsScreen() {
  const [showFavorites, setShowFavorites] = useState(false);

  return (
    <View style={styles.container}>

      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Show only favorites</Text>
        <Switch
          value={showFavorites}
          onValueChange={(value) => setShowFavorites(value)}
          trackColor={{ false: "#d1d5db", true: "#ef4444" }}
          thumbColor={showFavorites ? "#fff" : "#f4f3f4"}
        />
      </View>

      {showFavorites && (
        <Text style={styles.hint}>✅ You will now only see favorite categories.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#111827",
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  settingLabel: {
    fontSize: 16,
    color: "#374151",
  },
  hint: {
    marginTop: 15,
    fontSize: 14,
    color: "#10b981",
  },
});
