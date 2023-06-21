import { useValidationsBR, } from "validations-br";

type FunctionValidate = (value: any) => boolean

interface ObjValidate {
  [key: string]: {
    message?: string;
    validate?: string | FunctionValidate;
  }
}

type RuleValidation<T = any, K = keyof T> = {
  // @ts-ignore
  [key in K]: {
    required?: boolean;
    message?: string;
    validate?: string | FunctionValidate | ObjValidate;
  };
};

export function useValidate<T = any>(rule: RuleValidation<T>){
  function validate(data: any){
    return new Promise<string[] | void>(async (resolve, reject) => {
      const erros = [] as string[];

      if(!data || typeof data !== "object"){
        await Object.keys(rule).filter(async key => {
          // @ts-ignore
          if(rule[key]?.required){
            erros.push(key.concat(" is required"));
          }
        });

        return reject(erros.join(", "));
      }

      Object.keys(data).forEach(k => {
        const ruleKeys = Object.keys(rule);

        if(!ruleKeys.includes(k)){
          erros.push(`${k} is not acceptable`);
        }

        if(erros.length){
          return reject(erros.join(", "));
        }
      });

      await Object.keys(rule).filter(async key => {
        let error = false;

        if(data[key] !== undefined){
          // @ts-ignore
          if(typeof rule[key]?.validate === "string"){
            // @ts-ignore
            if(!useValidationsBR(rule[key]?.validate, data[key])){
              error = true;
            }
          }
          // @ts-ignore
          else if(typeof rule[key]?.validate === "object"){
            // @ts-ignore
            await Object.keys(rule[key].validate).forEach(async vKey => {
              // @ts-ignore
              if(rule[key].validate[vKey]["validate"] && await !rule[key].validate[vKey].validate(data[key])){
                // @ts-ignore
                erros.push(`[${vKey}] -> ${rule[key].validate[vKey].message}`);
              }
            });
          }

          else{
            // @ts-ignore
            if((rule[key]["validate"] && await !rule[key].validate(data[key]))){
              error = true;
            }
          }
        }else{
          // @ts-ignore
          if(rule[key]?.required){
            erros.push(key.concat(" is required"));
          }
        }

        // @ts-ignore
        if(error) erros.push(rule[key].message);
      });

      if(erros.length){
        return reject(erros.join(", "));
      }else{
        return resolve();
      }
    });
  }

  return { validate };
}

