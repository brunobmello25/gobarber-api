import handlebars from 'handlebars';

import { IMailTemplateProvider } from '@shared/providers/MailTemplateProvider/models';
import { IParseMailTemplateDTO } from '@shared/providers/MailTemplateProvider/dtos';

class HandlebarsMailTemplateProvider implements IMailTemplateProvider {
  async parse({ template, variables }: IParseMailTemplateDTO): Promise<string> {
    const parsedTemplate = handlebars.compile(template);

    return parsedTemplate(variables);
  }
}

export default HandlebarsMailTemplateProvider;
