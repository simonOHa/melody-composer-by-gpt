import { Component, OnInit } from '@angular/core';
import { OpenaiService } from '../services/openai.service';
import '../../assets/abcjs-basic-min.js';
import { RandomSceneMelodyGeneratorService } from '../services/random-scene-melody-generator.service';
declare let ABCJS: any;

/**
 * Source of this ABC Music editior and player:
 * https://www.abcjs.net/
 */
@Component({
  selector: 'app-melody-player',
  templateUrl: './melody-player.component.html',
  styleUrls: ['./melody-player.component.sass'],
})
export class MelodyPlayerComponent implements OnInit {
  visualOptions = {
    //oneSvgPerLine: true,
    // initialClef: true,
    // hint_measures: true,
    add_classes: true,
    responsive: 'resize',
  };

  controlOptions = {
    displayRestart: true,
    displayPlay: true,
    displayProgress: true,
    displayClock: true,
    displayLoop: true,
    displayWarp: true,
  };

  abcString = '';
  visualObj: any;
  synthControl: any | undefined;
  cursor_contron = new CursorControl();

  constructor(
    private _openaiService: OpenaiService,
    private _randomMelodyGeneratorService: RandomSceneMelodyGeneratorService
  ) {}

  ngOnInit(): void {
    this._openaiService.get_new_melody().subscribe((melody: string) => {
      this.abcString = melody;
      this.visualObj = ABCJS.renderAbc(
        'paper',
        this.abcString,
        this.visualOptions
      );

      if (ABCJS.synth.supportsAudio()) {
        this.synthControl = new ABCJS.synth.SynthController();
        this.synthControl.load(
          '#audio',
          this.cursor_contron,
          this.controlOptions
        );
        this.synthControl.disable(true);
        this.build_midi_player();
      } else {
        console.log('audio is not supported on this browser');
      }
    });
  }

  public onValueChange(event: Event): void {
    this.abcString = (event.target as any).value;
    this.visualObj = ABCJS.renderAbc(
      'paper',
      this.abcString,
      this.visualOptions
    );
    this.build_midi_player();
  }

  public build_midi_player(): void {
    if (this.synthControl == undefined) {
      this.synthControl = new ABCJS.synth.SynthController();
      this.synthControl.load(
        '#audio',
        this.cursor_contron,
        this.controlOptions
      );
      this.synthControl.disable(true);
    }

    const midiBuffer = new ABCJS.synth.CreateSynth();
    midiBuffer
      .init({
        visualObj: this.visualObj[0],
        options: {
          program: 56,
          chordsOff: false,
        },
      })
      .then(() => {
        this.synthControl
          .setTune(this.visualObj[0], true)
          .then((response: any) => {
            console.log(response);
          });
      });
  }

  public get_random_melody(): void {
    const melody = this._randomMelodyGeneratorService.generate_random_melody();
    this.abcString = melody.melody;
    this.visualObj = ABCJS.renderAbc(
      'paper',
      this.abcString,
      this.visualOptions
    );
    this.build_midi_player();
  }
}

/**
 * See documentation at : https://paulrosen.github.io/abcjs/audio/synthesized-sound.html#cursorcontrol-object
 */
export class CursorControl {
  beatSubdivisions = 2;

  public onReady() {}
  public onStart() {
    const svg = document.querySelector('#paper svg');
    const cursor = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'line'
    );
    cursor.setAttribute('class', 'abcjs-cursor');
    cursor.setAttributeNS(null, 'x1', String(0));
    cursor.setAttributeNS(null, 'y1', String(0));
    cursor.setAttributeNS(null, 'x2', String(0));
    cursor.setAttributeNS(null, 'y2', String(0));
    if (svg != undefined) {
      svg.appendChild(cursor);
    }
  }

  public onBeat(beatNumber: any, totalBeats: any, totalTime: any): void {}
  public onEvent(ev: any) {
    if (ev.measureStart && ev.left === null) return; // this was the second part of a tie across a measure line. Just ignore it.

    const lastSelection = document.querySelectorAll('#paper svg .highlight');
    for (let k = 0; k < lastSelection.length; k++)
      lastSelection[k].classList.remove('highlight');

    for (let i = 0; i < ev.elements.length; i++) {
      const note = ev.elements[i];
      for (let j = 0; j < note.length; j++) {
        note[j].classList.add('highlight');
      }
    }

    const cursor = document.querySelector('#paper svg .abcjs-cursor');
    if (cursor) {
      cursor.setAttribute('x1', String(ev.left - 2));
      cursor.setAttribute('x2', String(ev.left - 2));
      cursor.setAttribute('y1', ev.top);
      cursor.setAttribute('y2', ev.top + ev.height);
    }
  }
  public onFinished() {
    const els = document.querySelectorAll('svg .highlight');
    for (let i = 0; i < els.length; i++) {
      els[i].classList.remove('highlight');
    }
    const cursor = document.querySelector('#paper svg .abcjs-cursor');
    if (cursor) {
      cursor.setAttribute('x1', String(0));
      cursor.setAttribute('x2', String(0));
      cursor.setAttribute('y1', String(0));
      cursor.setAttribute('y2', String(0));
    }
  }
}
