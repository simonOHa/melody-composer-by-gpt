import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OpenaiService } from '../services/openai.service';
import { RandomSceneMelodyGeneratorService } from '../services/random-scene-melody-generator.service';

@Component({
  selector: 'app-prompt-form',
  templateUrl: './prompt-form.component.html',
  styleUrls: ['./prompt-form.component.sass'],
})
export class PromptFormComponent implements OnInit {
  movieTitle = '';
  movieGenre = '';
  scene = '';
  prompt = '';
  promptInstruction =
    'Compose a melody in ABC format to reflect the following descriptions:';
  melodyMood = 'Tense';
  melodyGenre = 'Hardcore';
  modelChoices: Array<string> = [
    'text-davinci-003',
    'text-curie-001',
    'text-babbage-001',
    'text-ada-001',
  ];
  modelForm: FormGroup | any;
  isWait = false; // Used for the progress bar
  hide = true; // Used for api key field

  constructor(
    private _openaiService: OpenaiService,
    private _randomSceneGeneratorService: RandomSceneMelodyGeneratorService
  ) {}

  ngOnInit(): void {
    this.modelForm = new FormGroup({
      model: new FormControl(this.modelChoices[0]),
      temperature: new FormControl(0.9, [
        Validators.required,
        Validators.min(0),
        Validators.max(1.0),
      ]),
      max_tokens: new FormControl(150, [
        Validators.required,
        Validators.min(50),
        Validators.max(200),
      ]),
      scene: new FormControl(this.scene, Validators.required),
      openai_Key: new FormControl('', Validators.required),
      movie_tile: new FormControl(this.movieTitle),
      movie_genre: new FormControl(this.movieGenre),
      melody_genre: new FormControl(this.melodyGenre),
      melody_mood: new FormControl(this.melodyMood),
      prompt_instruction: new FormControl(
        this.promptInstruction,
        Validators.required
      ),
      prompt: new FormControl(this.prompt, Validators.required),
    });

    this.prompt = this.buildPrompt();
  }

  private buildPrompt(): string {
    let prompt = this.promptInstruction;

    if (this.scene != '') {
      prompt += `\nScene description:###\n ${this.scene} \n###`;
    }
    if (this.movieTitle != '') {
      prompt += `\nMovie tilte description:###\n ${this.movieTitle} \n###`;
    }
    if (this.movieGenre != '') {
      prompt += `\nMovie tilte description:###\n ${this.movieGenre} \n###`;
    }
    if (this.melodyGenre != '') {
      prompt += `\nMelody genre description:###\n ${this.melodyGenre} \n###`;
    }
    if (this.melodyMood != '') {
      prompt += `\nMelody mood description:###\n ${this.melodyMood} \n###`;
    }

    return prompt;
  }

  public formFieldChange(newValue: string, id: string): void {
    switch (id) {
      case 'promptInstruction':
        this.promptInstruction = newValue;
        this.prompt = this.buildPrompt();
        break;

      case 'melodyGenre':
        this.melodyGenre = newValue;

        this.prompt = this.buildPrompt();
        break;

      case 'melodyMood':
        this.melodyMood = newValue;

        this.prompt = this.buildPrompt();
        break;

      case 'movieTitle':
        this.movieTitle = newValue;

        this.prompt = this.buildPrompt();
        break;

      case 'movieGenre':
        this.movieGenre = newValue;

        this.prompt = this.buildPrompt();
        break;

      case 'scene':
        this.scene = newValue;

        this.prompt = this.buildPrompt();
        break;

      default:
        console.log(`${id} Not supported`);
    }
  }

  public onSubmit(form: FormGroup): void {
    this.isWait = true;
    this._openaiService.invokeGPT(
      form.value.model,
      form.value.temperature,
      form.value.max_tokens,
      form.value.prompt,
      form.value.openai_Key
    );
    this._openaiService.is_melody_generated().subscribe((response: boolean) => {
      this.isWait = !response;
    });
  }

  public get_random_scene(): void {
    const scene = this._randomSceneGeneratorService.generate_random_scene();
    this.formFieldChange(scene.scene, 'scene');
    this.formFieldChange(scene.title, 'movieTitle');
    this.formFieldChange(scene.genre, 'movieGenre');
  }
}
