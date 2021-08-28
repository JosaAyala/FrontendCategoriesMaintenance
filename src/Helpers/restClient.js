import { toast } from "react-toastify";

import { isArray, isString, isNumber, isNull, isUndefined } from "lodash";

const urlBase = "http://localhost:21804/api/";

export const objectParametize = (obj, q, parent) => {
    const str = [];
    const delimeter = "&";
    let objKey;
    const a = Object.keys(obj);
    a.forEach((key) => {
        switch (typeof obj[key]) {
            case "object":
                if (obj[key]) {
                    if (isArray(obj[key])) {
                        obj[key].forEach((arrObject) => {
                            if (parent) {
                                objKey = `${parent}.${key}`;
                            } else {
                                objKey = key;
                            }
                            if (isString(arrObject) || isNumber(arrObject)) {
                                if (parent) {
                                    str[str.length] = `${parent}.${key}=${arrObject}`;
                                }
                                str[str.length] = `${key}=${arrObject}`;
                            } else if (!isString(arrObject)) {
                                str[str.length] = objectParametize(arrObject, false, objKey);
                            }
                        });
                    } else if (isArray(obj[key])) {
                        str[str.length] = `${parent}.${key}=${obj[key]}`;
                    } else {
                        if (parent) {
                            objKey = `${parent}.${key}`;
                        } else {
                            objKey = key;
                        }
                        str[str.length] = objectParametize(obj[key], false, objKey);
                    }
                }
                break;
            default:
                {
                    if (obj[key]) {
                        if (parent) {
                            str[str.length] = `${parent}.${key}=${obj[key]}`;
                        } else {
                            str[str.length] = `${key}=${obj[key]}`;
                        }
                    }
                }
        }
    });

    return (q === true ? "?" : "") + str.join(delimeter);
};

export class restClient {
    static httpGet = (url, obj) => {
        const request = {
            ...obj,
        };
        let urlparam;

        if (request) {
            urlparam = `&${objectParametize(request, false)}`;
        }

        const paramUrl = `${url}?format=json${urlparam}`;

        return fetch(`${urlBase}${paramUrl}`)
            .catch((error) => {
                toast.error(error.message);
                return error;
            })
            .then((response) => {
                if (isUndefined(response) || isNull(response)) {
                    return response;
                }
                if (response && response.status && response.status === 404) {
                    return response;
                }

                if (response.stack || response.TypeError) {
                    return response;
                }
                return response.json();
            })
            .then((response) => {
                if (response && response.status && response.status === 404) {
                    toast.error(response.statusText);
                    return response;
                }

                return response;
            });
    };

    static httpPost = (
        url,
        obj,
        useWaitControl = true,
        isEvaluateMessage = true
    ) => {
        const request = {
            ...obj,
        };
        return fetch(`${urlBase}${url}`, {
                method: "POST",
                body: JSON.stringify(request),
                headers: { "Content-type": "application/json" },
            })
            .catch((error) => {
                toast.error(error.message);
            })
            .then((response) => {
                if (isUndefined(response) || isNull(response)) {
                    return response;
                }
                if (response && response.status && response.status === 404) {
                    return response;
                }
                if (response.stack || response.TypeError) {
                    return response;
                }

                const newResponse = response.json();
                return newResponse;
            })
            .then((response) => {
                return response;
            });
    };

    static httpPut = (url, obj) => {
        const request = {
            ...obj,
        };
        return fetch(`${urlBase}${url}`, {
                method: "PUT",
                body: JSON.stringify(request),
                headers: { "Content-type": "application/json" },
            })
            .catch((error) => {
                toast.error(error.message);
            })
            .then((response) => {
                if (isUndefined(response) || isNull(response)) {
                    return response;
                }
                if (response && response.status && response.status === 404) {
                    return response;
                }
                if (response.stack || response.TypeError) {
                    return response;
                }

                return response.json();
            })
            .then((response) => {
                return response;
            });
    };

    static httpDelete = (url, obj) => {
        const request = {
            ...obj,
        };

        return fetch(`${urlBase}${url}`, {
                method: "DELETE",
                body: JSON.stringify(request),
                headers: { "Content-type": "application/json" },
            })
            .catch((error) => {
                toast.error(error.message);
            })
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                return response;
            });
    };

    /**
     * @param {data} array<Object>
     * @param {headers} object
     * @param {sheetName} string
     * @param {documentNameXml} string
     * @param {xmlData} string
     * @param {amountDecimals} number
     */
}