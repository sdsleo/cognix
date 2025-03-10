export interface ISummary {
    all: string | number;
    myPendings: string | number;
    alternativePendings: string | number;
}
export interface IPendingSummary {
    summary: ISummary;
    setFilter: (data: any) => any;
}