import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity('expenseCategory')
export class ExpenseCategoryEntity {
    @Column({
        type: 'character varying',
        length: 255,
        nullable: true,
    })
    label: string;

    @PrimaryColumn()
    uid: string;

    @Column({
        type: 'character varying',
        length: 255,
        nullable: true,
    })
    icon: string;
}
