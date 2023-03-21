import { useCallback, useEffect, useState } from "react";
import { FindAddressResponse } from "src/app/server/services/CepService/CepService.types";
import CepService from "src/app/server/services/CepService";

export function useCep(cep: string) {
  const [addressState, setAddressState] = useState<FindAddressResponse>();
  const [cepLoading, setCepLoading] = useState(false);

  const fetchAddress = useCallback(async (searchCep: string) => {
    try {
      setCepLoading(true);
      const cepService = new CepService();

      const address = await cepService.findAddress({ cep: searchCep });

      setAddressState(address);
    } catch (error) {
      alert("Erro ao buscar cep");
    } finally {
      setCepLoading(false);
    }
  }, []);

  return { address: addressState, fetchAddress, cepLoading };
}
