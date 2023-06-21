import axios, { AxiosResponse, } from "axios";

export function useViaCep(){
  const fetchAddress = (zipCode: string) => {
    return new Promise<AxiosResponse<ViaCepApiResponse, any>>(async (resolve, reject) => {
      const res = await axios.get<ViaCepApiResponse>(`https://viacep.com.br/ws/${zipCode}/json`);

      if (res.status === 200 && res?.data?.cep) {
        return resolve(res);
      }

      return reject();
    });
  };

  return { getAddress: fetchAddress };
}