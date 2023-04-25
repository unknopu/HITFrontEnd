import React, { useState, useEffect } from 'react';
import { ApiStatusContext } from "./index.jsx"

var url = "http://helmtail.tech/api/v1/me"



function apiHealthCheck(pathcheck) {
    const response = fetch(url+pathcheck).
    then((response) => response.json()).
    catch(error => console.log(error));
    return  response;
}

export default apiHealthCheck;
