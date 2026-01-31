import { MedicineServices } from '@/services/medecine.service';
import React from 'react';

const Medicine = async() => {
    
    const {data} = await MedicineServices.getAllMedicine()
    console.log(data);
    return (
        <div>
            {
                
            }
        </div>
    );
};

export default Medicine;