import { API } from '.';
// import { RawLotto } from '@/models/interface';

// export type LottoOrder = 'ASC' | 'DSC';

// export async function getLottos(order: LottoOrder) {
//   const lottoOrder = order === 'ASC' ? 'asc' : 'desc';
//   try {
//     const resp = await API.get<RawLotto[]>('/lottos/histories/' + lottoOrder);
//     return resp.data;
//   } catch (err) {
//     console.log(err);
//   }
// }

// export async function updateLottos() {
//   try {
//     const resp = await API.get('/lottos/updates');
//     return resp.data;
//   } catch (err) {
//     console.log(err);
//   }
// }
