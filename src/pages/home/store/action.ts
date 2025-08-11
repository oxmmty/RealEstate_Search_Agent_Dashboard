import { apiGetRealEstates } from '@/api/pages/home.api';
import { setHomepageState } from './reducer';
import { createAsyncAction } from '@/stores/utils';
import { DataRequest } from '@/interface/data/home.interface';

// typed wrapper async thunk function demo, no extra feature, just for powerful typings
export const GetRealEstatesAsync = createAsyncAction<DataRequest, boolean>((data) => {
  return async dispatch => {
    const { result, status } = await apiGetRealEstates(data);

    if (status) {
      dispatch(
        setHomepageState({
          data: result.data,
          total: result.total
        }),
      );

      return true;
    }

    dispatch(
      setHomepageState({
        data: []
      }),
    );
    return false;
  };
});
