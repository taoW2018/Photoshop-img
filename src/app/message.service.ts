import { Injectable } from "@angular/core";
//ng generrate service message 创建出来的messageService.ts

@Injectable({
  providedIn: "root"
})
export class MessageService {
  messages: String[] = [];
  // constructor() {}
  add(message: string) {
    this.messages.push(message);
  }
  clear() {
    this.messages = [];
  }
}
