import fs from 'fs';
import handlebars from 'handlebars';

import { IMailTemplateProvider } from '@shared/providers/MailTemplateProvider/models';
import { IParseMailTemplateDTO } from '@shared/providers/MailTemplateProvider/dtos';

class HandlebarsMailTemplateProvider implements IMailTemplateProvider {
  async parse({ file, variables }: IParseMailTemplateDTO): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });

    const parseTemplate = handlebars.compile(templateFileContent);

    return parseTemplate(variables);
  }
}

export default HandlebarsMailTemplateProvider;
