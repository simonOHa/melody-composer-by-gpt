import { Injectable } from '@angular/core';
import { Configuration, OpenAIApi } from 'openai';
import { Observable, Subject } from 'rxjs';
import { IResponseModel } from '../data-models/igptResponse';

@Injectable({
  providedIn: 'root',
})
export class OpenaiService {
  private _melody = new Subject<string>();
  private _isMelodyGenerated = new Subject<boolean>();
  response: IResponseModel | undefined;

  constructor() {}

  public get_new_melody(): Observable<string> {
    return this._melody.asObservable();
  }

  public is_melody_generated(): Observable<boolean> {
    return this._isMelodyGenerated.asObservable();
  }

  public invokeGPT(
    model: string,
    temp: number,
    max_tokens: number,
    prompt: string,
    openaiKey: string
  ) {
    const configuration = new Configuration({ apiKey: openaiKey });
    const openai = new OpenAIApi(configuration);
    const requestData = {
      model: model,
      prompt: prompt,
      temperature: temp,
      max_tokens: max_tokens,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    };

    openai
      .createCompletion(requestData)
      .then((response: any) => {
        this.response = response.data as IResponseModel;
        this._melody.next(this.response.choices[0].text);
        this._isMelodyGenerated.next(true);
      })
      .catch((error: any) => {
        console.error(error.message);
        console.error(error.response.status, error.response.data);
      });
  }
}
