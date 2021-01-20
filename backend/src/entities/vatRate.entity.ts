import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity('vatRate')
export class VatRateEntity {
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
    rate: string;
}
