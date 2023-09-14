import { AxiosInstance } from 'axios';

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
