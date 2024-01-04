import React, { useState } from 'react'
import { useEffect } from 'react'
import SpendersTable from './SpendersTable';
import axios from '../api/axios';
import RevenueTable from './RevenueTable';
import CategoryTable from './CategoryTable';

const Homepage = () => {
  const [spenders,setSpenders] =useState([]);
  const [revenue,setRevenue] =useState([]);
  const [category,setCategory] =useState([]);

  useEffect(() => {
    const fetchSpenders = async () =>{
      try{
        const response = await axios.get('/homepage/spenders');
        const listItems = response.data;
        setSpenders(listItems)
      }catch(err){
        alert(err.message);
      }
    }

    const fetchRevenue = async () => {
      try{
        const response = await axios.get('/homepage/revenue');
        const listItems = response.data;
        setRevenue(listItems);
      }catch(err){
        alert(err.message);
      }
    }

    const fetchCategory = async () => {
      try{
        const response = await axios.get('/homepage/category');
        const listItems = response.data;
        setCategory(listItems);
      }catch(err){
        alert(err.message);
      }
    }

    fetchCategory();
    fetchSpenders();
    fetchRevenue();
  },[])

  return (
    <div className='homepageComponent'>
      <SpendersTable
        spenders={spenders}
      />
      <RevenueTable
        revenue={revenue}
      />
      <CategoryTable
        category={category}
      />
    </div>
    
  )
}

export default Homepage