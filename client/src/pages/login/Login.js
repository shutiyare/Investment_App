import { Form, Input, Button, Checkbox, message } from 'antd';
import { useStateContext } from '../../utils/state/StateContext';
import login from '../../utils/auth/clientlogin';
import { useNavigate, useLocation } from 'react-router-dom';
import './Login.css';
import { useEffect } from 'react';

function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const { state, setState } = useStateContext();

    const success = () => {
        message.success('Login success');
    };

    const error = (msg) => {
        message.error(msg);
    };

    const warning = () => {
        message.warning('Network Error. Cannot connect to server');
    };
    useEffect(() => {
        if (state?.auth?.isLoggedIn !== undefined) {
            navigate('/')
        }
    });
    const onFinish = async (values) => {
        const auth = await login(values).catch(err => {
            if (err.message === "Failed to fetch") {
                warning()
            }
            else {
                error(err.message);
            }
        });
        if (auth) {
            success();
            auth.isLoggedIn = true;
            auth.remember = values.remember;
            console.log({auth})
            setState({ auth });
            navigate(from, { replace: true });
        }
    };

    return (

        <div className='login'>
            <h2>Login</h2>
            <Form
                name="login"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{
                        offset: 0,
                        span: 24,
                    }}
                >
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 0,
                        span: 24,
                    }}
                >
                    <Button type="primary" htmlType="submit">Login</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Login