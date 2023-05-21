import { API } from '.';
import { Currency } from '@/models/Currency';

export async function getAllCurrencies(): Promise<Currency[] | undefined> {
  try {
    return (await API.get<Currency[]>('/currency')).data;
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

export async function postNewCurrency(newCurrency: Omit<Currency, 'id'>) {
  try {
    const resp = await API.post('/currency', newCurrency);
    return resp.data;
  } catch (err) {
    console.log(err);
  }
}
