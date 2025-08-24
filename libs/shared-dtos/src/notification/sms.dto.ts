export interface SmsDto {
  to: string;
  message: string;
  template?: string;
  templateData?: any;
}

export interface SmsTemplateDto {
  id: string;
  name: string;
  message: string;
  variables: string[];
}
