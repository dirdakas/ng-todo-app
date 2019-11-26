export interface IGlobalNotification {
  id: number;
  message: string;
  isClosable: boolean;
  type: string;
  autoCloseTime?: number;
}
