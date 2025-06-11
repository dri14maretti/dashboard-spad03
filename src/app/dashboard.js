"use client";

import React, { useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';


const mockData = [
  { date: '2022-01', ibovespa: 112000, selic: 9.25, ipca: 0.54, dolar: 5.30, PETR4: 33.5, VALE3: 80.1, ITUB4: 25.4 },
  { date: '2022-02', ibovespa: 113000, selic: 10.75, ipca: 1.01, dolar: 5.15, PETR4: 34.0, VALE3: 85.3, ITUB4: 26.1 },
  { date: '2023-01', ibovespa: 113500, selic: 13.75, ipca: 0.53, dolar: 5.10, PETR4: 25.2, VALE3: 90.5, ITUB4: 25.8 },
  { date: '2023-02', ibovespa: 104900, selic: 13.75, ipca: 0.84, dolar: 5.20, PETR4: 24.8, VALE3: 85.7, ITUB4: 24.1 },
  { date: '2024-01', ibovespa: 128000, selic: 11.25, ipca: 0.42, dolar: 4.95, PETR4: 40.1, VALE3: 72.0, ITUB4: 32.5 },
];

const stockOptions = [
    { id: 'PETR4', name: 'Petrobras (PETR4)', color: '#0088FE', sector: 'Commodities' },
    { id: 'VALE3', name: 'Vale (VALE3)', color: '#00C49F', sector: 'Commodities' },
    { id: 'ITUB4', name: 'Itaú (ITUB4)', color: '#FFBB28', sector: 'Financeiro' },
    { id: 'ELET3', name: 'Eletrobras (ELET3)', color: '#FF8042', sector: 'Energético' },
];

const indicatorOptions = [
    { id: 'selic', name: 'Taxa Selic (%)', color: '#FF0000' },
    { id: 'ipca', name: 'IPCA (%)', color: '#8884d8' },
    { id: 'dolar', name: 'Dólar (R$)', color: '#82ca9d' },
];

export default function Dashboard() {
  const [selectedStocks, setSelectedStocks] = useState(['PETR4', 'VALE3', 'ITUB4']);
  const [selectedIndicators, setSelectedIndicators] = useState(['selic', 'ipca']);
  
  const handleStockToggle = (stockId) => {
    setSelectedStocks(prev => 
      prev.includes(stockId) ? prev.filter(id => id !== stockId) : [...prev, stockId]
    );
  };
  
  const handleIndicatorToggle = (indicatorId) => {
    setSelectedIndicators(prev =>
      prev.includes(indicatorId) ? prev.filter(id => id !== indicatorId) : [...prev, indicatorId]
    );
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: '#f4f6f8' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Painel de Análise de Investimentos - SPAD03</h1>
      
      <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '30px' }}>
        <KPI kpi="IBOV" value="128.000 pts" change="+0.5%" color="green" />
        <KPI kpi="SELIC" value="11,25%" change="" color="orange" />
        <KPI kpi="IPCA (12m)" value="4,50%" change="-0.1%" color="red" />
        <KPI kpi="Dólar" value="R$ 4,95" change="+1.2%" color="red" />
      </div>

      <div style={sectionStyle}>
        <h2 style={headerStyle}>Visão Geral: Influência da Taxa Selic no Ibovespa</h2>
        <p style={paragraphStyle}>A primeira análise busca entender a relação histórica entre a taxa básica de juros (Selic) e o principal índice da bolsa (Ibovespa). </p>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={mockData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" label={{ value: 'Pontos IBOV', angle: -90, position: 'insideLeft' }} />
            <YAxis yAxisId="right" orientation="right" label={{ value: 'Taxa Selic %', angle: -90, position: 'insideRight' }}/>
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="ibovespa" stroke="#004d40" name="Ibovespa" />
            <Line yAxisId="right" type="monotone" dataKey="selic" stroke="#d32f2f" name="Taxa Selic" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div style={sectionStyle}>
        <h2 style={headerStyle}>Análise Exploratória: Ações vs. Indicadores Econômicos</h2>
        <p style={paragraphStyle}>Selecione as ações e os indicadores para explorar correlações. Como a inflação afeta as ações?  Quais indicadores tem maior impacto? </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', marginBottom: '20px' }}>
            <div>
                <strong>Ações (Métricas):</strong>
                {stockOptions.map(stock => (
                    <div key={stock.id}><input type="checkbox" checked={selectedStocks.includes(stock.id)} onChange={() => handleStockToggle(stock.id)} /> {stock.name}</div>
                ))}
            </div>
            <div>
                <strong>Indicadores Econômicos:</strong>
                {indicatorOptions.map(ind => (
                    <div key={ind.id}><input type="checkbox" checked={selectedIndicators.includes(ind.id)} onChange={() => handleIndicatorToggle(ind.id)} /> {ind.name}</div>
                ))}
            </div>
        </div>

        <ResponsiveContainer width="100%" height={500}>
            <LineChart data={mockData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" unit=" R$" name="Preço (R$)" />
                <YAxis yAxisId="right" orientation="right" unit="%" name="Taxa (%)" />
                <Tooltip formatter={(value, name) => `${value}${name.includes('%') || name.includes('R$') ? '' : ' R$'}`} />
                <Legend />
                {stockOptions.filter(s => selectedStocks.includes(s.id)).map(stock => (
                    <Line key={stock.id} yAxisId="left" type="monotone" dataKey={stock.id} stroke={stock.color} name={stock.name} />
                ))}
                {indicatorOptions.filter(i => selectedIndicators.includes(i.id)).map(ind => (
                    <Line key={ind.id} yAxisId="right" type="monotone" dataKey={ind.id} stroke={ind.color} name={ind.name} strokeDasharray="3 3" />
                ))}
            </LineChart>
        </ResponsiveContainer>
      </div>

       <div style={sectionStyle}>
        <h2 style={headerStyle}>Desempenho por Setor vs. IPCA</h2>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          {['Commodities', 'Financeiro', 'Energético'].map(sector => (
            <div key={sector} style={{ width: '32%' }}>
              <h3 style={{textAlign: 'center'}}>{sector}</h3>
              <ResponsiveContainer width="100%" height={250}>
                 <LineChart data={mockData}>
                    <XAxis dataKey="date" fontSize={10}/>
                    <YAxis yAxisId="left" domain={['dataMin - 5', 'dataMax + 5']} fontSize={10}/>
                    <YAxis yAxisId="right" orientation="right" unit="%" fontSize={10} />
                    <Tooltip />
                    <Legend />
                    {stockOptions.filter(s => s.sector === sector).map(stock => (
                         <Line key={stock.id} yAxisId="left" type="monotone" dataKey={stock.id} stroke={stock.color} name={stock.name} dot={false}/>
                    ))}
                    <Line yAxisId="right" type="monotone" dataKey="ipca" stroke="#8884d8" name="IPCA" dot={false}/>
                 </LineChart>
              </ResponsiveContainer>
            </div>
          ))}
        </div>
       </div>

      <div style={sectionStyle}>
        <h2 style={headerStyle}>Tabela de Correlação (Exemplo)</h2>
        <p style={paragraphStyle}>Valores próximos de 1 indicam forte correlação positiva, e próximos de -1, forte correlação negativa.</p>
        <table style={{ width: '80%', margin: '0 auto', borderCollapse: 'collapse' }}>
            <thead>
                <tr style={{backgroundColor: '#ddd'}}>
                    <th style={tableCellStyle}>Métrica/Indicador</th>
                    <th style={tableCellStyle}>Taxa Selic</th>
                    <th style={tableCellStyle}>IPCA</th>
                    <th style={tableCellStyle}>Dólar</th>
                </tr>
            </thead>
            <tbody>
                <tr><td style={tableCellStyle}>Ibovespa</td><td style={tableCellStyle}>-0.65</td><td style={tableCellStyle}>-0.40</td><td style={tableCellStyle}>0.55</td></tr>
                <tr><td style={tableCellStyle}>VALE3</td><td style={tableCellStyle}>-0.20</td><td style={tableCellStyle}>0.15</td><td style={tableCellStyle}>0.70</td></tr>
                <tr><td style={tableCellStyle}>ITUB4</td><td style={tableCellStyle}>0.75</td><td style={tableCellStyle}>-0.50</td><td style={tableCellStyle}>-0.30</td></tr>
            </tbody>
        </table>
      </div>

    </div>
  );
}

const KPI = ({ kpi, value, change, color }) => (
    <div style={{ padding: '15px', borderRadius: '8px', textAlign: 'center', backgroundColor: 'white', minWidth: '150px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <div style={{ fontSize: '14px', color: '#666' }}>{kpi}</div>
        <div style={{ fontSize: '24px', fontWeight: 'bold', margin: '5px 0' }}>{value}</div>
        <div style={{ fontSize: '14px', color }}>{change}</div>
    </div>
);

const sectionStyle = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  marginBottom: '20px',
};

const headerStyle = {
    borderBottom: '2px solid #eee',
    paddingBottom: '10px',
    marginBottom: '15px'
};

const paragraphStyle = {
    color: '#555',
    lineHeight: '1.5'
};

const tableCellStyle = {
    border: '1px solid #ccc',
    padding: '8px',
    textAlign: 'center'
}