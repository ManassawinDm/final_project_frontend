export interface TransferRequest {
    request_officeId: number;
    request_office: string;
    reason: string;
}

export interface responseType {
    userId: number;
    prename: string;
    firstname: string;
    lastname: string;
    age: number | null;
    currenOffice: string;
    position: string;
    currentPositionDateDay: number | null,
    currentPositionDateMonth: number | null,
    currentPositionDateYear: number | null,
    currenClass: string;
    targetClass:number;
    requested_class: string | null;
    home_province: string | null;
    relationship_status: string | null;
    house_number: string | null;
    village_number: string | null;
    alley_soi: string | null,
    street: string | null,
    province: string | null;
    district: string | null;
    subdistrict: string | null;
    postal_code: string | null;
    phone_number: string | null;
    address_type: string | null;
    spouse_name: string | null;
    spouse_office: string | null;
    spouse_house_number: string | null;
    spouse_village_number: string | null;
    spouse_alley_soi: string | null,
    spouse_street: string | null,
    spouse_province: string | null;
    spouse_district: string | null;
    spouse_subdistrict: string | null;
    spouse_postal_code: string | null;
    spouse_phone_number: string | null;
    work_history: string | null;
    work_history_startDate: string | null;
    work_history_endDate: string | null;
    work_history_position: string | null;
    work_history_two: string | null;
    work_history_startDate_two: string | null;
    work_history_endDate_two: string | null;
    work_history_position_two: string | null;
    work_history_three: string | null;
    work_history_startDate_three: string | null;
    work_history_endDate_three: string | null;
    work_history_position_three: string | null;
    transfer_requests: TransferRequest[];
}

export interface responseTypeOffice {
    id:number;
    name:string
}

export interface responseTypeRequest {
    id:number;
    officeId:number;
    officename:string;
    reason:string;
    requested_class:number;
}