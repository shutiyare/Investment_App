import { Table } from 'antd';

function Queryresult({ dataSource }) {

  const columns = [
    {
      title: 'Name',
      dataIndex: 'cust_name',
    },
    {
      title: 'Account No',
      dataIndex: 'account_no',
    },
    {
      title: 'Telephone No',
      dataIndex: 'phone_no',
    },
    {
      title: 'Amount',
      dataIndex: 'inv_amount',
    },
    {
      title: 'Date',
      dataIndex: 'inv_date',
    },
  ];
  return (
    <div className='result'>
      <Table dataSource={dataSource} columns={columns} pagination={false} />
      <h3>Investment contract signed by the customer</h3>
      <div className='pdf'>
        <embed src={`/rsc/docs/${dataSource[0]['inv_attachment']}`} type="application/pdf" width="100%" height="100%" />

      </div>
    </div>
  );
}

export default Queryresult