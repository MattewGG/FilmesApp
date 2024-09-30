import React from 'react';
import { View, Text, Image, Touchable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Importando a imagem diretamente

import teste from '../../assets/images/teste.png';
import { TouchableOpacity } from 'react-native';


export default function WelcomeScreen() {
  const navigation = useNavigation();
  
  return (
    <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', padding: 10 }}>
      <Image 
        source={teste} // Usando o import da imagem
        style={{
          position: "absolute",
          width: 400, 
          height: 841,
        }}
        resizeMode="cover"
      />
       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 28, maxWidth: '87%' }}>
      
      {/* Primeiro bloco com fundo vermelho e texto HD */}
      <View style={{ backgroundColor: '#343deb', padding: 16, borderRadius: 12, marginTop: 547 }}>
        <Text style={{ color: 'white', fontSize: 32, fontWeight: '800', letterSpacing: 3, marginVertical: 16, marginTop: 0, marginBottom: 0 }}>HD</Text>
      </View>
      
      {/* Texto principal "FILMES" */}
      <Text style={{ color: 'white', fontSize: 32, fontWeight: '700', letterSpacing: 3, marginVertical: 16 }}>FILMES</Text>

      {/* Descrição */}
      <Text style={{ color: 'white', textAlign: 'center', fontSize: 18, letterSpacing: 2, marginBottom: 8, fontWeight: '500' }}>
        Assista e busque seus filmes favoritos
      </Text>

      {/* Botão de "Descubra" */}
      <View style={{ marginTop: 16, marginBottom: 144 }}>
        <TouchableOpacity 
          style={{ paddingHorizontal: 48, paddingVertical: 12, borderRadius: 8, backgroundColor: '#dc2626' }}
          onPress={() => navigation.navigate("HomeTab")}
        >
          <Text style={{ color: 'white', fontSize: 18, fontWeight: '500' }}>Descubra</Text>
        </TouchableOpacity>
      </View>
      
    </View>
    </View>
  );
}