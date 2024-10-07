import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  fetchMovieCredits,
  fetchMovieDetails,
  fetchSimilarMovies,
  image500,
} from "../../utils/moviesapi";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import Loading from "../components/Loading";
import Cast from "../components/Cast";
import PopularMovie from "../components/PopularMovie";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";

var { width, height } = Dimensions.get("window");

export default function MovieScreen() {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [movie, setMovie] = useState({});
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFavorite, toggleFavourite] = useState(false);

  useEffect(() => {
    setLoading(true);
    getMovieDetails(item.id);
    getMovieCredits(item.id);
    getSimilarMovies(item.id);
  }, [item]);

  // Function to Fetch Movie Details

  const getMovieDetails = async (id) => {
    const data = await fetchMovieDetails(id);
    setLoading(false);
    if (data) {
      setMovie({ ...movie, ...data });
    }
  };

  const getMovieCredits = async (id) => {
    const data = await fetchMovieCredits(id);
    if (data) {
      setCast(data.cast);
    }
  };

  const getSimilarMovies = async (id) => {
    const data = await fetchSimilarMovies(id);
    if (data && data.results) {
      setSimilarMovies(data.results);
    }
  };

  console.log("Similar Movies", similarMovies);

  const formatPopularity = (popularity) => {
    const percentage = (popularity / 1000) * 170;
    return `${Math.round(percentage)} %`;
  };
  const formatRuntime = (runtime) => {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;

    if (hours === 0) {
      return `${minutes}min`;
    } else if (minutes === 0) {
      return `${hours}h`;
    } else {
      return `${hours}h ${minutes}mins`;
    }
  };
  // console.log("Movie Details", movie);

  // Function to Add Movie to Saved Screen

  const toggleFavouriteAndSave = async () => {
    try {
      // Check if Movie is already in Storage
      const savedMovies = await AsyncStorage.getItem("savedMovies");
      let savedMoviesArray = savedMovies ? JSON.parse(savedMovies) : [];
      console.log("Check if the movie is already saved");

      // Chcek if the movie is already in the saved list
      const isMovieSaved = savedMoviesArray.some(
        (savedMovie) => savedMovie.id === item.id
      );

      console.log("Check if the movie is already in the saved list");

      if (!isMovieSaved) {
        // If movie is not saved, add it to the saved list
        savedMoviesArray.push(movie);
        await AsyncStorage.setItem(
          "savedMovies",
          JSON.stringify(savedMoviesArray)
        );
        toggleFavourite(true);
        console.log("Movie is added to the list of saved movies");
      } else {
        // If movie is already saved, remove it from the list
        const updatedSavedMoviesArray = savedMoviesArray.filter(
          (savedMovie) => savedMovie.id !== item.id
        );
        await AsyncStorage.setItem(
          "savedMovies",
          JSON.stringify(updatedSavedMoviesArray)
        );
        toggleFavourite(false);
        console.log("Movie is removed from the list of saved movies");
      }
    } catch (error) {
      console.log("Error Saving Movie", error);
    }
  };

  useEffect(() => {
    // Load savd movies from AsyncStorage when the component mounts
    const loadSavedMovies = async () => {
      try {
        const savedMovies = await AsyncStorage.getItem("savedMovies");
        const savedMoviesArray = savedMovies ? JSON.parse(savedMovies) : [];

        // Check if the movie is already in the saved list
        const isMovieSaved = savedMoviesArray.some(
          (savedMovie) => savedMovie.id === item.id
        );

        toggleFavourite(isMovieSaved);
        console.log("Check if the current movie is in the saved list");
      } catch (error) {
        console.log("Error Loading Saved Movies", error);
      }
    };

    loadSavedMovies();
  }, [item.id]);

  return (
    <ScrollView
    contentContainerStyle={{
      paddingBottom: 20,
    }}
    style={{
      flex: 1,
      backgroundColor: '#212121', // ng-neutral-900 substituído
    }}
  >
    {/* Botão Voltar e Poster do Filme */}
    <View style={{ width: '100%' }}>
      {/* Ícones de Voltar e Coração */}
      <View
        style={{
          zIndex: 20,
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 16,
          marginTop: 48,
          position: 'absolute',
        }}
      >
        {/* Ícone Voltar */}
        <View
          style={{
            backgroundColor: '#2496ff',
            padding: 8,
            borderRadius: 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ChevronLeftIcon size={30} strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
  
        {/* Ícone Coração */}
        <View
          style={{
            backgroundColor: '#2496ff',
            padding: 8,
            borderRadius: 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <TouchableOpacity onPress={toggleFavouriteAndSave}>
            <HeartIcon
              size={30}
              strokeWidth={2}
              color={isFavorite ? "red" : "white"}
            />
          </TouchableOpacity>
        </View>
      </View>
  
      {/* Imagem do Filme */}
      {loading ? (
        <Loading />
      ) : (
        <View>
          <Image
            source={{
              uri:
                image500(movie.poster_path) ||
                "https://th.bing.com/th/id/R.4dc29c271625202308a26ed96d1d962d?rik=qKnKhs7roVDpXA&pid=ImgRaw&r=0",
            }}
            style={{
              width: '100%',
              height: height * 0.55,
            }}
          />
        </View>
      )}
    </View>
  
    {/* Detalhes do Filme */}
    <View
      style={{
        flex: 1,
        backgroundColor: 'gray',
        paddingVertical: 16,
        marginTop: -98,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        overflow: 'hidden',
        color: 'white'
      }}
    >
      <Image
        source={require("../../assets/images/homescreen1.png")}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
        resizeMode="cover"
      />
  
      {/* Título do Filme */}
      <View style={{ padding: 16 }}>
        <Text
          style={{
            color: 'black',
            textAlign: 'left',
            fontSize: 24,
            fontWeight: 'bold',
            letterSpacing: 2,
          }}
        >
          {movie?.title}
        </Text>
  
        {/* Gêneros */}
        <Text style={{ flexDirection: 'row' }}>
          {movie?.genres?.map((genre, index) => {
            let showDot = index + 1 != movie.genres.length;
  
            return (
              <Text
                key={index}
                style={{
                  color: '#f2f2f2',
                  fontWeight: '600',
                  fontSize: 16,
                  textAlign: 'center',
                }}
              >
                {genre?.name} {showDot ? "• " : null}
              </Text>
            );
          })}
        </Text>
  
        {/* Ano de Lançamento e Duração */}
        {movie?.id ? (
          <View
            style={{
              backgroundColor: '#2496ff',
              padding: 8,
              width: '75%',
              borderRadius: 12,
            }}
          >
            <Text
              style={{
                color: 'white',
                fontWeight: '600',
                fontSize: 16,
                textAlign: 'left',
              }}
            >
              {formatPopularity(movie?.popularity)}
              {" * "}
              {formatRuntime(movie?.runtime)} {}{" "}
              {movie?.release_date?.split("-")[0] || "N/A"}
            </Text>
          </View>
        ) : null}
  
        {/* Descrição */}
        <Text
          style={{
            color: '#f2f2f2',
            fontSize: 14,
            letterSpacing: 1.2,
            lineHeight: 24,
          }}
        >
          {movie?.overview}
        </Text>
  
        {/* Elenco */}
        {movie?.id && cast.length > 0 && (
          <Cast navigation={navigation} cast={cast} />
        )}
  
        {/* Filmes Similares */}
        {movie?.id && similarMovies.length > 0 && (
          <PopularMovie title="Filmes parecidos" data={similarMovies} />
        )}
      </View>
    </View>
  </ScrollView>
  
  );
}
