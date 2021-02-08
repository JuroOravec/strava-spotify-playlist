import { asyncSafeInvoke } from "../../../utils/safeInvoke";
import HandlebarsTemplateFormatter from "../HandlebarsTemplateFormatter";
import type { TemplateFormatter } from "../types";
import setOnMissingPropStringifierProxy from "./setOnMissingPropStringifierProxy";

const validateTemplate = async <TContext extends object>(
  template: string,
  options: {
    context?: TContext;
    formatter?: TemplateFormatter;
  } = {}
) => {
  const { context = {}, formatter = new HandlebarsTemplateFormatter() } = options;

  await formatter.install();

  const proxiedContext = setOnMissingPropStringifierProxy(
    context,
    'UNKNOWN'
  );

  const { result, error } = await asyncSafeInvoke(() => formatter.format(template, proxiedContext));

  return {
    result,
    error,
  };
}

export default validateTemplate;
