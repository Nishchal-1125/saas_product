export interface EmailDto {
  to: string | string[];
  cc?: string | string[];
  bcc?: string | string[];
  subject: string;
  html?: string;
  text?: string;
  template?: string;
  templateData?: any;
  attachments?: Array<{
    filename: string;
    content: string;
    contentType?: string;
  }>;
}

export interface EmailTemplateDto {
  id: string;
  name: string;
  subject: string;
  html: string;
  text?: string;
  variables: string[];
}
