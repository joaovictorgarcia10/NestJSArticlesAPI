import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/entities/user.entity";

export class Article {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string | null;

  @ApiProperty()
  published: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  authorId: number | null;

  @ApiProperty()
  author?: User;
}
