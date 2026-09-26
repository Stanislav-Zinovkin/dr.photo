export interface ServiceOption {

    id: string;
    translationKey: string;
    price: string;
}

export const serviceConfig: ServiceOption[] = [
    {id: "portrait", translationKey: "portrait", price:"12500 PLN"},
    {id: "studio", translationKey: "studio", price:"1250010 PLN"},
    {id: "street", translationKey: "street", price:"1250055 PLN"},
]