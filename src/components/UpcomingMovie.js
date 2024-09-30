import {
  View,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
  FlatList,
  Image,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { image500 } from "../../utils/moviesapi";

const { width, height } = Dimensions.get("window");

export default function UpcomingMovie({ title, data }) {
  const navigation = useNavigation();

  const renderItem = ({ item, index }) => {
    return (
      <TouchableWithoutFeedback
        key={index}
        onPress={() => navigation.push("Movie", item)}
      >
          <View style={{ marginRight: 16, marginBottom: 4 }}>
    <Image
      source={{
        uri: image500(item.poster_path),
      }}
      style={{
        borderRadius: 24, // equivalente a rounded-3xl
        width: width * 0.3,
        height: height * 0.2,
      }}
    />

    <Text
      style={{
        color: '#a8a8a8', // equivalente a text-neutral-300
        marginLeft: 4, // equivalente a ml-1
        fontSize: 18, // equivalente a text-lg
        fontWeight: 'bold',
      }}
    >
      {item.title.length > 12 ? item.title.slice(0, 12) + "..." : item.title}
    </Text>
  </View>
</TouchableWithoutFeedback>

    );
  };

  return (
      <View style={{ marginBottom: 16 }}>
    <View
      style={{
        marginHorizontal: 16, // mx-4
        flexDirection: 'row', // flex-row
        justifyContent: 'space-between', // justify-between
        alignItems: 'center', // items-center
      }}
    >
      <Text
        style={{
          color: 'white', // text-white
          fontSize: 18, // text-lg
          fontWeight: 'bold', // font-bold
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
        paddingHorizontal: 15, // paddingHorizontal aplicado para o conteúdo da lista
      }}
    />
  </View>

  );
}
