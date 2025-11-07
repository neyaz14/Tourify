import { TErrorSources, TGenericResponse } from "../interfaces/error.types"


export const handleZodError=(error: any): TGenericResponse=>{
    // console.dir( error);

     const errorSource: TErrorSources[] = []

    error.issues.forEach((issue: any) => {
        errorSource.push({
            //path : "nickname iside lastname inside name"
            // path: issue.path.length > 1 && issue.path.reverse().join(" inside "),

            path: issue.path[issue.path.length - 1],
            message: issue.message
        })
    })

    const msg = `The Problem : ${error.issues[0].path[0]} is ${error.issues[0].code}. ${error.issues[0].message}`

    return {
        statusCode: 400,
        message: msg,
        errorSource
    }
} 