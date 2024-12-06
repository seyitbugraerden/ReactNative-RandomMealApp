import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";
import { IoMdRefresh } from "react-icons/io";

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
          <ActivityIndicator size="small" color="#fffff" />
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
                  <Text
                    style={{
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 6
                    }}
                  >
                    {meal.strInstructions}
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
          <TouchableOpacity onPress={fetchMeal}>
            <IoMdRefresh style={{ height: "24px", width: "24px" }} />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontSize: 14,
            fontWeight: "bold",
            marginTop: 10,
            color: "white",
          }}
        >
          Click for New Meal
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255,255,255,.4)",
    color: "#fff",
    paddingTop: 40,
    paddingRight: 20,
    paddingBottom: 40,
    paddingLeft: 40,
    borderRadius: 14,
    width: "70%",
    marginTop: "auto",
    marginRight: "auto",
    marginLeft: "auto",
  },
  usual: {
    display: "flex",
    justifyContent: "center",
    height: "90%",
  },
  down: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: "auto",
  },
  downButton: {
    backgroundColor: "orange",
    borderRadius: "100%",
    padding: 8,
    color: "white",
  },
  window: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: "20px",
  },
  image: {
    width: 160,
    height: 160,
    margin: "auto",
    borderRadius: 14,
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
