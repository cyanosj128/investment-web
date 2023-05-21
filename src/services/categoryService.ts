import { API } from '.';
import { Category, CategoryWithItems } from '@/models/Category';

export async function getAllCategories(): Promise<
  CategoryWithItems[] | undefined
> {
  try {
    return (await API.get<CategoryWithItems[]>('/category')).data;
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

export async function postNewCategory(newCategory: Omit<Category, 'id'>) {
  try {
    const resp = await API.post('/category', newCategory);
    return resp.data;
  } catch (err) {
    console.log(err);
  }
}
