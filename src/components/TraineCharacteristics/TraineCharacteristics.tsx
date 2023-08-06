import React, {memo, useEffect, useMemo, useState} from "react"
import  styles  from "./TraineCharacteristics.module.css";
import { useAppSelector } from "../../hooks/useApp";
import { getTraineSelector } from "../../redux/reducers/TrainesReducer";
import { TMutateCharacteristics, TRows} from '../../utils/TrainesType'
import { data } from "../../utils/testData";
import { disableButton, sortSpeed, validCheck } from "../../utils/fuctionTraineCharacteristics";


const errorValid = (name: string) => {
   if (name === 'engineAmperage') return 'Введите неотрицательное целое число'
      else
   if (name === 'force') return 'Введите положительное число с плавающей запятой'
      else
   if (name === 'speed') return 'Введите положительное целое число'
}

const TraineCharacteristics = () => {

   const traineList = useAppSelector(getTraineSelector)
   const [objTraines, setObjTraines] = useState<TMutateCharacteristics[]>(data)

   const [valid, setValid] = useState(true)

   useEffect(() => {
        if (traineList !== null) {
            setObjTraines(traineList.characteristics)
        }
   },[traineList])

   useEffect(() => {
      setValid(disableButton(objTraines))
   },[objTraines])

   const createIput = (field: TRows, id: number) => {
      return   <React.Fragment>
                  <input
                     className={validCheck(field.name, field.value) ? styles.valid : styles.invalid}
                     value={field.value}
                     onChange={(event) => changeTraine(id, field.name, event)} 
                  />
                  {!validCheck(field.name, field.value) && <label className={styles.errorText}>{errorValid(field.name)}</label>}
               </React.Fragment>
   }

   const trainez = useMemo(() => {
      if (objTraines !== null) {
         return objTraines.map(
            obj => {
               const cells = obj.rows.map((field => {
                  let elem = createIput(field, obj.id)
                  return <td key={field.name}>{elem}</td>;
               }))
               return <tr key={obj.id}>{cells}</tr>;
            }
         )
      } else return null
      
   },[objTraines])

   function changeTraine(id: number, name: string, event: React.FormEvent<HTMLInputElement>) {
      const newTraines =  [...objTraines]   
      const List = newTraines.map( obj => {
         if (obj.id == id) {
            const rows = obj.rows.map((field) => {
               if (field.name == name) {
                  return {...field, value: event.currentTarget.value, isValid: validCheck(name, event.currentTarget.value)}
               } else {
                  return field;
               }
            });
            return {id, rows};
         } else {
            return obj;
         }
      }) 
      setObjTraines(List)
   }

   const sendTraine = () => {
      console.log(sortSpeed(objTraines), 'Список скоростных ограничений')
   }
    
   return(
        <React.Fragment>
            {traineList !== null ?
                <div className={styles.scrollTable}>
                    <table>
                            <caption >
                                <p>Характеристики: {
                                    traineList !== null && traineList.name
                                 }</p>
                            </caption>
                            <thead>
                                <tr>
                                    <th>Ток двигателя [А]</th>
                                    <th>Сила тяги [кН]</th>
                                    <th>Скорость [км/ч]</th>
                                </tr>
                            </thead>
                            {/* <tbody className={styles.ScrollContainer}>
                               {trainez}
                            </tbody> */}
                     </table>
                     <div className={styles.scrollTableBody}>
                           <table>
                              <tbody>
                                 {trainez}
                              </tbody>
                           </table>
                     </div>
                     <button 
                           className={styles.button}
                           onClick={sendTraine}
                           disabled={!valid}
                     >
                           Отправить данные
                     </button>
                </div>
                : 
                <h1 className={styles.zagolovok}>
                    Для получения характеристик выберите поезд
                </h1>
            }
        </React.Fragment>
    );
}


export default memo(TraineCharacteristics)