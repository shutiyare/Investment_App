import { Form, Input, Button, message } from 'antd';
import { useState } from 'react';
import { register } from '../../utils/data/register';
import './Registerinvestment.css'
function Registerinvestment({ username }) {
    const [investmentFile, steInvestmentFile] = useState(null);
    const [form] = Form.useForm();
    function registerCustomer(data){
        
    }
    function handleChange(e) {
        const selectedFile = e.target.files[0];
        console.log('selected', selectedFile)
        // const reader = new FileReader();
        // reader.readAsDataURL(selectedFile);
        // reader.onload = (e) => {
        //     steInvestmentFile(e.target.result)
        // }
        steInvestmentFile(selectedFile);
    }

    const success = () => {
        message.success('Investment registered');
    };

    const error = (msg) => {
        message.error(msg);
    };

    const warning = () => {
        message.warning('Network Error. Cannot connect to server');
    };
    const onFinish = async (values) => {
        // values['file'] = investmentFile;
        // console.log('Success:', values);
        const formData = new FormData();
        for (const name in values) {
            // console.log(name);
            formData.append(name, values[name]);
        }
        // console.log(investmentFile)
        formData.append("username", username);
        formData.append("inv_file", investmentFile);
        // formData['inv_attachment'] = investmentFile;
        // console.log('form data: ',typeof(values));
        // console.log(Object.keys(values));
        // const res = register(formData);
        // console.log("results ", res)
        register(formData).then(res=>{
            console.log("Result ",res)
        }).then(data=>{
            console.log("data", data)
        }).catch(err =>{
            console.log("err: ", err);
            error(err.message);
        })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className='register'>
            <h2>Investment Registeration</h2>
            <Form
                name="userForm"
                form={form}
                layout='vertical'
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                encType="multipart/form-data"
            >
                <Form.Item
                    label="Customer Fullname"
                    name="customer_name"
                    validateFirst={true}
                    rules={[
                        {
                            required: true,
                            message: 'Please input customer fullname!',
                        },
                        {
                            pattern: /^[a-zA-Z]+(([ -][a-zA-Z ])?[a-zA-Z ]*)*$/,
                            message: 'Name  can contain only alphabet',
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Phone No"
                    name="phone"
                    validateFirst={true}
                    rules={[
                        {
                            required: true,
                            pattern: /^[0-9]{8,14}$/,
                            message: 'Please input customer telophone number!',
                        },
                        {
                            pattern: /^[0-9]{8,14}$/,
                            message: 'Valid Phone number contains at least 9 numeric value',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Account No"
                    name="account_no"
                    validateFirst={true}
                    rules={[
                        {
                            required: true,
                            message: 'Please input customer account number!',
                        },
                        {
                            pattern: /^[0-9]*$/,
                            message: 'Account number contains only Numbers',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Investment Amount"
                    name="inv_amount"
                    validateFirst={true}
                    rules={[
                        {
                            required: true,
                            message: 'Please enter investment amount',
                        },
                        {
                            pattern: /^(-?\d+\.?\d{0,2})$/,
                            message: 'Enter amount with max 2 decimal places',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Investment Date"
                    name="inv_date"
                    validateFirst={true}
                    rules={[
                        {
                            required: true,
                            message: 'Please enter investment date',
                        },
                    ]}
                >
                    <Input type="date" />
                </Form.Item>
                <Form.Item
                    label="Attachment document"
                    name="inv_attachment"
                    validateFirst={true}
                    rules={[
                        {
                            required: true,
                            message: 'Please attach the scanned investment document',
                        },
                    ]}
                >
                    <Input type="file" name="inv_attachment" accept="application/pdf" onChange={handleChange} />
                </Form.Item>


                <Form.Item>
                    <Button type="primary" htmlType="submit" >Register Investment</Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default Registerinvestment