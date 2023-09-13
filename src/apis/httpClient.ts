import { AxiosInstance } from 'axios';

// interface of httpClient

// input for constructor
// 2. axios instance for server connection

// output

// 1. get(endPoint:string) : Promive<Response>

// loader을 사용해서 컴포넌트가 렌더링 되기 전, msw의 worker가 loader 함수보다 늦게 실행 되는 문제가 있어서 네트워크 에러가 발생한다
// 따라서,

class httpClient {
  private axiosInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  async get(endPoint: string) {
    try {
      const chartData = await this.axiosInstance.get(endPoint);
      const { data } = chartData;
      return data;
    } catch (error) {
      return error;
    }
  }
}

export default httpClient;
