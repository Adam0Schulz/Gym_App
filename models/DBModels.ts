export interface WorkoutPlan {
    name: string,
    categories: string[],

}


export interface Workout {
    id?: string,
    name: string,
    category: string,
    exercises: Exercise[],
    date: Date,
    note?: string
    
}

export interface Exercise {
    id?: string,
    name: string
    sets: Set[]
}


export interface Set {
    id?: string,
    reps: number,
    rest?: number, //seconds
    weight: number //kilograms
}