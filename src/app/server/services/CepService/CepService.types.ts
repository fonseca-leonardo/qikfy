export interface FindAddressRequest {
  cep: string;
}

export interface FindAddressResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
}
