export class UserEntity {
  id: string;
  username: string;
  age?: number;
  email: string;
  country: string;
  password: string;
}

// import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// @Entity()
// export class UserEntity {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @Column()
//   username: string;

//   @Column({ nullable: true })
//   age?: number;

//   @Column()
//   email: string;

//   @Column()
//   country: string;

//   @Column()
//   password: string;
// }
