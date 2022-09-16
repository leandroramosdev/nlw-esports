import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { View, TouchableOpacity, Image, FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { GameParams } from "../../@types/navigation";
import { Entypo } from "@expo/vector-icons";

import logoImg from "../../assets/logo-nlw-esports.png";
import { Background } from "../../components/Background";

import { THEME } from "../../theme";
import { styles } from "./styles";
import { Heading } from "../../components/Heading";
import { DuoCard, DuoCardProps } from "../../components/DuoCard";

export function Game() {
  const [duos, setDuos] = useState<DuoCardProps[]>([]);

  const navigation = useNavigation();
  const route = useRoute();
  const game = route.params as GameParams;

  useEffect(() => {
    fetch(`http://localhost:3333/games/${game.id}/ads`)
      .then((response) => response.json())
      .then((data) => setDuos(data));
  }, []);

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
              onPress={handleGoBack}
            />
          </TouchableOpacity>
          <Image source={logoImg} style={styles.logo} />
          <View style={styles.right}></View>
        </View>

        <Image
          source={{ uri: game.bannerUrl }}
          style={styles.cover}
          resizeMode="cover"
        />

        <Heading title={game.title} subtitle="Conecte-se e comece a jogar" />

        <FlatList
          data={duos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <DuoCard onConnect={() => {}} data={item} />
          )}
          horizontal
          style={styles.containerList}
          contentContainerStyle={[
            duos.length > 0 ? styles.contentList : styles.emptyListContent,
          ]}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => {
            return <Text style={styles.emptyListText}>Não há anúncios</Text>;
          }}
        />
      </SafeAreaView>
    </Background>
  );
}
