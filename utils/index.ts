export const validateFormData = (formDataValidate: Record<string, boolean>) => Object.keys(formDataValidate).some(key => !formDataValidate[key]);

export const strMin = (value: string, min: number) => value.length >= min;

export const isWebUrl = (value: string) => /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/.test(value);

export const removeSpecialCharacters = (value: string) => value.replace(/[^\w\s]/gi, "");