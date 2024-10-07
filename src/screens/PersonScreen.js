import {View,Text,ScrollView,Image,Dimensions,TouchableOpacity,} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {fetchPersonDetails,fetchPersonMovies,image500,} from "../../utils/moviesapi";
import { XMarkIcon } from "react-native-heroicons/outline";
import Loading from "../components/Loading";
import PopularMovie from "../components/PopularMovie";
import Home from "../../assets/images/homescreen1.png"

const { width, height } = Dimensions.get("window");

export default function PersonScreen() {
  const { params: item } = useRoute();
  const [isFavorite, toggleFavourite] = useState(false);
  const navigation = useNavigation();
  const [person, setPerson] = useState({});
  const [personMovies, setPersonMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPersonDetails(item.id);
    getPersonMovies(item.id);
  }, [item]);

  const getPersonDetails = async (id) => {
    const data = await fetchPersonDetails(id);
    console.log("got cast details", data);
    setLoading(false);
    if (data) {
      setPerson(data);
    }
  };

  const getPersonMovies = async (id) => {
    const data = await fetchPersonMovies(id);
    console.log("got cast movies", data);
    if (data) {
      setPersonMovies(data.cast);
    }
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: '#1F2937', // bg-neutral-800
        position: 'relative',
        paddingHorizontal: 8,
        paddingVertical: 104, // py-26
      }}
      contentContainerStyle={{
        paddingBottom: 20,
      }}
    >
      <Image
        source={Home}
        style={{
          width: width,
          height: "100%",
          position: 'absolute',
        }}
        resizeMode="cover"
      />

      {/* Close Button */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', position: 'absolute', right: 0, top: 0, marginHorizontal: 16, zIndex: 10, marginVertical: 12 }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            borderRadius: 16,
            padding: 8,
            backgroundColor: '#2496ff',
          }}
        >
          <XMarkIcon size={28} strokeWidth={2.5} color="white" />
        </TouchableOpacity>
      </View>

      {/* Cast Details */}
      {loading ? (
        <Loading />
      ) : (
        <View style={{ marginTop: 96 }}> {/* mt-24 */}
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginHorizontal: 0, marginTop: 0 }}>
            <View style={{ alignItems: 'center', borderRadius: 8, overflow: 'hidden' }}>
              <Image
                source={{
                  uri: image500(person.profile_path),
                }}
                style={{
                  width: width * 0.35,
                  height: height * 0.3,
                }}
                resizeMode="cover"
              />
            </View>

            <View style={{ marginTop: 24, width: '50%', marginLeft: 16 }}>
              <Text style={{ fontSize: 24, color: 'white', fontWeight: 'bold', textAlign: 'left' }}>
                {person?.name}
              </Text>

              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16, textAlign: 'left', paddingVertical: 4, width: '50%', backgroundColor: '#F97316' }}>
                {person.popularity?.toFixed(2)} %
              </Text>

              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16, textAlign: 'left' }}>
                {person?.place_of_birth}
              </Text>

              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16, textAlign: 'left' }}>
                {person?.birthday}
              </Text>
            </View>
          </View>
          <View style={{ marginVertical: 24, marginHorizontal: 16 }}>
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Biografia</Text>
            <Text style={{ color: '#F9FAFB', trackingWide: true, lineHeight: 24 }}>
              {person?.biography ? person.biography : "N / A"}
            </Text>
          </View>

          {/* Cast Movies */}
          {person?.id && personMovies.length > 0 && (
            <PopularMovie title="Filmes" data={personMovies} />
          )}
        </View>
      )}
    </ScrollView>
  );
}
