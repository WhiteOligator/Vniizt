
type TCharacteristics = {
    speed: number,
    force: number,
    engineAmperage: number,
}


type TTraineList = {
    name: string,
    description: string,
    characteristics: TCharacteristics[]
};

type TMutateCharacteristics = {
    id: number,
    rows: {
        name: string,
        value: number | string
        isValid: boolean
    } []
}

type TRows = {
    name: string,
    value: number | string
    isValid: boolean
}

type TMutateTraineList = {
    name: string,
    description: string,
    characteristics: TMutateCharacteristics[]
}

export type {
    TTraineList,
    TCharacteristics,  
    TMutateTraineList,
    TMutateCharacteristics,
    TRows
}