import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createOrphanages1602637527770 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    // método que realiza alterações como:
    // Criar uma nova tabela, criar um novo campo, deletar algum campo
    await queryRunner.createTable(new Table({
      name: 'orphanages',
      columns: [
        {
          name: 'id',
          type: 'integer',
          unsigned: true, // sempre número positivo
          isPrimary: true, // primary Key
          isGenerated: true, // essa coluna(id) vai ser gerada automatica
          generationStrategy: 'increment', // AutoIncrementavel aumentar o
          // id a cada registro(1, 2, 3 ...)
        },
        {
          name: 'name',
          type: 'varchar',
        },
        {
          name: 'latitude',
          type: 'decimal', // FLOAT
          scale: 10, // números depois da vírgula
          precision: 2, // números antes da vírgula
        },
        {
          name: 'longitude',
          type: 'decimal', // FLOAT
          scale: 10, // números depois da vírgula
          precision: 2, // números antes da vírgula
        },
        {
          name: 'about', // informações do orfanato
          type: 'text',
        },
        {
          name: 'instructions', // instruções para visita
          type: 'text',
        },
        {
          name: 'opening_hours',
          type: 'varchar'
        },
        {
          name: 'open_on_weekends', // se é aberto nos finais de semana
          type: 'boolean',
          default: false, // por padrão os orfanatos não vão abrir nos
          // finais de semana
        }
      ],
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // método que desfaz o que foi feito no método up
    await queryRunner.dropTable('orphanages');
  }
}
