import { Injectable } from '@angular/core';
import { IRandomMelody } from '../data-models/irandomMelody';
import { IRandomScene } from '../data-models/irandomScene';
import { RandomMelody } from '../data-models/randomMelody';
import { RandomScene } from '../data-models/randomScene';

@Injectable({
  providedIn: 'root',
})
export class RandomSceneMelodyGeneratorService {
  private randomSceneGeneratore: RandomScene;
  private randomMelodyGeneratore: RandomMelody;

  constructor() {
    this.randomSceneGeneratore = new RandomScene();
    this.randomMelodyGeneratore = new RandomMelody();
  }

  public generate_random_scene(): IRandomScene {
    return this.randomSceneGeneratore.get_random_scene();
  }

  public generate_random_melody(): IRandomMelody {
    return this.randomMelodyGeneratore.get_random_melody();
  }
}
