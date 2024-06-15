export interface Datum {
  [i: number]: never;
  [k: string]: boolean | number | string | null | Date;
}

export type Data = Datum[];
