import { Field, ObjectType } from "type-graphql";
import { Column, Entity, OneToOne } from "typeorm";
import { FoundationEntity } from "../FoundationEntity";
import { Person } from "../Person/Person";

@ObjectType()
@Entity()
export class MailingAddress extends FoundationEntity {
  @Field()
  @Column()
  addressLine1: string;

  @Field()
  @Column()
  addressLine2: string;

  @Field()
  @Column()
  city: string;

  @Field()
  @Column()
  postcode: string;

  @Field(() => Person)
  @OneToOne(() => Person, (p) => p.mailingAddress)
  person: Person;
}
