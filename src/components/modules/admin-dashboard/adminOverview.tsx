import { adminServices } from '@/services/admin.service';
import React from 'react';

const AdminOverview = async() => {
    const data = await adminServices.getStatistics()
    console.log(data);
    return (
        <div>
            <h1>Admin dashboard overview</h1>
        </div>
    );
};

export default AdminOverview;