export type TGetMultipleResults<T> = {
  success: boolean,
  data: T[],
  error?: string
}

export type TGetSingleResult<T> = {
  success: boolean;
  data: T;
  error?: string
}

export type TAddResult<T> = {
  success: boolean;
  data: T;
  error?: string
}

export type TUpdateResult<T> = {
  success: boolean;
  data: T;
  error?: string
}

export type TDeleteResult = {
  success: boolean;
  error?: string
}