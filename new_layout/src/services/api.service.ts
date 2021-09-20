

const API_URL: string = process.env.GATSBY_API_URL || "http://localhost:5000"

interface ApiResponse {
    data: any
}

interface Request {
    path: string;
    method: string;
    body?: any;
    sendCookies?: boolean;
}

const doRequest = async (request: Request) : Promise<ApiResponse> => {
    try{
        const response = await fetch(`${API_URL}${request.path}`, {
            method: request.method || "GET",
            credentials: request.sendCookies ? "include" : "omit",
            body: request.body && JSON.stringify(request.body),
        })

        if(response.status >= 400){
            throw new Error(`[API ERROR] Fail to ${request.path}.`)
        }
        const data = await response.json()
        console.log(data)
        return Promise.resolve({data: data.result})
    }catch(error){
        return Promise.reject({
            data: error
        })
    }

}

export default doRequest