import {
  View,
  Text,
  Touchable,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
  FlatList,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { image500 } from "../../utils/moviesapi";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

export default function TopRatedMovies({ data, title, genre }) {
  const navigation = useNavigation();

  const renderItem = ({ item, index }) => {
    const itemGenre = genre.find((g) => g.id === item.genre_ids[0]);

    return (
      <TouchableWithoutFeedback
        key={index}
        onPress={() => navigation.push("Movie", item)}
      >
          <View style={{ marginRight: 16, marginBottom: 24 }}>
    <Image
      source={{
        uri: image500(item.poster_path),
      }}
      style={{
        borderRadius: 24, // substitui rounded-3xl
        position: 'relative', // para a posição do LinearGradient
        width: width * 0.3,
        height: height * 0.2,
      }}
    />

    <LinearGradient
      colors={["transparent", "rgba(0,0,0,0.9)"]}
      style={{
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: "100%",
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
      }}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    />

    <View style={{ position: "absolute", bottom: 12, left: 12 }}>
      <Text
        style={{
          color: '#a8a8a8', // text-neutral-300
          marginLeft: 4, // ml-1
          fontSize: 18, // text-lg
          fontWeight: 'bold',
        }}
      >
        {item.title.length > 20 ? item.title.slice(0, 20) + "..." : item.title}
      </Text>

      <View style={{ flexDirection: 'row' }}>
        <Text
          style={{
            color: '#a8a8a8', // text-neutral-300
            marginLeft: 4, // ml-1
            fontSize: 14, // text-sm
            fontWeight: '500', // font-medium
          }}
        >
          {item.vote_average} *
        </Text>
        <Text
          style={{
            color: '#a8a8a8', // text-neutral-300
            marginLeft: 4, // ml-1
            fontSize: 14, // text-sm
            fontWeight: '500', // font-medium
          }}
        >
          {itemGenre?.name}
        </Text>
      </View>
    </View>
  </View>
  </TouchableWithoutFeedback>
  );
};
  return (
    <View style={{ marginVertical: 16 }}>
      <View
        style={{
          marginHorizontal: 16, // mx-4
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            color: 'white', // text-white
            fontSize: 18, // text-lg
            fontWeight: 'bold',
          }}
        >
          {title}
       </Text>
      </View>

      <FlatList
        horizontal
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
      />
    </View>
  );
}
