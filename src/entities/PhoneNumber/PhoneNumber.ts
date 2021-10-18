import { Field, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne } from "typeorm";
import { FoundationEntity } from "../FoundationEntity";
import { Person } from "../Person/Person";
import { PhoneNumberType } from "./PhoneNumberType";

@ObjectType()
@Entity()
export class PhoneNumber extends FoundationEntity {
  // Can be max length of 8 based on https://en.wikipedia.org/wiki/List_of_country_calling_codes
  @Field()
  @Column({ length: 8 })
  countryCode: string;

  @Field()
  @Column("text")
  numberType: PhoneNumberType;

  @Field()
  @Column()
  number: string;

  @Field(() => [Person])
  @ManyToOne(() => Person, (p) => p.phoneNumbers)
  person: Person;

  @Field()
  @Column()
  personId: string;
}
