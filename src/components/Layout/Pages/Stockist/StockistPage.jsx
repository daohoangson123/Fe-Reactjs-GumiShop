import './StockistPage.css';
//
import Table from 'react-bootstrap/Table';
import Loading from '../../UI/Loading/Loading';
//
import { useEffect, useState } from 'react';
//
import { fetchProductApi } from '../../../../data/axiosAPI/productData';
import Skeleton from 'react-loading-skeleton';
//

const StockistPage = () => {
    const [tableHeadData, setTableHeadData] = useState([]);

    const [tableRowData, setTableRowData] = useState([]);

    const getProducts = async () => {
        let result = await fetchProductApi();

        if (result) {
            setTableHeadData(Object.keys(result[0]));
            setTableRowData(result);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <section className='StockistPage Container'>
            {tableRowData.length !== 0 ? (
                <Table
                    striped
                    bordered
                    hover
                >
                    <thead>
                        <tr>
                            {tableHeadData
                                .filter(
                                    (theaddata) =>
                                        theaddata !== '_id' &&
                                        theaddata !== 'discouter' &&
                                        theaddata !== 'img',
                                )
                                .map((theaddata) => (
                                    <th key={theaddata}>
                                        {theaddata[0].toUpperCase() +
                                            theaddata.slice(1)}
                                    </th>
                                ))}
                        </tr>
                    </thead>
                    <tbody>
                        {tableRowData.map((trdata) => (
                            <tr key={trdata.name}>
                                <td>{trdata.name}</td>
                                <td>{trdata.price}</td>
                                <td>{trdata.sale && 'OnSale'}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <Skeleton className='Table-Skeleton' />
            )}
        </section>
    );
};

export default StockistPage;
