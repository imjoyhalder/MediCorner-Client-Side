import Page from '@/components/modules/medicine/card';
import { MedicineServices } from '@/services/medecine.service';
import React from 'react';

const Medicine = async () => {

    const { data } = await MedicineServices.getAllMedicine()
    console.log(data);
    return (
        <div>
            <h1 className='text-2xl font-bold text-center text-green-600'>Our All Medicine</h1>
            {
                <Page/>
            }
        </div>
    );
};

export default Medicine;