import Factura from "./Factura";
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

@Entity()
class Cliente {
  @PrimaryGeneratedColumn("uuid")
  @Index()
  id: string;

  @Column({ type: "varchar", length: 100 })
  nombreCliente: string;

  @Column({ type: "varchar", length: 100 })
  tipoIdentificacion: string;

  @Column({ type: "varchar", length: 100 })
  numeroIdentificacion: string;

  @Column({ type: "text" })
  observaciones: string;

  // Relacion con facturas
  @OneToMany(() => Factura, (factura) => factura.cliente)
  facturas: Factura[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default Cliente;
