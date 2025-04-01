import { Injectable } from "@nestjs/common";
import { meaningOfLife } from "@nighttrax/foo";

@Injectable()
export class AppService {
  getHello = (): string => `The meaning of life is: ${meaningOfLife}`;
}
