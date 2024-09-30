import {
  View,
  Text,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import React, { useCallback, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { debounce } from "lodash";
import { XMarkIcon } from "react-native-heroicons/outline";
import Loading from "../components/Loading";
import { image500, searchMovies } from "../../utils/moviesapi";
import Home from "../../assets/images/Homescreen1.png"

var { width, height } = Dimensions.get("window");

export default function SearchScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const handleSearch = (search) => {
    if (search && search.length > 2) {
      setLoading(true);
      searchMovies({
        query: search,
        include_adult: false,
        language: "en-US",
        page: "1",
      }).then((data) => {
        console.log("We got our search results");
        setLoading(false);
        if (data && data.results) {
          setResults(data.results);
        }
      });
    }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);
  return (
    <View style={{ flex: 1, position: 'relative' }}>
    <Image
      source={Home}
      style={{
        width: width,
        height: height,
        position: 'absolute',
      }}
    />

    {/* Search Input */}
    <View style={{ marginHorizontal: 16, marginBottom: 12, marginTop: 48, flexDirection: 'row', padding: 8, justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', borderRadius: 10 }}>
      <TextInput
        onChangeText={handleTextDebounce}
        placeholder="Procure por seus filmes favoritos"
        placeholderTextColor={"gray"}
        style={{ paddingBottom: 4, paddingLeft: 24, flex: 1, fontWeight: '500', color: 'black', letterSpacing: 0.5 }}
      />
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <XMarkIcon size="25" color="black" /> {/* Altere a cor para "black" para melhor contraste */}
      </TouchableOpacity>
    </View>

    {loading ? (
      <Loading />
    ) : results.length > 0 ? (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        style={{ marginBottom: 20 }} // Para evitar sobreposição com a imagem de fundo
      >
        <Text style={{ color: 'white', fontWeight: '600', marginLeft: 4, fontSize: 18, marginTop: 8 }}>
          {results.length} Results
        </Text>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          {results.map((item, index) => {
            return (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => navigation.push("Movie", item)}
              >
                <View style={{ marginBottom: 16, spaceY: 8 }}>
                  <Image
                    source={{
                      uri:
                        image500(item.poster_path) ||
                        "https://th.bing.com/th/id/R.983b8085251688a15240a6ab11b97c39?rik=MlZlZUcTUEgjyw&riu=http%3a%2f%2fwallpapercave.com%2fwp%2fwp1946050.jpg&ehk=s%2fbeqrs6stRqTs%2bO5MOpsePOb%2bQbXA2KyK8HwRy4jCw%3d&risl=&pid=ImgRaw&r=0",
                    }}
                    style={{
                      borderRadius: 20,
                      width: width * 0.44,
                      height: height * 0.3,
                    }}
                  />
                  <Text style={{ color: 'gray', fontWeight: 'bold', fontSize: 18, marginLeft: 4 }}>
                    {item.title.length > 19
                      ? item.title.slice(0, 19) + "..."
                      : item.title}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            );
          })}
        </View>
      </ScrollView>
    ) : (
      <Text style={{ color: 'white', textAlign: 'center', marginTop: 16 }}>No Results Found</Text>
    )}
  </View>
  );
}
