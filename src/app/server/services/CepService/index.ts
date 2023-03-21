import CepApi from "src/app/server/http/CepApi";
import { FindAddressRequest, FindAddressResponse } from "./CepService.types";

export default class CepService {
  public async findAddress({
    cep,
  }: FindAddressRequest): Promise<FindAddressResponse> {
    const result = await CepApi.get<FindAddressResponse>(`${cep}/json`);

    return result.data;
  }
}
