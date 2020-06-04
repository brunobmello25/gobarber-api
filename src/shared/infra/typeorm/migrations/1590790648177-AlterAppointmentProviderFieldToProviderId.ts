import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AlterAppointmentProviderFieldToProviderId1590790648177
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('Appointments', 'provider');

    await queryRunner.addColumn(
      'Appointments',
      new TableColumn({
        name: 'providerId',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'Appointments',
      new TableForeignKey({
        name: 'AppointmentProvider',
        columnNames: ['providerId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('Appointments', 'AppointmentProvider');

    await queryRunner.dropColumn('Appointments', 'providerId');

    await queryRunner.addColumn(
      'Appointments',
      new TableColumn({
        name: 'provider',
        type: 'varchar',
      }),
    );
  }
}
