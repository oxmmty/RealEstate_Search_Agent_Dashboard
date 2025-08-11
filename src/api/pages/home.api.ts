import type { RealEstateItem } from '@/interface/data/home.interface';

import { request } from '../request';
import { API_BASE } from '@/config/path';
import { DataRequest } from '@/interface/data/home.interface';

export const apiGetRealEstates = (data: DataRequest) => request<{data: RealEstateItem[], total: number}>('post', `${API_BASE}dashboard/data`, data);
