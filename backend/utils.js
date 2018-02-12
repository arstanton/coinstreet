import request from "request-promise";
export const fetchData = async url => await request.get(url);