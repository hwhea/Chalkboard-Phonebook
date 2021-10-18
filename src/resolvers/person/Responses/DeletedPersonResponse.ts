import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class DeletedPersonResponse {
  @Field({ nullable: true })
  error?: string;
  @Field({ nullable: true })
  deletedId?: string;
}
