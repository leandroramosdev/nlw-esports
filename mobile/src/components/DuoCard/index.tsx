import { useEffect, useState } from "react";

import { TouchableOpacity, TouchableOpacityProps, View } from "react-native";

import { GameController } from "phosphor-react-native";
import { DuoInfo } from "../DuoInfo";

import { THEME } from "../../theme";
import { styles } from "./styles";
import { DuoMatch } from "../DuoMatch";

export interface DuoCardProps extends TouchableOpacityProps {
  hourEnd: string;
  hourStart: string;
  id: string;
  name: string;
  useVoiceChannel: boolean;
  weekDays: string[];
  yearsPlaying: number;
}

interface Props {
  data: DuoCardProps;
}

export function DuoCard({ data }: Props) {
  const [discordDuoSelected, setDiscordDuoSelected] = useState('');

  async function getDiscordUser(adsId: string){
    console.log('teste')
    fetch(`http://localhost:3333/ads/${adsId}/discord`)
      .then((response) => response.json())
      .then((data) => {
        setDiscordDuoSelected(data.discord)
      });
  }

  return (
    <View style={styles.container}>
      <DuoInfo label="Nome" value={data.name} />
      <DuoInfo label="Tempo de jogo" value={`${data.yearsPlaying} anos`} />
      <DuoInfo
        label="Disponibilidade"
        value={`${data.weekDays.length} dias \u2022 ${data.hourStart} - ${data.hourEnd}`}
      />
      <DuoInfo
        label="Chamada de áudio"
        value={data.useVoiceChannel ? "Sim" : "Não"}
        colorValue={
          data.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT
        }
      />

      <TouchableOpacity style={styles.button} onPress={() => getDiscordUser(data.id)}>
        <GameController color={THEME.COLORS.TEXT} size={20} />
      </TouchableOpacity>

      <DuoMatch
          visible={discordDuoSelected.length > 0}
          discord={discordDuoSelected}
          onClose={() => {
            setDiscordDuoSelected("");
          }}
        />
    </View>
  );
}
