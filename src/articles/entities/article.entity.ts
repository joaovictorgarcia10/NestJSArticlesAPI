import { User } from "src/users/entities/user.entity";

export class Article {
  id: number;
  title: string;
  description: string | null;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  authorId: number | null;
  author?: User;
}
