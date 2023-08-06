import React, { useEffect, useState } from 'react';
import styles from './App.module.css';
import  Header  from '../Header/Header';
import { useAppDispatch, useAppSelector } from '../../hooks/useApp';
import { getTrainesSelector, getTrainesThunk } from '../../redux/reducers/TrainesReducer';
import  TraineList  from '../TraineList/TraineList';
import TraineCharacteristics from '../TraineCharacteristics/TraineCharacteristics';

export const App = () => {

    const dispatch = useAppDispatch();
    const {traines, loading, selectedTraine} = useAppSelector(getTrainesSelector)
  
    useEffect(() => {
        dispatch(getTrainesThunk())
    },[])

    return (
        <div className={styles.content}>
            <Header />
            {!loading && traines ?
                
                    <React.Fragment>
                        <TraineList 
                            traines = {traines}
                        />
                        <TraineCharacteristics />
                    </React.Fragment>
                :
                    <p>loading</p>
            }
            
        </div>
    );
}

export default App;