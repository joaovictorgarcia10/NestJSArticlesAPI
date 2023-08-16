import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";

export class User {
  @ApiProperty()
  id?: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @Exclude()
  password: string;
}