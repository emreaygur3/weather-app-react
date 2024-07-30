import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import Pagination from '@mui/material/Pagination';
import '../css/excel.css';

function ExcelPage() {
  const [data, setData] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const arrayBuffer = e.target.result;
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      setData(jsonData);
    };

    reader.readAsArrayBuffer(file);
  };

  const fetchWeatherDataForChunk = async (chunk) => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const promises = chunk.map((datas) =>
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${datas.lat}&lon=${datas.lon}&appid=${apiKey}&units=metric`
      )
        .then((response) => response.json())
        .then((weatherDat) => ({
          city: weatherDat.name,
          temp: weatherDat.main.temp,
        }))
    );
    return Promise.all(promises);
  };

  const processQueue = async () => {
    setIsProcessing(true);
    const chunkSize =20;
    for (let i = 0; i <= (data.length+1); i += chunkSize) {
      const chunk = data.slice(i, i + chunkSize);
      try {
        const result = await fetchWeatherDataForChunk(chunk);
        setWeatherData((prevData) => [...prevData, ...result]);
      } catch (err) {
        setError('Failed to fetch weather data');
      }
      
    }
    setIsProcessing(false);
  };

  useEffect(() => {
    if (data.length > 0) {
      processQueue();
    }
  }, [data]);

  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return weatherData.slice(startIndex, endIndex);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const convertTemp = (temp) => temp.toFixed(1);

  return (
    <div className="excel-container">
      
      <input className='excel-input' type="file" accept=".xlsx,.xls" onChange={handleFileUpload} />
      <h2 className='excel-h2'>File Outputs</h2>
      {error && <p>{error}</p>}
      {isProcessing && <p>Processing data...</p>}
      <ul className='excel-ul'>
        {getPaginatedData().map((data, index) => (
          <li className='excel-li' style={{}}key={index}>
            {(currentPage - 1) * itemsPerPage + index + 1} = {data.city} --- Degree: {convertTemp(data.temp)}°C
          </li>
        ))}
      </ul>
      <Pagination
        className="pagination"
        count={Math.ceil(weatherData.length / itemsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
      />
    </div>
  );
}

export default ExcelPage;
