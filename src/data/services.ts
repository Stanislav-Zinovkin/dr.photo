export interface ServiceOption {

    id: string;
    title: string;
    translationKey: string;
    price: string;
}

export const serviceConfig: ServiceOption[] = [
    {id: "portrait", title: "portrait", translationKey: "portrait", price:"12500"},
    {id: "studio", title: "studio", translationKey: "studio", price:"1250010"},
    {id: "street", title: "street", translationKey: "street", price:"1250055"},
]