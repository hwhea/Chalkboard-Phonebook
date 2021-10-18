import { Field, ObjectType } from "type-graphql";
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { FoundationEntity } from "../FoundationEntity";
import { MailingAddress } from "../MailingAddress/MailingAddress";
import { PhoneNumber } from "../PhoneNumber/PhoneNumber";

@ObjectType()
@Entity()
export class Person extends FoundationEntity {
  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field(() => [PhoneNumber])
  @OneToMany(() => PhoneNumber, (pn) => pn.person, { cascade: true })
  phoneNumbers: PhoneNumber[];

  @Field()
  @Column()
  emailAddress: string;

  @Field(() => MailingAddress)
  @OneToOne(() => MailingAddress, (ad) => ad.person, {
    cascade: true,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  mailingAddress: MailingAddress;
}
