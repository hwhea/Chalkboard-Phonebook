import { Person } from "../../../entities/Person/Person";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class DeletedPersonResponse {
  @Field({ nullable: true })
  error?: string;
  @Field({ nullable: true })
  deletedId?: string;
}
