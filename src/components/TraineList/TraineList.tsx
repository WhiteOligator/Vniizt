import styles from './TraineList.module.css'
import React, { memo, useMemo, useState } from 'react';
import { TMutateTraineList, TTraineList } from '../../utils/TrainesType';
import { useAppDispatch } from '../../hooks/useApp';
import { setTraine } from '../../redux/reducers/TrainesReducer';

type TrainesProps = {
    traines: TTraineList[]
}

const TraineList = (
    {traines}: TrainesProps
) => {

    const dispatch = useAppDispatch()

    const traineList = [...traines].slice(0, 20)

    const [tr, setTr] = useState<number | null>(null)

    const keyGenerate = (stroke: TTraineList) => {
        return  `${stroke.name}-${stroke.description}`
    }

    const handleClick = (index: number) => {
        setTr(index)
        dispatch(setTraine(traineList[index]))
    }

    return (
            <table className={`${styles.table} ${styles.mtb3}`}>
                <caption>
                    <p>Поезда</p>
                </caption>
                <thead>
                    <tr>
                        <th>Название</th>
                        <th>Описание</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        traineList.map((line, index) => 
                            <React.Fragment key={keyGenerate(line)}>
                                {tr === index ? 
                                    <tr onClick={() => handleClick(index)} className={styles.activeTr}>
                                        <td>{line.name}</td>
                                        <td>{line.description}</td>
                                    </tr>
                                    :
                                    <tr onClick={() => handleClick(index)}>
                                        <td>{line.name}</td>
                                        <td>{line.description}</td>
                                    </tr>
                                }
                            </React.Fragment>
                        )
                    }
                </tbody>
            </table>
    );
    
}

export default memo(TraineList)