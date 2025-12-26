import axios from 'axios';
export function handleFormSubmit(e, values) {
    e.preventDefault();
    var targetObject = {
        url: values.url,
        param: values.param,
        cookie: values.cookie,
        method: values.method
    };
    axios.post('http://helmtail.tech/api/v1/report', targetObject)
        .then((res) => {
            window.location.reload(true);
        }).catch((error) => {
            window.location.reload(false);
        });
};
