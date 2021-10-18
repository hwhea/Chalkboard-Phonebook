import { Address } from "cluster";
import { Field, ObjectType } from "type-graphql";
import { Column, Entity, OneToMany, OneToOne } from "typeorm";
import { FoundationEntity } from "../FoundationEntity";
import { MailingAddress } from "../MailingAddress/MailingAddress";
import { PhoneNumber } from "../PhoneNumber/PhoneNumber";

@ObjectType()
@Entity()
export class Person extends FoundationEntity {
  @Field()
  @Column()
  name: string;

  @Field(() => [PhoneNumber])
  @OneToMany(() => PhoneNumber, (pn) => pn.person)
  phoneNumbers: PhoneNumber[];

  @Field()
  @Column()
  emailAddress: string;

  @Field(() => MailingAddress)
  @OneToOne(() => MailingAddress, (ad) => ad.person)
  mailingAddress: Address;
}
