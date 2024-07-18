// Kullanıcı verilerini yönetme
export const getUsers = () => {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  return users;
};

export const saveUser = (user) => {
  const users = getUsers();
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
};

// Hava durumu verilerini yönetme
export const saveWeatherData = (query, data) => {
  const storedData = JSON.parse(localStorage.getItem('weatherData')) || {};
  storedData[query] = { data, date: new Date().toISOString().split('T')[0] }; // YYYY-MM-DD formatında tarih
  localStorage.setItem('weatherData', JSON.stringify(storedData));
};

export const getWeatherData = (query) => {
  const storedData = JSON.parse(localStorage.getItem('weatherData')) || {};
  const currentDate = new Date().toISOString().split('T')[0];
  
  if (storedData[query] && storedData[query].date === currentDate) {
    return storedData[query].data;
  }
  return null;
};


