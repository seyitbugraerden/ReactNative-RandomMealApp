import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
  Image,
} from "react-native";

export default function ProfileScreen() {
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMeal = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php"
      );
      const data = await response.json();
      setMeal(data.meals[0]);
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    fetchMeal();
  }, []);

  return (
    <View style={styles.usual}>
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="small" color="#0000ff" />
        ) : (
          <View>
            {meal ? (
              <View style={styles.window}>
                <Image
                  source={{ uri: meal.strMealThumb }}
                  style={styles.image}
                />
                <View>
                  <Text style={styles.title}>{meal.strMeal}</Text>
                  <Text style={styles.category}>
                    {meal.strCategory} / {meal.strArea}
                  </Text>
                </View>
              </View>
            ) : (
              <Text>No meal data available.</Text>
            )}
          </View>
        )}
      </View>
      <View style={styles.down}>
        <View style={styles.downButton}>
          <Button onPress={fetchMeal} title="Get" color="#fff" />
        </View>
        <Text style={{ fontSize: 14, fontWeight: "bold", marginTop: 10 }}>
          Click for New Meal
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ececea",
    color: "#fff",
    paddingTop: 40,
    paddingRight: 20,
    paddingBottom: 40,
    paddingLeft: 20,
    borderRadius: 5,
    width: "100%",
  },
  usual: {
    flex: 1,
    width: "90%",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
  down: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  downButton: {
    backgroundColor: "orange",
    borderRadius: "100%",
    padding: 5,
    color: "white",
  },
  window: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: "20px",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    margin: "auto",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  category: {
    fontSize: 12,
    opacity: "50%",
  },
});
