export type Event = () => {
    name: String,
    isActive: boolean,
    startDate: Date,
    endDate: Date
}