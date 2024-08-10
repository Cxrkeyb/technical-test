import Cliente from "./Cliente";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";

@Entity()
class Factura {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  // Relacion con tabla cliente
  @ManyToOne(() => Cliente, (cliente: Cliente) => cliente.facturas)
  @JoinColumn({ name: "clienteId" })
  cliente: Cliente;

  @Column({ type: "date" })
  fecha: Date;

  @Column({ type: "varchar", length: 150 })
  nombreProducto: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  precio: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  valorDescuento: number;

  @Column({ type: "decimal", precision: 5, scale: 2, default: 0 })
  iva: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  valorTotal: number;

  @CreateDateColumn()
  createdAt: Date;
}

export default Factura;
