import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import React from "react";
import { image500 } from "../../../utils/moviesapi";

export default function Cast({ cast, navigation }) {
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
    onPress={() => navigation.navigate("Person", item)}
    style={{ alignItems: 'flex-start', marginRight: 24 }} 
  >
    <View style={{ alignItems: 'flex-start', justifyContent: 'flex-start', width: '100%', height: 120, borderRadius: 4, overflow: 'hidden' }}>
      <Image
        style={{ borderRadius: 8, height: '100%', width: '100%' }} 
        source={{
          uri: image500(item.profile_path),
        }}
      />
    </View>

    <View style={{ marginTop: 12 }}> 
      <Text style={{ color: 'white', textAlign: 'left' }}>
        {item?.original_name.length > 10
          ? `${item.original_name.slice(0, 10)}...`
          : item?.original_name}
      </Text>
    </View>
  </TouchableOpacity>
    );
  };

  return (
    <View style={{ marginVertical: 8, marginBottom: 32 }}>
      <Text style={{ color: 'white', fontSize: 18, marginHorizontal: 16, marginBottom: 20, fontWeight: 'bold' }}> 
        Atores
      </Text>

      <FlatList
        horizontal
        data={cast}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => `${item.id} -${index}`}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
      />
    </View>
  );
}
