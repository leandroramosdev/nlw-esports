import { useState } from "react";
import { View, Text, Modal, TouchableOpacity, ModalProps, Alert, ActivityIndicator } from "react-native";

import { Heading } from "../Heading";

import { AntDesign } from "@expo/vector-icons";
import { CheckCircle } from "phosphor-react-native";

import { styles } from "./styles";
import { THEME } from "../../theme";

import * as Clipboard from 'expo-clipboard';

interface Props extends ModalProps {
  discord: string;
  onClose: () => void;
}

export function DuoMatch({ discord, onClose, ...rest }: Props) {
  const [isCopping, setIsCopping] = useState(false);

  async function handleCopyDiscordUserToClipboard(discord: string){
    setIsCopping(true);
    await Clipboard.setStringAsync(discord);

    Alert.alert('Discord copiado!', 'Usuário copiado ' + discord);
    setIsCopping(false);
  }

  return (
    <Modal 
      transparent 
      statusBarTranslucent
      animationType="fade" 
      {...rest}
      >
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
            <AntDesign
              name="close"
              size={20}
              color={THEME.COLORS.CAPTION_500}
            />
          </TouchableOpacity>

          <CheckCircle size={64} color={THEME.COLORS.SUCCESS} weight="bold" />

          <Heading
            title="Let`s Play!"
            subtitle="Agora é só começar a jogar!"
            style={{ alignItems: "center", marginTop: 24 }}
          />
          <Text style={styles.text}>Adcione seu discord</Text>

          <TouchableOpacity 
            style={styles.discordButton} 
            onPress={() => handleCopyDiscordUserToClipboard(discord)}
            disabled={isCopping}
            >
            <Text style={styles.discord}>
              {isCopping ? <ActivityIndicator color={THEME.COLORS.PRIMARY} /> : discord}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
