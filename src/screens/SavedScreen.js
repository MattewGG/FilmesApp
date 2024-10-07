import {
  View,
  Text,
  ScrollView,
  Image,
  ImageBackground,
  Touchable,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useCallback, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { image500 } from "../../utils/moviesapi";
import Homescreen from "../../assets/images/Homescreen1.png";

const { width, height } = Dimensions.get("window");

export default function SavedScreen() {
  const navigation = useNavigation();

  const [savedMovies, setSavedMovies] = useState([]);

  useFocusEffect(
    useCallback(() => {
     
      const loadSavedMovies = async () => {
        try {
          const savedMovies = await AsyncStorage.getItem("savedMovies");
          const savedMoviesArray = savedMovies ? JSON.parse(savedMovies) : [];
          setSavedMovies(savedMoviesArray);
          console.log("Pull saved movie from AsyncStorage");
        } catch (error) {
          console.log(error);
        }
      };
      loadSavedMovies();
    }, [navigation])
  );

  const clearSavedMovies = async () => {
    try {
      await AsyncStorage.removeItem("savedMovies");
      setSavedMovies([]);
      console.log("Clear all saved movies");
    } catch (error) {
      console.log("Error clearing saved movies", error);
    }
  };

  return (
    <ScrollView style={{ flex: 1 }}>
    <ImageBackground
      source={Homescreen}
      style={{
        width: "100%",
        height: height * 1, // Para cobrir toda a tela
      }}
      resizeMode="cover"
    >
      <View style={{ marginTop: 48, padding: 16 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 24, color: 'white' }}>
            Saved Movies
          </Text>
          <TouchableOpacity
            onPress={clearSavedMovies}
            style={{
              backgroundColor: '#1E3A8A', // Cor azul escuro
              paddingVertical: 8,
              paddingHorizontal: 16,
              borderRadius: 8,
            }}
          >
            <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'white' }}>Clear</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          {savedMovies.map((movie, index) => (
            <View style={{ flexDirection: 'row', marginTop: 16 }} key={index}>
              <TouchableOpacity onPress={() => navigation.push("Movie", movie)}>
                <Image
                  source={{ uri: image500(movie.poster_path) }}
                  style={{
                    width: width * 0.41,
                    height: height * 0.25,
                    borderRadius: 20,
                  }}
                />
                <Text style={{ color: 'gray', fontWeight: 'bold', fontSize: 18, marginLeft: 4 }}>
                  {movie.title.length > 15
                    ? movie.title.slice(0, 15) + "..."
                    : movie.title}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </ImageBackground>
  </ScrollView>
);
};