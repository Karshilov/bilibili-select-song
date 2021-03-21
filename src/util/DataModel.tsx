export interface UserInfoModel {
  roomId: string | '';
}

export interface ResultModel {
  packetLen: number;
  headerLen: number;
  ver: number;
  op: number;
  seq: number;
  body: any;
}
