import * as bcrypt from "bcrypt";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: "varchar", length: 120 })
  public firstName: string;

  @Column({ type: "varchar", length: 120 })
  public sureName: string;

  @Column({ type: "varchar", length: 120 })
  public email: string;

  @Column({ type: "varchar", length: 120 })
  public telephone: string;

  @Column({ type: "varchar", length: 120 })
  public username: string;

  @Column({ type: "varchar", length: 120 })
  public streetAddress: string;

  @Column({ type: "varchar", length: 120 })
  public town: string;

  @Column({ type: "varchar", length: 120 })
  public country: string;

  @Column({ type: "varchar", length: 120 })
  public postcode: string;

  @Column({ type: "varchar", length: 70, nullable: true })
  password: string;
  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
  async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compareSync(password, this.password);
  }
  constructor(id: string, firstName: string, pass: string) {
    //this.id = id;
    this.firstName = firstName;
    this.password = pass;
  }

  /*
   * Create and Update Date Columns
   */

  @CreateDateColumn({ type: "timestamp" })
  public createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp" })
  public updatedAt!: Date;
}
