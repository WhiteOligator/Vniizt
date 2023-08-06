import { TMutateCharacteristics, TTraineList } from "./TrainesType"


export const validCheck = (name: string, value: string | number) => {

    const dot = typeof value === 'string' ? value.includes('.') : false
    const dotF = String(value).includes('.') 
 
    if (name === 'engineAmperage') 
       {
          if (Number(value) > 0 && (Number(value) % 1 === 0) && !dot)
              return true
          else return false
       }
    else if (name === 'force') 
       {
          if (Number(value) > 0 && !Number.isInteger(value) &&  dotF) 
             return true
          else return false
       }
    else if (name === 'speed') 
       {
          if (Number(value) >= 0 && Number.isInteger(Number(value)) && !dot) 
             return true
          else return false
       }
    else return true
 }


export const disableButton = (listCharacter: TMutateCharacteristics[]) => {
    for (const element of listCharacter) {
       for (const pole of element.rows) {
          if (!pole.isValid) {
             return false
          }
       }
    }
    return true
 }

 export const sortSpeed = (list: TMutateCharacteristics[]) => {
    let speedList: number[] = []
    list.map(elemtnt => {
       elemtnt.rows.map((pole) => {
          if (pole.name === 'speed') {
             speedList.push(Number(pole.value))
          }
       })
    }) 
    return speedList.sort((a, b) => a - b)
 }


 export const mutateTraine = (traine: TTraineList) => {
   
    return {
            name: traine.name,
            description: traine.description,
            characteristics: traine.characteristics.map((characteristic, index) => {
                return  {
                    id: index,
                    rows: [
                        {
                            name: 'engineAmperage', 
                            value: characteristic?.engineAmperage ? characteristic?.engineAmperage : 'отсутствуют данные' , 
                            isValid: validCheck('engineAmperage', characteristic?.engineAmperage ? characteristic?.engineAmperage : 'отсутствуют данные' )
                        },
                        {
                            name: 'force', 
                            value: characteristic?.force ? characteristic?.force : 'отсутствуют данные', 
                            isValid: validCheck('force', characteristic?.force ? characteristic?.force : 'отсутствуют данные' )
                        },
                        {
                            name: 'speed', 
                            value: characteristic?.speed ? characteristic?.speed : 'отсутствуют данные', 
                            isValid: validCheck('speed', characteristic?.speed ? characteristic?.speed : 'отсутствуют данные' )
                        },
                    ]
                 }
            })
        }
    
}