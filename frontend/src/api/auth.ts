import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

export async function login(username: string, password: string) {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      username,
      password,
    });
    return response.data; // 返回后端响应的数据
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data); // 后端返回的错误信息
    } else {
      throw new Error("请求失败");
    }
  }
}
