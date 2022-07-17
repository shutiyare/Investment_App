export async function register(reg_data){
    const location = window.location.hostname;
    console.log(typeof(reg_data));
    const settings = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reg_data)
    };
    console.log("location: ", `/api/register`);
    const response = await fetch(`api/register`, settings);
    // console.log(response)
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message);
    }
    return data
}
// https://stackoverflow.com/questions/65725237/save-file-from-url-base64-data-to-pdf