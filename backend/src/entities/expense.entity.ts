import {Column, Entity, JoinColumn, ManyToOne, PrimaryColumn} from "typeorm";
import {CurrencyEntity} from "./currency.entity";
import {ExpenseCategoryEntity} from "./expenseCategory.entity";
import {VatRateEntity} from "./vatRate.entity";

@Entity('expense')
export class ExpenseEntity {
    @Column({ type: "integer", nullable: true })
    amount: number;

    @ManyToOne(type => CurrencyEntity, { eager: true })
    @JoinColumn({
        name: 'currencyUid',
        referencedColumnName: 'uid',
    })
    currency: any;

    @Column({
        type: 'character varying',
        length: 255,
        nullable: true,
    })
    date: string;

    @Column({
        type: 'character varying',
        length: 255,
        nullable: true,
        name: 'descrtiption'
    })
    description: string;

    @ManyToOne(type => ExpenseCategoryEntity, { eager: true })
    @JoinColumn({
        name: 'categoryUid',
        referencedColumnName: 'uid',
    })
    expenseCategory: any;

    @Column({ type: "integer", nullable: true })
    totalAmount: number;

    @PrimaryColumn()
    uid: string;

    @Column({ type: "integer", nullable: true })
    vat: number;

    @ManyToOne(type => VatRateEntity, { eager: true })
    @JoinColumn({
        name: 'vatRateUid',
        referencedColumnName: 'uid',
    })
    vatRate: any;
}
