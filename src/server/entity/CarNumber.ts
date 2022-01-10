const { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } = require("typeorm");

@Entity()
export class CarNumber {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: "0x0001" })
  boardId: string;

  @Column({ charset: "utf8mb4" })
  modelName: string;

  @Column({ charset: "utf8mb4" })
  version: string;

  @Column({ charset: "utf8mb4" })
  driverlicense: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;
}