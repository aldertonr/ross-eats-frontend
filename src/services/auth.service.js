import axios from 'axios';
import config from '../config';
import EventBus from '../libs/EventBus';

const { API_URL } = config;

const register = (username, email, password) => axios.post(`${API_URL}signup`, {
  username,
  email,
  password,
});

const login = async (username, password) => {
  try {
    const resp = await axios.post(`${API_URL}/account/login`, {
      username,
      password,
    });

    if (resp.status === 200) {
      localStorage.setItem('user', resp.data.username);
      localStorage.setItem('token', resp.data.JWT);
      return resp.data;
    }
    return resp;
  } catch (error) {
    return error.response.data;
  }
};

const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  EventBus.dispatch('logout');
  EventBus.dispatch('toast', { message: 'Logged out', level: 'info' });
};

const getCurrentUser = () => {
  let user;
  let token;
  try {
    user = localStorage.getItem('user');
    token = localStorage.getItem('token');
  } catch (error) {
    console.log(error);
    user = null;
  }

  return { user, token };
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
