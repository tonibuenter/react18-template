export const isError = (error: any): error is Error => {
  return typeof error.message === 'string' && typeof error.name === 'string';
};

export interface StatusMessage{
  status:'success'|'warning'|'error';
  userMessage:string;
  systemMessages?:string[];
}
