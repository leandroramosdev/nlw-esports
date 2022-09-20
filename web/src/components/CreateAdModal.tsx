import { FormEvent, useEffect, useState } from "react";

import * as Dialog from "@radix-ui/react-dialog";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { Check, GameController } from "phosphor-react";
import { Input } from "./Form/Input";

import * as Checkbox from "@radix-ui/react-checkbox";

interface Game {
  id: string;
  title: string;
}

interface DayWeek {
  value: string;
  initial: string;
}

export function CreateAdModal() {
  const [games, setGames] = useState<Game[]>([]);
  const [weekdays, setWeekdays] = useState<string[]>([]);
  const [useVoiceChannel, setuseVoiceChannel] = useState(false);

  const [days, setDays] = useState<DayWeek[]>([
    { value: "0", initial: "D" },
    { value: "1", initial: "S" },
    { value: "2", initial: "T" },
    { value: "3", initial: "Q" },
    { value: "4", initial: "Q" },
    { value: "5", initial: "S" },
    { value: "6", initial: "S" },
  ]);

  useEffect(() => {
    fetch("http://localhost:3333/games/")
      .then((response) => response.json())
      .then((data) => setGames(data));
  }, []);

  async function handleCreateAd(event: FormEvent) {
    event.preventDefault();

    const formDat = new FormData(event.target as HTMLFormElement);

    const data = Object.fromEntries(formDat);
    console.log(useVoiceChannel);
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed text-white">
        <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg">
          <Dialog.DialogTitle className="text-3xl font-black">
            Publique um anúncio
          </Dialog.DialogTitle>
          <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="game" className="font-semibold">
                Qual o game?
              </label>

              <select
                name="game"
                id="game"
                className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none"
                defaultValue=""
              >
                <option>Selecione o game que desesa jogar</option>
                {games.map((game) => {
                  return (
                    <option key={game.id} value={game.id}>
                      {game.title}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="name">Seu nome (ou nickname)</label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Como te chamam dentro do game?"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="yearsPlaying">Joga há quanto tempo?</label>
                <Input
                  id="yearsPlaying"
                  name="yearsPlaying"
                  type="number"
                  placeholder="Tudo bem ser ZERO"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="discord">Qual seu Discord?</label>
                <Input
                  id="discord"
                  name="discord"
                  type="text"
                  placeholder="Usuário#00123"
                />
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="weekdays">Quando costuma jogar ?</label>

                <ToggleGroup.Root
                  className="grid grid-cols-4 gap-2"
                  type="multiple"
                  onValueChange={setWeekdays}
                >
                  {days.map((day: DayWeek) => {
                    return (
                      <ToggleGroup.Item
                        key={day.value}
                        value={day.value}
                        title="Domingo"
                        className={`w-8 h-8 rounded ${
                          weekdays.includes(day.value)
                            ? "bg-violet-500"
                            : "bg-zinc-900"
                        }`}
                      >
                        {day.initial}
                      </ToggleGroup.Item>
                    );
                  })}
                </ToggleGroup.Root>
              </div>

              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="hourStart">Qual horário do dia ?</label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    id="hourStart"
                    name="hourStart"
                    type="time"
                    placeholder="De"
                  />
                  <Input
                    id="hourEnd"
                    name="hourEnd"
                    type="time"
                    placeholder="Até"
                  />
                </div>
              </div>
            </div>

            <label className="mt-2 items-center flex gap-2 text-sm">
              <Checkbox.Root
                checked={useVoiceChannel}
                onCheckedChange={() => {
                  setuseVoiceChannel(!useVoiceChannel);
                }}
                className="w-6 h-6 p-1 rounded bg-zinc-900"
              >
                <Checkbox.Indicator className="">
                  <Check className="w-4 h-4 text-emerald-400" />
                </Checkbox.Indicator>
              </Checkbox.Root>
              Costumo me conectar ao chat de voz
            </label>

            <footer className="mt-4 flex justify-end gap-4">
              <Dialog.Close
                type="button"
                className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600"
              >
                Cancelar
              </Dialog.Close>
              <button
                className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
                type="submit"
              >
                <GameController className="w-6 h-6" /> Submit
              </button>
            </footer>
          </form>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Portal>
  );
}
