import styles from './CustomHorizontalRadio.module.css'

export default function CustomHorizontalRadio({
    selectedValue,
    onChangeHandler,
}: {
    selectedValue: string
    onChangeHandler: (e: any) => void
}) {
    return (
        <div className={styles.styledRadioWrapper}>
            <fieldset className={styles.styledFieldset}>
                <div>
                    <input
                        type="radio"
                        id="expense"
                        name="record"
                        value="expense"
                        className={styles.styledInput}
                        checked={selectedValue === 'expense'}
                        onChange={onChangeHandler}
                    />
                    <label className={styles.styledLabel} htmlFor="expense">
                        Expense
                    </label>
                </div>

                <div>
                    <input
                        type="radio"
                        id="income"
                        name="record"
                        value="income"
                        className={styles.styledInput}
                        checked={selectedValue === 'income'}
                        onChange={onChangeHandler}
                    />
                    <label className={styles.styledLabel} htmlFor="income">
                        Income
                    </label>
                </div>

                <div>
                    <input
                        type="radio"
                        id="transfer"
                        name="record"
                        value="transfer"
                        className={styles.styledInput}
                        checked={selectedValue === 'transfer'}
                        onChange={onChangeHandler}
                    />
                    <label className={styles.styledLabel} htmlFor="transfer">
                        Transfer
                    </label>
                </div>
            </fieldset>
        </div>
    )
}
