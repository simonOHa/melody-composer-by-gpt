import { IRandomMelody } from './irandomMelody';

export class RandomMelody {
  private randomMelodies: Array<IRandomMelody>;
  private counter = 0;

  constructor() {
    this.randomMelodies = this.build_melodies();
  }

  public get_random_melody(): IRandomMelody {
    const melody = this.randomMelodies[this.counter];
    this.counter++;
    if (this.counter > this.randomMelodies.length - 1) {
      this.counter = 0;
    }
    return melody;
  }

  private build_melodies(): Array<IRandomMelody> {
    const randomMelodies = Array<IRandomMelody>();
    const scene1: IRandomMelody = {
      source: 'https://abcnotation.com/examples',
      melody: `X:1\nT:Paddy O'Rafferty (Jig)\nC:Trad.\nO:Irish\nR:Jig\nM:6/8\nK:D\ndff cee|def gfe|dff cee|dfe dBA|\ndff cee|def gfe|faf gfe|1 dfe dBA:|2 dfe dcB|]\n~A3 B3|gfe fdB|AFA B2c|dfe dcB|\n~A3 ~B3|efe efg|faf gfe|1 dfe dcB:|2 dfe dBA|]\nfAA eAA|def gfe|fAA eAA|dfe dBA|\nfAA eAA|def gfe|faf gfe|dfe dBA:|`,
    };
    const scene2: IRandomMelody = {
      source: 'https://abcnotation.com/examples',
      melody: `X:1 % tune no 1\nT:Dusty Miller (commented) % title\nT:Binny's Jig % an alternative title\nC:Trad. % traditional\nO:English % origin\nR:DH % double hornpipe\nM:3/4 % meter\nK:G % key\nB>cd BAG|FA Ac BA|B>cd BAG|DG GB AG:|\nBdd gfg|aA Ac BA|Bdd gfa|gG GB AG:|\nBG G/2G/2G BG|FA Ac BA|BG G/2G/2G BG|DG GB AG:|\nW:Hey, the dusty miller, and his dusty coat;\nW:He will win a shilling, or he spend a groat.\nW:Dusty was the coat, dusty was the colour;\nW:Dusty was the kiss, that I got frae the miller.`,
    };
    const scene3: IRandomMelody = {
      source: 'https://abcnotation.com/examples',
      melody: `X:1\nT:Jericho (hidden voice)\nT:Joshua fought the battle of Jericho\nN:using a hidden voice to separate out the chord symbols\nC:Anon.\nM:C\nL:1/8\nR:Hornpipe\n%%MIDI transpose -14\n%%staves (melody chords)\nK:Dm\nV:melody\n%%MIDI program 67\nD^CDE FF G2|A A2 A-A4|G G2 G-G4|A A2 A-A4|\nD^CDE FF G2|A A2 A-A2 FG|A2 G2 F2 E2|D6"^Fine"||dd|\ndA AA A3 A|A A3- A2 AA|AA AA A2 A2|A6 ^c2|\nd2 A2 A A3|A2 A2- A2 AA|AA G2 E2 D2|D8|]\nV:chords\n%%MIDI chordprog 1 octave=2\n%%MIDI bassprog 1 octave=2\n"Dm"x4     x4 | "Dm"x4     x4 | "A7"x4     x4 | "Dm"x4 x4 |\n"Dm"x4     x4 | "Dm"x4     x4 | "A7"x4     x4 | "Dm"x4 x4 |\n"Dm"x4     x4 | "Dm"x4 "A7"x4 | "Dm"x4     x4 | "A7"x4 x4 |\n"Dm"x4 "A7"x4 | "Dm"x4 "A7"x4 | "Dm"x4 "A7"x4 | "Dm"x4 x4 |]`,
    };

    randomMelodies.push(scene1, scene2, scene3);
    return randomMelodies;
  }
}
