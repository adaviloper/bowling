import faker from "faker";
import Game from "@/Models/Game";
import Factory from "../Factory";

export default class GameFactory {
  generate() {
    const gameId = faker.random.number();
    const attributes = {
      id: gameId,
      user_id: faker.random.number(),
      score: faker.random.number(300),
      complete: faker.random.boolean(),
      frames: Factory.make("Frame", { game_id: gameId }, 10),
      rolls: Factory.make("Roll", { game_id: gameId, pins: 0 }, 20),
      created_at: faker.date.past()
    };
    return Game.make(attributes);
  }
}
