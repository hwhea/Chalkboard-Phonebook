import { ObjectType, Field } from "type-graphql";
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 } from "uuid";
@ObjectType()
@Entity()
export abstract class FoundationEntity extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string = v4();

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
