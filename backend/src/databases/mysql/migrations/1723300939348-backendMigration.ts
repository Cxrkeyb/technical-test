import { MigrationInterface, QueryRunner } from "typeorm";

export class BackendMigration1723300939348 implements MigrationInterface {
    name = 'BackendMigration1723300939348'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`factura\` (\`id\` varchar(36) NOT NULL, \`fecha\` date NOT NULL, \`nombreProducto\` varchar(150) NOT NULL, \`precio\` decimal(10,2) NOT NULL, \`valorDescuento\` decimal(10,2) NOT NULL DEFAULT '0.00', \`iva\` decimal(5,2) NOT NULL DEFAULT '0.00', \`valorTotal\` decimal(10,2) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`clienteId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`cliente\` (\`id\` varchar(36) NOT NULL, \`nombreCliente\` varchar(100) NOT NULL, \`tipoIdentificacion\` varchar(100) NOT NULL, \`numeroIdentificacion\` varchar(100) NOT NULL, \`observaciones\` text NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`IDX_18990e8df6cf7fe71b9dc0f5f3\` (\`id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`factura\` ADD CONSTRAINT \`FK_18f5b9afa9f243da011f27d7763\` FOREIGN KEY (\`clienteId\`) REFERENCES \`cliente\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`factura\` DROP FOREIGN KEY \`FK_18f5b9afa9f243da011f27d7763\``);
        await queryRunner.query(`DROP INDEX \`IDX_18990e8df6cf7fe71b9dc0f5f3\` ON \`cliente\``);
        await queryRunner.query(`DROP TABLE \`cliente\``);
        await queryRunner.query(`DROP TABLE \`factura\``);
    }

}
