import { IRandomScene } from './irandomScene';

export class RandomScene {
  private randomScenes: Array<IRandomScene>;
  private counter = 0;

  constructor() {
    this.randomScenes = this.build_scenes();
  }

  public get_random_scene(): IRandomScene {
    const scene = this.randomScenes[this.counter];
    this.counter++;
    if (this.counter > this.randomScenes.length - 1) {
      this.counter = 0;
    }
    return scene;
  }

  private build_scenes(): Array<IRandomScene> {
    const randomScenes = Array<IRandomScene>();
    const scene1: IRandomScene = {
      title: 'Joker',
      source: 'https://imsdb.com/scripts/Joker.html',
      genre: 'Crime, Drama,Thriller',
      scene: `In this scene, the Joker is sitting across from a social worker, who is trying to have a conversation with him. The Joker is laughing uncontrollably but eventually gets it under control. He asks the social worker if it's just him or if things are getting crazier out there. Despite his laughter, there is a sense of pain and brokenness about him. The social worker asks about his job, and he expresses his enjoyment of the unpredictability of being a clown, but he also expresses a feeling of drowning and being overwhelmed.`,
    };

    const scene2: IRandomScene = {
      title: 'Pulp Fiction',
      source: 'https://imsdb.com/scripts/Pulp-Fiction.html',
      genre: 'Action, Crime, Drama, Thriller',
      scene: `Vincent and Jules, both wearing cheap black suits with thin black ties under long green dusters, are driving down a homeless-ridden street in Hollywood in an old gas guzzling, dirty, white 1974 Chevy Nova. They discuss the legality of hash in Amsterdam, where it's legal to buy, own, and sell it in designated places. Vincent also tells Jules about the little differences in Europe, such as being able to buy beer in a movie theater in Amsterdam, and mayonnaise being a common topping for fries in Holland.`,
    };

    const scene3: IRandomScene = {
      title: 'Cube',
      source: 'https://imsdb.com/scripts/Cube.html',
      genre: 'Thriller, Sci-Fi, Horror, Mystery',
      scene: `In this scene, the characters Quentin, Holloway, Worth, and Leaven are discussing the situation they are in. They are in a room with numbered doors, but the numbers are different in each room. Worth calculates that there are over 500 million rooms, but they only have three days' worth of food and water. Holloway expresses concern about the various physical and mental problems they may experience, including dehydration and the body breaking down its own tissue.`,
    };

    randomScenes.push(scene1, scene2, scene3);
    return randomScenes;
  }
}
