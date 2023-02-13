export interface IGroupInsertDTO {
  description: string;
  rules: string[];
}

export interface IAddRmPermissionOrGroupDTO {
  permission?: string;
  group?: string;
}
