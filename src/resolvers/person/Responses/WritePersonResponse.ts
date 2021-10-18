import { FieldError } from "../../../resolvers/shared/Responses/FieldErrorResponse";
import { Field, ObjectType } from "type-graphql";
import { PersonResponse } from "./PersonResponse";

@ObjectType()
export class WritePersonResponse extends PersonResponse {
  @Field(() => [FieldError], { nullable: true })
  fieldErrors?: FieldError[];
}
