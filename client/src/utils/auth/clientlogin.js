
const login = async function (credentials) {
    // const location = window.location.hostname;
    const settings = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
    };
    const response = await fetch(`/api/auth`, settings);
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message);
    }
    return data
}

export default login;