import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity('currency')
export class CurrencyEntity {
    @PrimaryColumn()
    uid: string;

    @Column({
        type: 'character varying',
        length: 255,
        nullable: true,
    })
    code: string;

    @Column({ type: "integer", nullable: true })
    rate: number;
}
