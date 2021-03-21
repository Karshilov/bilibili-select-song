import axios from 'axios';
// 无需token
export const useApi = () => {
  return axios.create({
    baseURL: 'https://netease-cloud-music-api-psi-lake.vercel.app/',
    transformResponse(data: any) {
      // 对 data 进行任意转换处理
      const parsedData = JSON.parse(data);
      return parsedData;
    },
  });
};

export const usePostImg = () => axios.create();
