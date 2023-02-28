export interface IResponseModel {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: IChoice[];
  modelUsage: IUsage;
}

export interface IChoice {
  text: string;
  index: number;
  logprobs: any;
  finish_reason: string;
}

export interface IUsage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}
