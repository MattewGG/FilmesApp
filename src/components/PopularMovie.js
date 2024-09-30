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

export default function PopularMovie({ title, data }) {
  const navigation = useNavigation();

  const renderItem = ({ item, index }) => {
    return (
      <TouchableWithoutFeedback
        key={index}
        onPress={() => navigation.push("Movie", item)}
      >
        <View style={{ marginRight: 16, marginBottom: 8 }}>
    <Image
      source={{
        uri:
          image500(item.poster_path) ||
          "https://th.bing.com/th/id/R.983b8085251688a15240a6ab11b97c39?rik=MlZlZUcTUEgjyw&riu=http%3a%2f%2fwallpapercave.com%2fwp%2fwp1946050.jpg&ehk=s%2fbeqrs6stRqTs%2bO5MOpsePOb%2bQbXA2KyK8HwRy4jCw%3d&risl=&pid=ImgRaw&r=0",
      }}
      style={{
        borderRadius: 24, // equivalente a rounded-3xl
        width: width * 0.3,
        height: height * 0.2,
      }}
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
      </View>
  </View>
  </TouchableWithoutFeedback>
  );
  };

  return (
      <View style={{ marginBottom: 16, marginTop: 16 }}> {/* equivalente a "mb-4" e "space-y-4" */}
        <View style={{ marginHorizontal: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>{title}</Text>
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
