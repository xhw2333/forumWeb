import axios from 'axios';

const BASE = 'http://localhost:8000';

export default function ajax(url,data={},type='GET'){
    let baseURL = BASE + url;
    return new Promise((resolve,reject)=>{
        let promise;
        if(type === 'GET'){
            promise = axios.get(baseURL,{params:data});
        } else {
            promise = axios.post(baseURL,data);
        }
        promise.then(res=>{
            resolve(res.data);
        }).catch(err=>{
            reject(err)
        })
    })
}