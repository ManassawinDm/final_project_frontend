"use client"

import React, { useEffect, useState } from 'react'
import SelectDate from './SelectDate'
import TableConfigDate from './Table'
import axios from "axios";
import { IDataDate } from './Type';
import Loading from '@/app/loading';
import api from '@/utils/api';

const MergeAllConfigDate = () => {
  const [dataDate, setdataDate] = useState<IDataDate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDateAll();
  }, []);

  const getDateAll = async () => {
    try {
      const res = await api.get(`${process.env.NEXT_PUBLIC_BASE_URL}/date/all`);
      setdataDate(res.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  if(loading) return <Loading />
  return (
    <div className="grid grid-rows-[auto] gap-20 px-10 py-12">
      <div>
        <SelectDate refreshTable={getDateAll} />
      </div>
      <div>
        <TableConfigDate data={dataDate} refreshTable={getDateAll} />
      </div>
    </div>
  )
}

export default MergeAllConfigDate