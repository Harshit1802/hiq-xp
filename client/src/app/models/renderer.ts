
export interface Page {
    pageTitle: string;
    breadcrumbs: Breadcrumb[],
    pageActions: PageAction,
    filter: FilterControls[],
    table: Table,
    formConfig: FormConfig;
    
    popupConfig: PopupConfig;
}
export interface PopupConfig {
    parentPageJson: string;
    onPopupClose: string;
    defaultData:string;
    footerActions: PageAction;
}

export interface Breadcrumb {
    menuName: string;
    url?: string;
}

export interface PageAction {
    action: string;
    options?: any;
    type: string;
    label?: string;
    icon?: string;
    isDisabled:boolean;
    event?: PageActionEvent;

}
export interface PageActionEvent {
    type: string;
    onevent?: string;
    popupJson?: string;
    api:string;
    popupwidth:string;
    postSchema:any;
}


export interface Table {
    dataSource: string;
    tableColumns: GridColumn[];
    data: any;
}

export interface FormConfig {
    rows: Row[]
}

export interface Row {
    columns: Column[];
    css: string;
}
export interface Column {
    width: number;
    controls: ControlConfig[];
}

export interface ControlConfig {
    id: string,
    label?: string,
    type: string,
    fieldId: string,
    placeholder?: string,
    tooltip?: string,
    validations?: ControlValidation[],
    isDisabled?: boolean,
    isVisible?: boolean,
    isChangeHandle?: boolean,
    css?: string;
    value?: any;
    options?: Option;
    properties?:ControlProperties
}
export interface ControlProperties {
    multiple: boolean;
}

export interface ControlValidation {
    type: string;
    length:string;
    message: string;
}
export interface Option {
    dataSource: string;
    dataSourceType: string;
    textField: string;
    valueField: string;
    list: any[];
}
export interface GridColumn {
    key: string;
    title: string;
    compare?: any;
    priority?: number | boolean;
    dataType?: string;
    statusColumn?: boolean;
    actionItems?: PageAction[];
    restrictText?: boolean;
    options?: any;
    screen?: any;
    moreActionItems?: any[];
}

export interface FilterControls {
    name: string;
    placeholder: string | string[] | null;
    type: string;
    options?: DropDownOptions[];
    value?: string;
    defaultValue?: string;
    format?: string;
}
export interface DropDownOptions {
    text: string;
    value: string;
    selected?: boolean;
}
export interface NavItem {
    menuName: string;
    url: string;
}

// export interface PageAction {
//     action: string;
//     options?: any;
// }

export interface GridPagination {
    total: number,
    page: number,
    pageSize: number;
}

