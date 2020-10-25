import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createImages1602874970150 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'images',
      columns: [
        {
          name: 'id',
          type: 'integer',
          unsigned: true,
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'path',
          type: 'varchar'
        },
        {
          name: 'orphanage_id',
          type: 'integer',
        }
      ],
      foreignKeys: [
        {
          name: 'ImageOrphanage', // é opicional
          columnNames: ['orphanage_id'],
          referencedTableName: 'orphanages', // qual tabela ela está se relacionando
          referencedColumnNames: ['id'], // qual a coluna na tabela de orphanages que o orphanage_id está selecionando 
          onUpdate: 'CASCADE', // de o id do orfanato mudar o id na chave estrangeira orphanage_id também vai ser alterada 
          onDelete: 'CASCADE', // se o orfanato for deletado as imagens relacionadas a ele também vaõ ser deletadas
        }
      ]
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('images');
  }
}
