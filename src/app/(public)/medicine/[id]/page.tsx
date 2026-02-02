
const MedicineDetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {

    const { id } = await params

    return (
        <div>
            <h1 className="text-center text-2xl text-green-500">Medicine id</h1>
            <h1 className="text-center text-2xl text-green-500">{id}</h1>
        </div>
    );
};

export default MedicineDetailsPage;